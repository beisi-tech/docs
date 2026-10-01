---
slug: docker-self-hosted-s3
title: 使用 Docker 自建 S3 对象存储：从服务部署到完整连接参数配置
authors: [xiaolinbenben]
tags: [Docker, S3, Silo, 对象存储]
---

当多个项目都需要上传图片、保存视频或生成文件下载链接时，可以部署一套统一的 S3 兼容对象存储，再通过不同的存储桶划分数据。

本文使用 Silo，通过 Docker Compose 部署服务，将对象数据保存到独立数据盘，使用两个 HTTPS 域名分别提供 API 和管理控制台，最后完成存储桶、访问密钥、公开读取权限及应用连接参数的配置。

本文按**全新部署**编写，不涉及旧 MinIO 数据迁移。示例统一使用：

```text
S3 API 域名：s3.example.com
控制台域名：s3-console.example.com

项目目录：/opt/s3
数据目录：/data/s3

示例桶名：your-bucket
```

实际部署时，将示例域名替换为自己的域名。

<!-- truncate -->

## 一、先了解 MinIO 和 Silo 的区别

Silo 是基于 MinIO 的独立社区分支，维护服务端、完整管理控制台及容器发行版本，同时保留 S3 接口和 `MINIO_*` 环境变量等兼容配置。它有自己的维护和发布流程，升级时应按独立分支评估。[GitHub](https://github.com/pgsty/silo)

截至本文核对日期 **2026 年 10 月 1 日**，官方 `minio/minio` 仓库已显示于 2026 年 4 月 25 日归档。选择部署方案时，需要同时考虑已有功能和后续维护情况。[GitHub](https://github.com/minio/minio)

本文使用以下固定版本，避免直接依赖会变化的 `latest` 标签：[GitHub](https://github.com/pgsty/silo/releases)

```text
docker.io/pgsty/silo:RELEASE.2026-09-16T00-00-00Z
```

**版本安全说明：** 项目已披露 `SN-2026-015`，涉及 Object Lock 保留期授权，公告将上述版本列为受影响版本，核对时尚未列出修复发行版。本文不启用 Object Lock，也不向不受信任的外部租户发放凭证；有防删保留或不可信多租户需求时，应先确认相关修复状态，再考虑投产。[SILO](https://silo.pgsty.com/blog/security/20260926-governance-retention-bypass/)

## 二、确定部署结构

本次采用下面的入口关系：

```text
应用程序
    ↓ HTTPS
s3.example.com
    ↓ 反向代理
127.0.0.1:9000
    ↓
Silo S3 API


管理人员
    ↓ HTTPS
s3-console.example.com
    ↓ 反向代理
127.0.0.1:9001
    ↓
Silo 管理控制台
```

Silo 的 `9000` 端口提供 S3 API，启动参数将控制台固定在 `9001`。两个域名分别转发到这两个入口。[SILO](https://silo.pgsty.com/download/)

服务器上的目录安排如下：

```text
/opt/s3/compose.yaml    Docker Compose 配置
/opt/s3/.env            管理员凭证和控制台地址
/data/s3/              对象存储数据
```

本文假设反向代理与 Silo 位于**同一台 Linux 服务器**，且反代直接运行在宿主机上，或反代容器使用 `host` 网络。这样的反代可以通过宿主机的 `127.0.0.1` 访问服务。[Docker Documentation](https://docs.docker.com/engine/network/drivers/host/)

如果反代使用普通 Docker bridge 网络，它的 `127.0.0.1` 指向反代容器自身，需要改用共享容器网络等连接方式，不能照搬本文的上游地址。[Docker Documentation](https://docs.docker.com/engine/network/port-publishing/)

## 三、检查 Docker、数据盘和端口

以下命令按使用 `root` 用户执行编写。

### 1. 检查 Docker Compose

```bash
docker compose version
```

确认命令能够正常返回版本信息，再继续后续操作。

### 2. 确认 `/data` 确实挂载在数据盘上

```bash
findmnt -M /data -o SOURCE,TARGET,FSTYPE

df -h / /data
```

第一条命令用于检查 `/data` 这个挂载点。输出可能类似：[man7.org](https://man7.org/linux/man-pages/man8/findmnt.8.html)

```text
SOURCE    TARGET FSTYPE
/dev/sdb1 /data  ext4
```

重点确认根目录 `/` 和 `/data` 所属的文件系统，以及数据盘的可用空间。**目录名叫 `/data`，并不能单独证明它使用了独立磁盘。**

如果 `findmnt -M /data` 没有输出，先完成数据盘挂载，不要继续创建对象数据目录。

### 3. 检查 `9000` 和 `9001`

```bash
ss -lntp '( sport = :9000 or sport = :9001 )'
```

如果已有服务监听这两个端口，应先确认占用者，避免直接停止正在使用的旧服务。

反代运行在 Docker 中时，还可以查看容器网络模式：

```bash
docker ps -q | xargs -r docker inspect \
  --format '{{.Name}} | 网络={{.HostConfig.NetworkMode}}'
```

看到对应反代容器的网络模式为 `host`，便符合本文使用本地上游地址的前提。[Docker Documentation](https://docs.docker.com/engine/network/drivers/host/)

## 四、创建目录和 `.env`

### 1. 创建项目目录与数据目录

```bash
mountpoint /data \
  && mkdir -p /opt/s3 /data/s3 \
  && ls -ld /opt/s3 /data/s3
```

这段命令先检查 `/data` 是挂载点，检查通过后才创建目录。[man7.org](https://man7.org/linux/man-pages/man1/mountpoint.1.html)

### 2. 生成管理员凭证

下面的命令会生成随机密码，并创建权限受限的 `.env` 文件。

**先把控制台地址替换成自己的域名。已有 `.env` 时，命令会停止，避免覆盖原来的凭证。**

```bash
cd /opt/s3 && (
  set -eu
  umask 077

  if [ -e .env ]; then
    echo ".env 已存在，停止操作，避免覆盖。"
    exit 1
  fi

  password="$(openssl rand -hex 24)"

  printf '%s\n' \
    'MINIO_ROOT_USER=s3admin' \
    "MINIO_ROOT_PASSWORD=$password" \
    'MINIO_BROWSER_REDIRECT_URL=https://s3-console.example.com' \
    > .env

  chmod 600 .env
  ls -l .env
)
```

`.env` 中包含三个变量：

```dotenv
MINIO_ROOT_USER=s3admin
MINIO_ROOT_PASSWORD=实际生成的随机密码
MINIO_BROWSER_REDIRECT_URL=https://s3-console.example.com
```

前两个变量设置管理员凭证，第三个变量声明控制台的外部访问地址。[SILO](https://silo.pgsty.com/download/)

不要把 `.env` 提交到公开仓库，也不要将包含密码的终端截图公开。

## 五、创建 Docker Compose 配置

新建 `/opt/s3/compose.yaml`，写入下面的内容。已有同名文件时，应先核对，避免覆盖其他部署配置。

```yaml
services:
  silo:
    image: docker.io/pgsty/silo:RELEASE.2026-09-16T00-00-00Z
    restart: unless-stopped
    command: server /data --console-address ":9001"

    env_file: .env

    ports:
      - "127.0.0.1:9000:9000" # S3 API
      - "127.0.0.1:9001:9001" # 管理控制台

    volumes:
      - /data/s3:/data # 宿主机数据盘目录 /data/s3，挂载到容器内 /data

    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

镜像和启动参数采用项目提供的容器运行方式。这里没有固定 `container_name`，由 Compose 自动生成容器名称。[SILO](https://silo.pgsty.com/download/)

## 六、配置两个 HTTPS 反向代理入口

准备好两个域名的 DNS 解析和证书，然后分别设置：

| 对外域名                   | 反代上游                  | 用途       |
| -------------------------- | ------------------------- | ---------- |
| `s3.example.com`         | `http://127.0.0.1:9000` | S3 API     |
| `s3-console.example.com` | `http://127.0.0.1:9001` | 管理控制台 |

本文由反向代理处理 HTTPS，反代到本机容器时使用 HTTP。

使用 Nginx、OpenResty 或面板配置时，需要关注原始 `Host` 和转发协议头、上传大小限制、请求超时及控制台 WebSocket 支持。项目的官方反代模板包含相应设置。[SILO](https://silo.pgsty.com/integrations/setup-nginx-proxy-with-minio/)

S3 API 建议独占一个域名的根路径：

```text
https://s3.example.com
```

不要直接把标准 S3 API 改挂到任意子路径，例如：

```text
https://example.com/storage-api/
```

S3 签名包含请求路径等信息，额外的路径改写容易破坏签名。本文使用独立子域名，避免这类问题。[SILO](https://silo.pgsty.com/integrations/setup-nginx-proxy-with-minio/)

## 七、启动服务并验证

### 1. 校验配置

```bash
cd /opt/s3 && docker compose config -q
```

`-q` 只验证配置，不打印解析后的完整配置，避免把凭证输出到终端。[Docker Documentation](https://docs.docker.com/reference/cli/docker/compose/config/)

### 2. 拉取镜像

```bash
cd /opt/s3 && docker compose pull
```

这一步只下载镜像，不会启动容器。[Docker Documentation](https://docs.docker.com/reference/cli/docker/compose/pull/)

### 3. 启动容器

```bash
cd /opt/s3 \
  && mountpoint /data \
  && docker compose up -d \
  && docker compose ps -a
```

`up -d` 在后台启动服务，`ps -a` 显示当前 Compose 项目的容器状态，包括异常退出的容器。[Docker Documentation](https://docs.docker.com/reference/cli/docker/compose/up/)

需要排查启动问题时，查看日志：

```bash
cd /opt/s3 && docker compose logs --tail=100 silo
```

### 4. 核对实际数据挂载

```bash
cd /opt/s3

docker inspect "$(docker compose ps -q silo)" \
  --format '{{range .Mounts}}{{println .Source "->" .Destination}}{{end}}'

findmnt -T /data/s3 -o SOURCE,TARGET,FSTYPE
```

第一条应包含：

```text
/data/s3 -> /data
```

第二条应显示 `/data/s3` 所在文件系统的挂载目标是 `/data`。两项结合起来，可以检查容器数据目录与实际磁盘的对应关系。[Docker Documentation](https://docs.docker.com/engine/storage/bind-mounts/)

### 5. 检查本地和域名入口

先检查本地服务：

```bash
curl -sS -I --max-time 10 \
  http://127.0.0.1:9000/minio/health/live

curl -sS -I --max-time 10 \
  http://127.0.0.1:9001/
```

再检查经过反代的 API：

```bash
curl -sS -I --max-time 15 \
  https://s3.example.com/minio/health/live
```

健康检查预期返回 `200`。它用于确认服务可达，完整的文件上传和读取仍需另外测试。[SILO](https://silo.pgsty.com/operations/monitoring/healthcheck-probe/)

本地检查成功、域名检查失败时，优先排查 DNS、证书和反代上游配置。

## 八、登录控制台并创建存储桶

浏览器打开：

```text
https://s3-console.example.com
```

登录账号使用 `.env` 中的 `MINIO_ROOT_USER`，密码使用 `MINIO_ROOT_PASSWORD`。

在自己的安全终端中可以查看：

```bash
grep '^MINIO_ROOT_' /opt/s3/.env
```

这条命令会显示管理员密码，不要公开输出内容。

登录后，进入存储桶管理页面，创建：

```text
your-bucket
```

创建后先保持默认私有状态，随后单独设置公开读取权限。控制台支持在桶详情中管理访问策略，以及对象的上传和浏览。[SILO](https://silo.pgsty.com/administration/console/managing-objects/)

**记录桶名时直接复制控制台中的实际名称。** 后面的应用配置、权限策略和公开 URL 都必须使用同一个名字。

## 九、创建应用访问密钥

在控制台进入：

```text
访问密钥 → 创建访问密钥
```

创建过程中保存两项信息：

```text
Access Key
Secret Key
```

页面里的“名称”和“描述”用于管理识别，应用认证需要的是实际 Access Key 和配对的 Secret Key。项目文档要求在创建时保存 Secret Key；丢失后应创建新凭证并轮换旧凭证。[SILO](https://silo.pgsty.com/administration/console/security-and-access/)

### 1. 访问密钥会自动绑定桶吗？

访问密钥的有效权限取决于父用户权限和密钥自身的限制策略。给密钥取一个与桶相似的名称，不会自动建立权限关联。[SILO](https://silo.pgsty.com/administration/console/security-and-access/)

如果使用管理员创建访问密钥，并保持继承父用户权限，它就可能具备整个实例的管理和存储访问权限，可以操作其他桶。

对于仅自己使用的验证环境，可以先采用这种方式跑通流程。长期给多个项目使用时，建议每个项目使用独立密钥，并将权限限制到对应桶。**仅仅创建了多个密钥，但都继承管理员权限，并没有实现项目间隔离。**

### 2. 可选：限制密钥只访问一个桶

编辑访问密钥，启用 `Restrict beyond user policy`，在密钥的限制策略中配置桶范围。该策略只能进一步缩小父用户的权限。[SILO](https://silo.pgsty.com/administration/console/security-and-access/)

下面是支持基本对象读写的示例：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket/*"
      ]
    }
  ]
}
```

第一段用于桶级查询和对象列表，第二段用于桶内对象的读取、上传和删除。需要分段上传管理、版本管理等能力时，再按实际调用补充权限。[SILO](https://silo.pgsty.com/administration/identity-access-management/policy-based-access-control/)

这份 JSON 放在**访问密钥的限制策略**中，不能拿它代替下一节的匿名访问策略。

## 十、让桶里的图片可以公开访问

应用能够使用密钥上传文件，与浏览器能否匿名读取文件，是两个独立问题。

如果希望图片通过普通 URL 直接展示，就需要为相应对象开放匿名读取权限。对于私密文件，应保持私有，并采用有时效的签名链接或带鉴权的下载接口。[AWS 文档](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html)

### 1. 为桶设置匿名只读策略

进入：

```text
存储桶 → your-bucket → 概览 → 访问策略 → 自定义
```

不同控制台版本的入口文字可能略有差异，目标是编辑**当前桶的访问策略**。[SILO](https://silo.pgsty.com/administration/console/managing-objects/)

填入：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket/*"
      ]
    }
  ]
}
```

`Principal: "*"` 指向所有访问者，`s3:GetObject` 授予对象读取权限，资源范围限定在 `your-bucket` 桶内。这个新增授权不包含匿名上传、删除或列出文件清单。[AWS 文档](https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html)

## 十一、整理完整的 S3 连接参数

完成前面的部署、建桶和密钥创建后，应用可以按下面的方式填写。

本文将 **Public URL 定义为“可以直接拼接对象键的公开访问前缀”**，并采用路径式访问，也就是将桶名放在 URL 路径中。[AWS 文档](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html?utm_source=chatgpt.com)

| 配置项           | 示例值或获取方式                             |
| ---------------- | -------------------------------------------- |
| 存储类型         | `s3`                                       |
| S3 Endpoint      | `https://s3.example.com`                   |
| S3 Region        | `us-east-1`                                |
| S3 Bucket Name   | `bucket-demo`                              |
| S3 Access Key    | 控制台创建的实际 Access Key                  |
| S3 Secret Key    | 与 Access Key 配对的 Secret Key              |
| S3 Public URL    | `https://s3.example.com/bucket-demo`       |
| Force Path Style | SDK 或应用提供该选项时，按本文路径式方案启用 |

Region 采用 Silo 官方接入示例中的值；AWS SDK 提供 `forcePathStyle` 选项来强制使用路径式访问。[SILO](https://silo.pgsty.com/integrations/aws-cli-with-minio/)

### 1. Endpoint 和控制台地址

Endpoint 填 API 域名：

```text
https://s3.example.com
```

不要填管理控制台域名，也不要在 Endpoint 后面添加桶名。本部署中的 API 与控制台分别对应 `9000` 和 `9001`。[SILO](https://silo.pgsty.com/download/)

### 2. Region 为什么使用 `us-east-1`？

Region 参与 S3 请求签名。它并非完全没有作用，服务端配置和客户端签名区域不匹配时，可能影响认证。[AWS 文档](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_sigv.html)

本文没有配置自定义区域，客户端沿用官方示例：

```text
us-east-1
```

在已经指定自建 Endpoint 的情况下，填写这个值不会把数据转存到 AWS，也不会改变本地数据目录。SDK 的连接目标由自定义 Endpoint 决定，Region 仍用于签名等配置。[AWS 文档](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/endpoint-config.html?utm_source=chatgpt.com)

### 3. Public URL 是否要包含桶名？

按本文的定义，需要包含桶名：

```text
https://s3.example.com/your-bucket
```

假设对象键为：

```text
images/test.png
```

完整访问地址就是：

```text
https://s3.example.com/your-bucket/images/test.png
```

这里要注意，**Public URL 是应用侧的配置约定，不是所有 S3 SDK 都具有的统一参数。** 本文使用下面的拼接方式：

```text
完整文件 URL = Public URL + "/" + 对象键
```

某些应用会自行补上桶名，这类应用的 Public URL 就可能只需要填写 API 域名。应以应用文档或实际生成的文件 URL 为准，避免最终地址缺少桶名，或重复出现两次桶名。

### 4. 业务项目的环境变量示例

业务项目可以采用类似配置：

```dotenv
S3_ENDPOINT=https://s3.example.com
S3_REGION=us-east-1
S3_BUCKET=your-bucket
S3_ACCESS_KEY_ID=填写实际AccessKey
S3_SECRET_ACCESS_KEY=填写实际SecretKey
S3_PUBLIC_URL=https://s3.example.com/your-bucket
S3_FORCE_PATH_STYLE=true
```

**这些变量名仅作为应用配置示例。** 现成项目需要按它自己的字段名称填写，不应假设它自动识别上面所有变量。

## 十二、完成文件上传和匿名读取测试

### 1. 测试控制台上传

在 `bucket-demo` 根目录上传一个测试图片：

```text
test.png
```

先确认控制台能够看到这个对象。

### 2. 测试匿名读取

使用浏览器无痕窗口访问：

```text
https://s3.example.com/your-bucket/test.png
```

也可以执行：

```bash
curl -sS -I --max-time 15 \
  https://s3.example.com/your-bucket/test.png
```

使用完整对象地址验证，不要只打开桶地址。只授予 `GetObject` 时，匿名用户没有 `ListBucket` 权限，桶地址返回 `AccessDenied` 并不能说明图片读取失败。[SILO](https://silo.pgsty.com/administration/identity-access-management/policy-based-access-control/)

### 3. 测试业务项目上传

将连接参数填入业务项目，上传一张新的测试图片，再确认该对象出现在 `bucket-demo` 中，并检查应用返回的 URL 能否访问。

**控制台上传成功，只能验证管理员这条操作路径。** 使用业务项目再上传一次，才能检验应用的 Endpoint、密钥和桶配置是否正确。

如果浏览器能够直接打开图片，但应用中的跨域请求失败，再根据浏览器报错检查 CORS。桶的公开读取权限与 CORS 是不同配置，CORS 也不会替代存储访问授权。[AWS 文档](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)

## 十三、常用维护命令与注意事项

查看状态和日志：

```bash
cd /opt/s3

docker compose ps -a
docker compose logs --tail=100 silo
```

修改 Compose 或 `.env` 后应用配置：

```bash
cd /opt/s3 \
  && docker compose config -q \
  && mountpoint /data \
  && docker compose up -d
```

单纯执行 `docker compose restart` 不会应用 Compose 配置变更，包括环境变量变更。应使用 `up -d` 让 Compose 根据新配置更新容器。[Docker Documentation](https://docs.docker.com/reference/cli/docker/compose/up/)

升级时，先核对目标版本的发布说明和安全公告，备份数据及配置，再修改固定镜像标签并执行：

```bash
cd /opt/s3 \
  && docker compose pull \
  && mountpoint /data \
  && docker compose up -d
```

单机部署升级可能造成短暂服务中断，业务环境应安排维护时间，并验证回滚和恢复方案。[Docker Documentation](https://docs.docker.com/reference/cli/docker/compose/up/)

最后需要保留两个边界。

**数据持久化只能保证容器替换后继续使用宿主机数据，无法应对数据盘损坏、误删除或整台服务器丢失。** 重要对象需要独立备份，并实际验证恢复。[Docker Documentation](https://docs.docker.com/engine/storage/bind-mounts/)

**公开读取只适合明确允许公开的对象。** 多项目共用同一个实例时，桶划分、应用密钥权限和匿名访问策略应分别维护，不能仅凭桶名不同就认为已经完成隔离。[SILO](https://silo.pgsty.com/administration/identity-access-management/policy-based-access-control/)

完成这些步骤后，应用接入所需的信息就已明确：

```text
Endpoint：https://s3.example.com
Region：us-east-1
Bucket：your-bucket
Access Key：控制台创建的应用访问密钥
Secret Key：对应的访问密钥密码
Public URL：https://s3.example.com/your-bucket
```

后续新增项目时，可以沿用同一个 API Endpoint，创建新的桶和应用凭证，再按该项目的文件用途决定是否开放匿名读取。
