# Linux 服务器配置 Mihomo (Clash Meta) 接管全局流量

下面是一篇可直接照做的教程，目标是把一台 Linux 主机挂上 mihomo，也就是常说的 Clash Meta 内核，并用 TUN 模式接管这台机器的全部出站流量。官方配置样例里提供了 `mode`、`mixed-port`、`tun.enable`、`stack`、`dns-hijack`、`auto-route`、`auto-redirect`、`uid` 等字段，其中 `auto-redirect` 标注为仅 Linux 支持，`auto-route` 用来配置路由表。这类场景来写，假设你已经有 root 权限，有一份可用的 Clash 订阅 YAML，主机是 Linux x86_64。如果只是想让某几个命令临时走代理，用 `http_proxy` 就够了；如果要让整台机器的普通出站流量都交给 mihomo 处理，需要启用 TUN、路由接管和 DNS 劫持。接管主机流量后，SSH、apt、docker pull、git clone、系统 DNS 查询，都会进入 mihomo 的流量路径。如果配置写错，当前 SSH 会话可能断开。建议在操作时保留一个已经连上的 SSH 会话不要关，再开第二个窗口验证。

## 一，准备文件

你已经装过一次二进制了。标准放置方式可以这样做：

```bash
mv mihomo-linux-amd64-v1-v1.19.21 /usr/local/bin/clash
chmod +x /usr/local/bin/clash
mkdir -p /etc/clash
```

把你的订阅保存成 `/etc/clash/config.yaml`。如果订阅链接可直连：

```bash
wget -O /etc/clash/config.yaml '你的订阅链接'
```

如果服务器拉不到订阅，就在本地下载后用 scp 传上去。

传完先备份一份：

```bash
cp /etc/clash/config.yaml /etc/clash/config.yaml.bak
```

## 二，确认你的订阅里真正的代理组名称

接管所有流量时，最终规则一般会写成 `MATCH,某个代理组名`。这个“某个代理组名”通常是 `PROXY`、`节点选择`、`🚀 节点选择` 之类，不一定都叫 `PROXY`。先看清楚你的配置里到底叫什么：

```bash
grep -n 'proxy-groups:' -A 80 /etc/clash/config.yaml
```

你要找的是类似这种结构：

```yaml
proxy-groups:
  - name: PROXY
    type: select
    proxies:
      - Los Angeles-Resi
      - DIRECT
```

如果你的组名是 `PROXY`，后面的规则就写 `MATCH,PROXY`。如果你的组名是 `节点选择`，后面的规则就要写 `MATCH,节点选择`。

## 三，把配置改成“全机接管”版本

官方样例显示，`mode` 可以设为 `rule`，TUN 下可配 `stack: system`、`auto-route: true`、`auto-redirect: true`、`dns-hijack`，同时 `strict-route` 会更严格地把流量送入 tun，但官方注释也提醒，这样做会让你的设备更难被其他设备访问。

```bash
nano /etc/clash/config.yaml
```

在配置里，至少补齐或修改下面这些字段。下面用 `PROXY` 作为示例组名，你要按自己的实际组名替换。

```yaml
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
find-process-mode: strict

tun:
  enable: true
  stack: system
  auto-route: true
  auto-redirect: true
  auto-detect-interface: true
  dns-hijack:
    - any:53

dns:
  enable: true
  listen: 0.0.0.0:53
  ipv6: false
  enhanced-mode: fake-ip
  default-nameserver:
    - 1.1.1.1
    - 8.8.8.8
  nameserver:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query
```

然后到 `rules:` 这一段，把最后的兜底规则改成：

```yaml
rules:
  - MATCH,PROXY
```

如果你的订阅原本就有很多规则，也可以保留那些规则，只把最后一条兜底改成 `MATCH,PROXY`。这样机器上的所有未命中前置规则的流量，都会走你选中的代理组。官方样例里 `mode: rule` 和 tun 路由接管可以一起使用，`auto-redirect` 与 `auto-route` 联动时会自动配置 Linux 上的 TCP 重定向。

## 四，“规则模式”和“全局模式”的选择

你要的是“接管机器所有流量”，有两种写法。

第一种是我上面给你的写法，也就是 `mode: rule` 加 `MATCH,PROXY`。好处是后面你想做分流时，不用推翻当前结构，只要在 `MATCH,PROXY` 前面插入更具体的规则就行。官方样例明确列出了 `mode: rule` 这一配置项。

第二种是把 `mode` 改成 `global`。这种更直接，但后面你想做“国内直连，国外走代理”的时候还得改回来。对服务器来说，我更建议保留 `rule`。

## 五，给 mihomo 建一个 systemd 服务

你已经验证过手动前台启动能正常监听。要长期后台运行，用 systemd 即可。你当前这种 root 方式最简单，不需要先折腾专门用户和复杂能力集。需要注意的是，如果以后你改成受限用户运行，社区里有过 systemd 能力不足导致 TUN 或 `/etc/mihomo` 下 GeoIP、provider 文件无法写入的问题，相关案例里提到了 `CAP_NET_ADMIN`、`CAP_NET_RAW`、`CAP_NET_BIND_SERVICE`，以及在某些打包场景下缺少 `CAP_DAC_OVERRIDE` 会导致 GeoIP 下载失败。

```bash
nano /etc/systemd/system/clash.service
```

写入：

```ini
[Unit]
Description=Mihomo Service
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
ExecStart=/usr/local/bin/clash -d /etc/clash
Restart=always
RestartSec=5
LimitNOFILE=infinity

[Install]
WantedBy=multi-user.target
```

