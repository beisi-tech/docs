---
id: go-install-desktop
title: Go 安装（Win/Mac 开发环境）
sidebar_label: Go 安装（Win/Mac）
slug: go-install-dev
description: 面向个人开发环境（Windows 10/11 与 macOS）的 Go 安装与环境变量配置指南，涵盖包管理器与官方安装包方式。
tags: [language, go, windows, macos]
---

本指南适用于本地开发环境（Windows 10/11、macOS Intel/Apple Silicon）。如果你在配置服务器上的 Go 运行环境，请转到「DevOps」中的「[Go 环境安装（服务器）](../devops/go-env-install.md)」。

## Windows 10/11

推荐使用包管理器安装（可自动升级、易于脚本化），也可使用官方 MSI。

选一项执行即可：

```powershell
# 方式一：winget（Windows 10 21H2+/11）
winget install -e --id GoLang.Go

# 方式二：Chocolatey
choco install golang -y

# 方式三：官方 MSI 安装包（从 https://go.dev/dl 下载并安装）
# 安装完成后继续下面的验证与变量设置
```

环境变量与验证：

```powershell
# GOPATH 建议为用户目录下的 go
setx GOPATH "$env:USERPROFILE\go"

# 若 PATH 未自动添加，可追加（当前会话生效，可再在系统变量里持久化）
$env:Path = $env:Path + ";C:\Program Files\Go\bin;$env:GOPATH\bin"

# 验证
go version
go env GOPATH GOROOT GOPROXY
```

可选（中国大陆网络环境常用）：

```powershell
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.org
```

## macOS（Intel/Apple Silicon）

推荐使用 Homebrew，或使用官方 PKG 安装包。

```bash
# 方式一：Homebrew（推荐）
brew install go

# 方式二：官方 PKG（从 https://go.dev/dl 下载并安装）
# 安装完成后继续下面的验证
```

验证与常用环境：

```bash
go version
go env GOPATH GOROOT GOPROXY

# 若未设置 GOPATH，建议：
echo 'export GOPATH="$HOME/go"' >> ~/.zprofile
echo 'export PATH="$PATH:$GOPATH/bin"' >> ~/.zprofile
source ~/.zprofile
```

可选（中国大陆网络环境常用）：

```bash
go env -w GOPROXY=https://goproxy.cn,direct
go env -w GOSUMDB=sum.golang.org
```

## 模块与私有仓库

```bash
# Go 1.13+ 默认模块模式，如需显式：
go env -w GO111MODULE=on

# 需要访问私有模块时：
go env -w GOPRIVATE=your.corp.com,github.com/your-org/*
```

## 常见问题

- PATH 未生效：重新打开终端；或在 Windows 的「系统属性 → 高级 → 环境变量」添加路径；macOS 写入 `~/.zprofile` 并 `source`。
- Xcode 工具链：部分 macOS 构建场景需要 `xcode-select --install` 安装命令行工具。
- 多版本管理：可考虑 `asdf` 或 `gvm`（第三方工具）来管理多版本 Go。

相关：服务器安装请见「[Go 环境安装（服务器）](../devops/go-env-install.md)」。
