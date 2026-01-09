---
id: go-env-install
title: Go 环境安装（Ubuntu 22.04 服务器）
sidebar_label: Go 环境安装
slug: go-install
description: Ubuntu 22.04 服务器上安装与配置 Go 环境的实用指南，使用官方二进制包，支持国内外代理配置。
tags: [devops, go, linux, ubuntu]
---

本指南专门针对 **Ubuntu 22.04** 服务器环境（生产/测试/CI 节点），使用官方二进制压缩包安装，版本可控、可快速升级回滚。

:::tip
若你在配置本地开发电脑（Windows 10/11 或 macOS），请参见「[Go 安装（Win/Mac 开发环境）](../language/go-install-desktop.md)」。
:::

## 一、确认服务器系统（必做）

```bash
cat /etc/os-release
uname -m
```

你一般会看到：

- **系统**：Ubuntu 22.04（或 20.04）
- **架构**：
  - `x86_64` → amd64（绝大多数云服务器）
  - `aarch64` → arm64（ARM 云服务器）

## 二、官方推荐方式安装 Go（强烈推荐）

:::warning
**不要用** `apt install golang`（版本老）
:::

### 1️⃣ 下载 Go 官方二进制包

去 [官方版本页](https://go.dev/dl) 查看最新版本（示例用 1.22.5，你可换最新版）：

```bash
cd /usr/local
```

**x86_64（绝大多数云服务器）**

```bash
wget https://go.dev/dl/go1.22.5.linux-amd64.tar.gz
```

**ARM64**

```bash
wget https://go.dev/dl/go1.22.5.linux-arm64.tar.gz
```

### 2️⃣ 解压并安装

```bash
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.5.linux-*.tar.gz
```

## 三、配置环境变量（重点）

**推荐：写到 `/etc/profile.d/go.sh`（全局生效）**

```bash
sudo nano /etc/profile.d/go.sh
```

写入以下内容：

```bash
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

保存后生效：

```bash
source /etc/profile
```

## 四、验证是否安装成功

```bash
go version
```

看到类似：

```
go version go1.22.5 linux/amd64
```

## 五、Go 基础配置（建议一次性做完）

启用模块模式并设置代理：

```bash
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

**如果服务器在海外**，也可以用：

```bash
go env -w GOPROXY=https://proxy.golang.org,direct
```

## 常见问题

- **PATH 未生效**：新开一个终端或执行 `source /etc/profile`
- **权限问题**：涉及 `/usr/local` 的操作需 `sudo`
- **版本升级**：删除 `/usr/local/go` 后重新下载并解压新版本即可

## 相关

- 云服务器通用准备与安全基线：见同目录的云服务器文档
- Docker 镜像内安装 Go：推荐在 Dockerfile 中使用官方 `golang:<version>` 基础镜像

—— 完 ——
