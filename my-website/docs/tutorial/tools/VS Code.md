---
sidebar_label: "VS Code"
sidebar_position: 3
slug: vscode
---

# VS Code 教程

# 基础配置

## Git

### 更改生成 commit 提交信息的提示词

1. 快捷键 `Ctrl + Shift + P` 打开命令面板
2. 输入 `Preferences: Open User Settings (JSON)` 并回车
3. 在配置中添加下面的提示词内容
   ```json
    "github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "请始终使用简体中文生成 Git 提交信息，格式采用约定式提交（feat/fix/docs/refactor/chore），不要输出英文。"
    }],
   ```

## 推荐插件

## VS Code 连接远程服务器教程

1. 下载 SSH 远程连接插件
   ![alt text](/img/tutorial/vscode/01-ssh-extension.png)
2. 添加远程服务器
   ![alt text](/img/tutorial/vscode/02-add-remote.png)
3. 输入服务器公网 IP
   ![alt text](/img/tutorial/vscode/03-enter-ip.png)
4. 选择 SSH 配置文件位置，可以保存在本地
   ![alt text](/img/tutorial/vscode/04-ssh-config.png)

# Cursor 教程

## 如何重置 cursor 的使用期限

免费使用 Cursor Pro：[点击获取](https://github.com/yuaotian/go-cursor-help)

## Trae 教程
