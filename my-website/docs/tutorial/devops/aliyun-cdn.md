---
sidebar_label: "阿里云 CDN"
sidebar_position: 6
slug: aliyun-cdn
---

# 阿里云 CDN 教程

CDN (Content Delivery Network，内容分发网络) 是一种分布式网络架构，通过将内容缓存到全球各地的边缘节点，加速用户访问，提升网站性能。

## CDN 基础概念

### 什么是 CDN

CDN 通过智能调度系统，将用户的请求分配到最近的边缘节点，从而：
- 🚀 加速内容访问速度
- 📉 降低源站带宽压力
- 🛡️ 提供 DDoS 防护
- 🌍 改善全球访问体验

### 核心概念

- **源站**: 存储原始内容的服务器
- **边缘节点**: CDN 在各地部署的缓存服务器
- **回源**: 当边缘节点没有缓存时，向源站获取内容
- **缓存**: 将内容临时存储在边缘节点
- **刷新**: 清除边缘节点的缓存内容
- **预热**: 提前将内容推送到边缘节点

## 开通 CDN 服务

### 1. 前置准备

1. 拥有阿里云账号
2. 完成实名认证
3. 域名已备案（中国大陆节点必需）
4. 准备好源站服务器或 OSS

### 2. 开通步骤

1. 登录 [阿里云控制台](https://www.aliyun.com/)
2. 搜索 "CDN" 进入 CDN 控制台
3. 点击 "立即开通"
4. 选择计费方式：
   - 按流量计费（适合流量波动大的场景）
   - 按带宽计费（适合流量稳定的场景）
5. 确认开通

## 添加加速域名

### 基础配置

1. 进入 CDN 控制台
2. 点击 "域名管理" → "添加域名"
3. 填写配置信息：

```
加速域名: cdn.example.com
业务类型: 
  - 图片小文件：适用于网站、电商、游戏等
  - 大文件下载：适用于软件、游戏安装包等
  - 视音频点播：适用于音视频点播加速
  - 全站加速：适用于动态内容或动静态混合场景
源站信息:
  - IP 源站：直接填写服务器 IP
  - OSS 域名：选择 OSS Bucket
  - 源站域名：填写源站域名
端口: 80 / 443
加速区域:
  - 仅中国大陆
  - 全球（不含中国大陆）
  - 全球
```

### 配置示例

#### 配置静态网站加速

```yaml
加速域名: static.example.com
业务类型: 图片小文件
源站类型: IP 源站
源站地址: 192.168.1.100
端口: 80
加速区域: 全球
```

#### 配置 OSS 加速

```yaml
加速域名: cdn.example.com
业务类型: 图片小文件
源站类型: OSS 域名
OSS Bucket: my-bucket.oss-cn-hangzhou.aliyuncs.com
端口: 80
加速区域: 仅中国大陆
```

## HTTPS 配置

### 1. 上传证书

1. 进入域名管理 → 选择域名 → HTTPS 配置
2. 点击 "修改配置"
3. 开启 "HTTPS 安全加速"
4. 证书来源：
   - **免费证书**：阿里云提供的免费 DV 证书
   - **云盾证书**：已购买的 SSL 证书
   - **自定义上传**：上传自己的证书

### 2. 上传自定义证书

```
证书名称: example.com
证书内容: 
-----BEGIN CERTIFICATE-----
[证书内容]
-----END CERTIFICATE-----

私钥内容:
-----BEGIN RSA PRIVATE KEY-----
[私钥内容]
-----END RSA PRIVATE KEY-----
```

### 3. HTTPS 高级设置

```yaml
HTTP/2: 开启 # 提升性能
强制跳转: HTTPS # HTTP 自动跳转到 HTTPS
TLS 版本: TLSv1.2 及以上
HSTS: 开启 # 增强安全性
```

## 缓存配置

### 缓存规则设置

1. 进入域名管理 → 缓存配置 → 缓存过期时间
2. 添加缓存规则

#### 推荐配置

| 文件类型 | 目录/文件 | 过期时间 | 优先级 |
|---------|----------|----------|--------|
| HTML | .html | 1 小时 | 90 |
| 图片 | .jpg,.png,.gif,.webp | 7 天 | 80 |
| CSS/JS | .css,.js | 7 天 | 80 |
| 视频 | .mp4,.avi,.flv | 30 天 | 70 |
| 字体 | .woff,.woff2,.ttf | 30 天 | 70 |
| 其他 | / | 1 天 | 60 |

### 配置示例

```
类型: 目录
路径: /static/images/
过期时间: 30 天
权重: 90

类型: 文件后缀
路径: jpg,png,gif,webp,svg
过期时间: 7 天
权重: 80

类型: 文件后缀
路径: css,js
过期时间: 3 天
权重: 80

类型: 文件后缀
路径: html,htm
过期时间: 10 分钟
权重: 90
```

### 忽略参数配置

对于带参数的 URL，可以配置是否忽略参数：

```yaml
# 忽略所有参数（提高缓存命中率）
保留参数: 关闭

# 保留指定参数
保留参数: 开启
保留参数列表: version,lang
```

## 回源配置

### 回源 HOST

```yaml
回源 HOST 类型:
  - 加速域名: 使用 CDN 加速域名作为回源 HOST
  - 源站域名: 使用源站域名作为回源 HOST
  - 自定义域名: 自定义回源 HOST
```

### 回源协议

```yaml
回源协议:
  - HTTP: 仅使用 HTTP 回源
  - HTTPS: 仅使用 HTTPS 回源
  - 协议跟随: 跟随用户请求协议
```

### 回源请求头

添加自定义回源请求头：

```
X-Forwarded-For: $client_ip
X-Real-IP: $client_ip
X-CDN-Provider: Aliyun
```

## 访问控制

### IP 黑白名单

```yaml
# IP 白名单（仅允许指定 IP 访问）
类型: 白名单
IP 列表:
  - 192.168.1.0/24
  - 10.0.0.1

# IP 黑名单（禁止指定 IP 访问）
类型: 黑名单
IP 列表:
  - 8.8.8.8
  - 1.1.1.1
```

### Referer 防盗链

```yaml
防盗链类型: 白名单
允许空 Referer: 否
Referer 白名单:
  - *.example.com
  - example.com
  - trusted-site.com
```

### URL 鉴权

#### A 类型鉴权（推荐）

```
鉴权类型: A 类型
主 KEY: your-primary-key
备 KEY: your-backup-key
有效时间: 1800 秒

生成的 URL 格式:
http://cdn.example.com/path/file.jpg?auth_key=timestamp-rand-uid-md5hash
```

#### 鉴权算法

```python
import hashlib
import time
import random

def generate_auth_url(uri, key, expire_time=1800):
    """
    生成阿里云 CDN A 类型鉴权 URL
    
    :param uri: 资源路径，如 /path/file.jpg
    :param key: 鉴权密钥
    :param expire_time: 有效时间（秒）
    :return: 完整的鉴权 URL
    """
    # 生成过期时间戳
    timestamp = int(time.time()) + expire_time
    
    # 生成随机数
    rand = random.randint(0, 100)
    
    # UID（可选，默认为 0）
    uid = 0
    
    # 拼接字符串: uri-timestamp-rand-uid-key
    sstring = f"{uri}-{timestamp}-{rand}-{uid}-{key}"
    
    # 计算 MD5
    md5hash = hashlib.md5(sstring.encode()).hexdigest()
    
    # 生成鉴权参数
    auth_key = f"{timestamp}-{rand}-{uid}-{md5hash}"
    
    # 返回完整 URL
    return f"{uri}?auth_key={auth_key}"

# 使用示例
url = generate_auth_url("/video/sample.mp4", "your-secret-key")
print(f"鉴权 URL: https://cdn.example.com{url}")
```

### User-Agent 黑白名单

```yaml
类型: 黑名单
User-Agent:
  - *bot*
  - *spider*
  - *crawler*
```

## 性能优化

### 智能压缩

开启 Gzip 压缩，减少传输数据量：

```yaml
智能压缩: 开启
压缩文件类型:
  - text/html
  - text/css
  - text/javascript
  - application/javascript
  - application/json
  - application/xml
```

### 页面优化

```yaml
HTML 优化: 开启 # 删除注释、压缩空白
CSS 优化: 开启 # 压缩 CSS 文件
JavaScript 优化: 开启 # 压缩 JS 文件
```

### Brotli 压缩

```yaml
Brotli 压缩: 开启 # 比 Gzip 更高的压缩率
```

### Range 回源

```yaml
Range 回源: 开启 # 支持断点续传
```

## 刷新和预热

### 刷新缓存

#### URL 刷新

```
刷新类型: URL
URL 列表:
https://cdn.example.com/path/file.jpg
https://cdn.example.com/path/file2.jpg

说明: 每次最多 2000 个 URL，每天限额 2000 个
```

#### 目录刷新

```
刷新类型: 目录
目录列表:
https://cdn.example.com/images/
https://cdn.example.com/css/

说明: 每次最多 100 个目录，每天限额 100 个
```

### 预热内容

```
URL 列表:
https://cdn.example.com/popular/video.mp4
https://cdn.example.com/popular/image.jpg

说明: 每次最多 500 个 URL，每天限额 500 个
```

### 使用 API 刷新

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-

from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest

def refresh_cdn_cache(urls):
    """
    刷新 CDN 缓存
    
    :param urls: URL 列表，用 \n 分隔
    """
    # 创建 AcsClient 实例
    client = AcsClient(
        'your-access-key-id',
        'your-access-key-secret',
        'cn-hangzhou'
    )
    
    # 创建 request
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('cdn.aliyuncs.com')
    request.set_method('POST')
    request.set_version('2018-05-10')
    request.set_action_name('RefreshObjectCaches')
    
    # 设置参数
    request.add_query_param('ObjectPath', urls)
    request.add_query_param('ObjectType', 'File')
    
    # 发起请求
    response = client.do_action_with_exception(request)
    print(response)

# 使用示例
urls = """https://cdn.example.com/image1.jpg
https://cdn.example.com/image2.jpg"""

refresh_cdn_cache(urls)
```

## DNS 解析配置

### 添加 CNAME 记录

1. 在 CDN 控制台获取 CNAME 地址
   - 格式：`xxx.xxx.com.w.kunlunsl.com`

2. 在域名 DNS 服务商处添加 CNAME 记录

#### 阿里云 DNS 配置示例

```
记录类型: CNAME
主机记录: cdn
记录值: xxx.xxx.com.w.kunlunsl.com
解析线路: 默认
TTL: 10 分钟
```

#### 验证 CNAME 配置

```bash
# Windows
nslookup cdn.example.com

# Linux / macOS
dig cdn.example.com
```

## 监控与统计

### 查看实时监控

1. 进入 CDN 控制台 → 数据监控
2. 查看指标：
   - 带宽
   - 流量
   - 请求次数
   - QPS
   - 命中率
   - 状态码分布

### 访问日志

#### 开启日志服务

```yaml
日志服务: 开启
存储位置: OSS Bucket
日志保存天数: 30 天
```

#### 下载日志

1. 进入日志管理
2. 选择时间范围
3. 下载日志文件

#### 日志格式

```
[时间] [客户端IP] [域名] [请求URI] [HTTP状态码] [响应大小] [Referer] [User-Agent] [命中情况]
```

### 使用日志分析

```bash
# 统计访问最多的 URL
cat cdn.log | awk '{print $4}' | sort | uniq -c | sort -rn | head -20

# 统计状态码分布
cat cdn.log | awk '{print $5}' | sort | uniq -c

# 统计缓存命中率
cat cdn.log | grep "HIT" | wc -l
cat cdn.log | wc -l
```

## 常见问题

### 1. 缓存未生效

**可能原因**：
- 源站设置了 `Cache-Control: no-cache`
- CDN 缓存规则未正确配置
- 请求带有变化的参数

**解决方案**：
```yaml
# 检查源站响应头
Cache-Control: max-age=86400

# 设置 CDN 缓存规则
缓存时间: 1 天
忽略参数: 开启
```

### 2. HTTPS 证书错误

**解决方案**：
1. 检查证书是否过期
2. 确认证书链完整
3. 验证私钥与证书匹配

### 3. 回源失败

**检查项**：
- 源站是否正常
- 安全组是否允许 CDN 回源 IP
- 回源 HOST 是否正确
- 源站端口是否开放

### 4. 访问速度慢

**优化方案**：
1. 开启智能压缩
2. 优化缓存规则
3. 启用 HTTP/2
4. 预热热门内容

### 5. 流量异常

**排查步骤**：
1. 查看访问日志
2. 检查 Referer
3. 启用防盗链
4. 设置 IP 黑名单

## 成本优化

### 1. 选择合适的计费方式

```yaml
# 流量波动大
计费方式: 按流量

# 流量稳定
计费方式: 按带宽
```

### 2. 优化缓存策略

```yaml
# 提高缓存命中率
静态资源缓存时间: 7-30 天
忽略 URL 参数: 开启
```

### 3. 使用资源包

- 购买流量包或带宽包
- 享受更优惠的价格

### 4. 清理无用域名

定期检查并删除不再使用的加速域名

## 最佳实践

### 1. 源站优化

```yaml
# 启用 Gzip 压缩
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# 设置合理的 Cache-Control
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 7d;
    add_header Cache-Control "public, immutable";
}
```

### 2. 合理使用 CDN

```
✅ 适合 CDN 加速:
- 静态资源（图片、CSS、JS）
- 下载文件
- 视频点播
- 静态网页

❌ 不适合 CDN 加速:
- 实时性要求极高的内容
- 频繁更新的动态内容
- 需要实时鉴权的敏感内容
```

### 3. 安全配置

```yaml
# 启用 HTTPS
HTTPS: 开启
强制跳转: HTTPS → HTTPS

# 防盗链
Referer 防盗链: 开启
URL 鉴权: 开启（重要资源）

# 访问控制
IP 黑名单: 配置恶意 IP
User-Agent 黑名单: 阻止爬虫
```

### 4. 监控告警

```yaml
# 设置告警规则
带宽阈值: 超过 100 Mbps 告警
流量异常: 日流量增长超过 50% 告警
状态码异常: 5xx 错误率超过 5% 告警
```

## 参考资源

- [阿里云 CDN 官方文档](https://help.aliyun.com/product/27099.html)
- [CDN 价格计算器](https://www.aliyun.com/price/product#/cdn/detail)
- [CDN API 参考](https://help.aliyun.com/document_detail/91161.html)
- [CDN 最佳实践](https://help.aliyun.com/document_detail/65077.html)
- [CDN 性能优化指南](https://help.aliyun.com/document_detail/27136.html)
