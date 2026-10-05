---
slug: codex-desktop-official-login
title: Codex Desktop 切换回官方登录模式教程
authors: [xiaolinbenben]
tags: [Codex, ChatGPT, 登录]
---

如果 Codex Desktop 使用 API Key 模式后无法退出登录，可以通过删除本地认证文件，并恢复默认 Provider 配置来解决。

本教程不会要求你删除整个 `~/.codex` 目录，只处理登录文件和 Provider 配置，避免影响已有的 MCP、Skills、插件等配置。

<!-- truncate -->

## 第一步：删除本地认证文件

先打开 PowerShell。

在 Windows 上可以这样打开：

1. 按 `Win` 键
2. 输入 `PowerShell`
3. 点击打开 `Windows PowerShell`

打开后，复制并执行下面的命令：

```powershell
Remove-Item "$env:USERPROFILE\.codex\auth.json" -Force -ErrorAction SilentlyContinue
```

执行后，终端大概率不会显示任何内容，看到新的命令行提示符就可以继续下一步。

![删除本地认证文件](/img/tutorial/codex/codex-auth-delete.png)

该命令会删除 Codex 保存的认证信息。

如果执行后没有任何输出，或者提示没有找到文件，说明本地不存在该认证文件，可以直接跳过，不影响后续操作。

## 第二步：修改 Codex 配置文件

继续在 PowerShell 中执行下面的命令，用记事本打开 Codex 配置文件：

```powershell
notepad "$env:USERPROFILE\.codex\config.toml"
```

打开后，你会看到类似下面的配置文件界面。接下来要找的是 `model_provider` 这一行。

![打开 Codex 配置文件](/img/tutorial/codex/codex-config-open.png)

如果记事本提示文件不存在，可以选择新建文件。重点是检查里面有没有下面的 Provider 配置。

找到：

```toml
model_provider = "custom"
```

修改为：

```toml
model_provider = "openai"
```

修改完成后，屏幕上应该能看到 `model_provider = "openai"`。

![恢复官方 Provider](/img/tutorial/codex/codex-provider-openai.png)

这一步的作用是告诉 Codex Desktop：下次启动时使用官方 OpenAI 登录方式，而不是自定义 API Key Provider。

## 第三步：删除自定义 API Provider 配置

在 `config.toml` 中找到下面这一段：

```toml
[model_providers.custom]
name = "custom"
wire_api = "responses"
base_url = "https://api.terln.com/v1"
experimental_bearer_token = "sk-terln-xxxxxxx"
```

如果你的配置文件里出现类似下面这一整段，就需要删除。

![删除自定义 API Provider 配置](/img/tutorial/codex/codex-provider-remove-custom.png)

将这一整段内容删除，从 `[model_providers.custom]` 这一行开始，一直删到 `experimental_bearer_token = "..."` 这一行。

这部分是 Codex 的自定义 API Key 配置。如果保留该配置，Codex 启动时会继续使用自定义 API Provider，不会进入正常的官方账号登录流程。

## 第四步：保存并退出配置文件

如果使用的是记事本，按下面的顺序操作：

```text
保存：Ctrl + S
关闭窗口：点击右上角 X
```

保存后再关闭记事本，确保刚才的修改已经写入 `config.toml`。

## 第五步：重启 Codex Desktop

保存配置后，需要完全退出 Codex Desktop。

在 PowerShell 中执行：

```powershell
Stop-Process -Name Codex -Force -ErrorAction SilentlyContinue
```

执行后，PowerShell 大概率不会显示任何内容。然后重新打开 Codex Desktop。

![重启 Codex Desktop](/img/tutorial/codex/codex-restart-command.png)

重新打开 Codex Desktop 后，如果看到官方账号登录按钮，就说明已经切换回官方登录模式。

![重启 Codex Desktop](/img/tutorial/codex/codex-restart-login.png)

此时 Codex 会重新进入登录流程，可以使用官方账号登录。

## 注意事项

如果之前配置过以下内容：

- MCP 服务
- Skills
- Computer Use
- 项目权限配置
- 自定义插件

不要直接删除整个：

```text
C:\Users\你的用户名\.codex\
```

只需要处理：

```text
C:\Users\你的用户名\.codex\auth.json
```

以及 `config.toml` 中的 Provider 配置即可。

如果你使用的是 macOS 或 Linux，对应路径通常是 `~/.codex/auth.json` 和 `~/.codex/config.toml`。

## 如果以后需要重新使用 API Key 模式

恢复：

```toml
model_provider = "custom"
```

并重新添加：

```toml
[model_providers.custom]
name = "custom"
wire_api = "responses"
base_url = "你的API地址"
experimental_bearer_token = "你的API Key"
```
