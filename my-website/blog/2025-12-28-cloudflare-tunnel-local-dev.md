---
slug: cloudflare-tunnel-local-dev
title: 用 Cloudflare Tunnel 把电脑变成服务器
authors: xiaolinbenben
tags: [内网穿透, Cloudflare, 开发调试]
---

前两天调支付回调，被折腾得够呛。

支付公司要求一个公网能访问的 notify_url，但我的代码在本地电脑上跑。每改一行代码，就得打包、上传、部署、等一分钟……循环往复，效率极低。

我心想：**有没有办法让支付公司直接把请求打到我本地？**

折腾了一圈，发现 Cloudflare Tunnel 是目前最优解。免费、稳定、还能用自己的域名。

<!-- truncate -->

## 最终效果

配置完成后，访问 `https://pay-dev.xiaolinbenben.com`，请求会直接打到我本地的 `localhost:8000`。

全程 HTTPS，不需要公网 IP，不需要端口映射。支付公司那边看起来就是一个正常的线上服务。

## 怎么配置

先装 cloudflared：

```bash
brew install cloudflare/cloudflare/cloudflared
```

登录授权：

```bash
cloudflared tunnel login
```

浏览器会弹出来让你选域名，选完就行。

创建一个 tunnel：

```bash
cloudflared tunnel create pay-dev
```

绑定子域名：

```bash
cloudflared tunnel route dns pay-dev pay-dev.xiaolinbenben.com
```

然后创建配置文件 `~/.cloudflared/config.yml`：

```yaml
tunnel: pay-dev
credentials-file: /Users/你的用户名/.cloudflared/xxxx.json
protocol: http2

ingress:
  - hostname: pay-dev.xiaolinbenben.com
    service: http://localhost:8000
  - service: http_status:404
```

启动：

```bash
cloudflared tunnel run pay-dev
```

看到 `Connected to Cloudflare` 就成功了。

## 我踩过的坑

**坑一：QUIC 连接超时**

一开始老是报 `timeout: no recent network activity`，查了半天发现是网络不支持 UDP/QUIC。

解决方法：配置文件里加上 `protocol: http2`，强制用 HTTP/2。

**坑二：本地服务没启动**

Tunnel 连上了，但访问 502。原因很简单——本地服务忘了启动。先跑个 `curl http://localhost:8000` 确认一下。

**坑三：电脑睡眠了**

Tunnel 依赖本地进程。电脑一睡眠，Tunnel 就断了。调试的时候记得关掉自动睡眠。

## 支付调试的正确姿势

配置好之后，把 notify_url 改成你的 tunnel 地址：

```text
notify_url = https://pay-dev.xiaolinbenben.com/api/notify
```

支付公司会把它当成一个正常的线上服务，回调请求直接打到你本地。

改代码、保存、刷新，回调立刻就能测。再也不用反复部署了。

## 最后

以前调支付，改一行代码要等好几分钟才能看到效果。现在本地改完就能测，效率提升了好几倍。

**当本地服务能接住真实世界的请求时，开发体验会发生质变。**

如果你也在做支付、Webhook 这类需要公网回调的功能，强烈推荐试试 Cloudflare Tunnel。