保存后执行：

```bash
systemctl daemon-reexec
systemctl daemon-reload
systemctl enable clash
systemctl start clash
```

看状态：

```bash
systemctl status clash
```

看实时日志：

```bash
journalctl -u clash -f
```

如果日志里能看到类似 `Mixed(http+socks) proxy listening at: [::]:7890`，说明入口端口已正常监听。你之前的实测也已经出现过类似日志。

## 六，验证“全机接管”是否生效

先做最简单的验证：

```bash
curl ip.sb
```

如果不带 `-x` 也能返回代理出口 IP，说明这台机器的默认出站流量已经被接管了。再看日志：

```bash
journalctl -u clash -f
```

此时如果出现类似下面的流量记录，就说明 curl 的真实网络请求进入了 mihomo：

```text
[TCP] 127.0.0.1:xxxxx --> ip.sb:80 match ... using PROXY[你的节点]
```

如果你想同时确认 DNS 也被接管，可以执行：

```bash
getent hosts google.com
```

再观察日志里是否出现 DNS 相关流量。官方样例里 `dns.enable`、`dns.listen` 和 `tun.dns-hijack` 是配套存在的。

## 七，使用 REST API 切换代理组或选择具体节点

接管全机流量以后，真正决定“走哪个节点”的是代理组，不是 `mode`。先看当前有哪些代理组和节点：

```bash
grep -n 'proxy-groups:' -A 100 /etc/clash/config.yaml
grep -n 'proxies:' -A 100 /etc/clash/config.yaml
```

如果你的组名就是 `PROXY`，而你想默认走 `Los Angeles-Resi`，通常做法有两种。

第一种，直接让它排在该代理组的第一位，很多订阅会默认选中第一项。

第二种，启用 REST API 后用接口切换。官方样例里有 `external-controller` 配置项。

```yaml
external-controller: 127.0.0.1:9090
secret: "一个你自己设的密码"
```

重启后切换代理组：

```bash
curl -H 'Authorization: Bearer 一个你自己设的密码' \
  -X PUT \
  -d '{"name":"Los Angeles-Resi"}' \
  http://127.0.0.1:9090/proxies/PROXY
```

## 八，常见问题与处理

### 1. `curl ip.sb` 还是直连

先看日志里有没有流量记录。如果没记录，通常是 TUN 没真的接管上。先确认服务状态，再看日志里是否有 tun、route、redirect 相关报错。还可以执行：

```bash
systemctl restart clash
journalctl -u clash -n 100 --no-pager
```

### 2. 启动后 53 端口冲突

你在配置里让 mihomo 监听了 `0.0.0.0:53`。如果本机已经有别的 DNS 服务占着 53 端口，clash 会起不来。这时要么释放 53 端口，要么改造现有 DNS 方案。

### 3. SSH 或外部服务异常

官方样例里对 `strict-route` 的注释很明确，开启后更偏向防泄漏，但设备可能无法被其他设备访问。对有公网业务的服务器，第一次接管时建议先不要开 `strict-route`，等确认不影响 SSH、Web 服务后再决定是否打开。

### 4. 排除特定流量的官方机制

你可以利用官方路由样例里的 `exclude-interface`、`exclude-uid` 机制，排除特定接口或特定用户的流量。比如你把某个系统服务专门跑在一个独立用户下，就可以把那个 UID 排除出路由接管范围。官方样例显示，这些字段在 Linux 下配合 `auto-route` 使用。

### 5. systemd 启动后 GeoIP 或 provider 下载失败

如果你以后改成受限用户运行，日志里出现对 `/etc/clash` 下文件写入失败，可以参考前面提到的能力问题。社区里确实有人遇到过 `/etc/mihomo/geoip.metadb: permission denied`，原因是服务能力集不足。

## 九，日常如何更新订阅

在你现在这套 CLI 方案里，所谓“更新订阅”，本质就是覆盖 `/etc/clash/config.yaml` 后重启：

```bash
wget -O /etc/clash/config.yaml '你的订阅链接'
systemctl restart clash
```

更稳一点可以先下载到临时文件，再替换：

```bash
wget -O /etc/clash/config.yaml.tmp '你的订阅链接' && \
mv /etc/clash/config.yaml.tmp /etc/clash/config.yaml && \
systemctl restart clash
```

## 十，一份适合“全机接管”的最小可用模板

下面这个模板适合作为你订阅配置的顶部公共段。它不包含具体节点，只定义主机行为。你把它合并到订阅 YAML 里，再把最后规则指向你的真实代理组即可。

```yaml
mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
find-process-mode: strict

tun:
  enable: true
  stack: system
  auto-route: true
  auto-redirect: true
  auto-detect-interface: true
  dns-hijack:
    - any:53
  # strict-route: true

dns:
  enable: true
  listen: 0.0.0.0:53
  ipv6: false
  enhanced-mode: fake-ip
  default-nameserver:
    - 1.1.1.1
    - 8.8.8.8
  nameserver:
    - https://1.1.1.1/dns-query
    - https://8.8.8.8/dns-query

# 你自己的 proxies / proxy-groups / rule-providers 保持原订阅内容
# 最后一条规则改成：
# - MATCH,PROXY
```

最后给你一句操作建议。第一次切到“全机接管”时，先做到这三步就够了：

1. 先保留一个 SSH 会话不关。
2. 先用 `mode: rule` 加 `MATCH,你的代理组`。
3. 先不开 `strict-route`，验证一轮后再决定。
