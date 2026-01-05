---
sidebar_label: "Git"
sidebar_position: 1
slug: git
---

# Git 教程

Git 是最常用的版本控制系统，用来记录代码变化、支持多人协作、追踪历史版本。

## 安装 Git

- Windows：访问 [Git 官网](https://git-scm.com/) 下载并安装
- macOS：`brew install git`
- Linux：`sudo apt install git` 或 `sudo yum install git`

安装完成后验证：

```bash
git --version
```

## 初始化与克隆

- 初始化新仓库：

```bash
git init
```

- 克隆远程仓库：

```bash
git clone <repo-url>
```

## 常用流程

```bash
git status
git add .
git commit -m "feat: 描述本次修改"
git pull
git push
```

## 分支管理

```bash
# 查看分支
git branch

# 创建并切换分支
git checkout -b feature/your-feature

# 合并分支
git checkout main
git merge feature/your-feature
```

## 常用命令速查

- 查看提交历史：`git log --oneline`
- 查看改动内容：`git diff`
- 撤销暂存：`git reset <file>`
- 丢弃本地改动：`git checkout -- <file>`
- 修改上一条提交信息：`git commit --amend`

## 常见问题

### Windows 路径过长（Git checkout 失败）

如果在 Windows 上执行 `git checkout` 或 `git clone` 时出现 `fatal: cannot create directory ... Filename too long`，通常是路径长度超过系统默认限制（260 个字符）。

解决方式：

1. 启用 Git 的长路径支持（推荐）：

```bash
git config --global core.longpaths true
```

2. 将仓库放到更短的目录下（例如 `C:\repo` 或 `D:\work`），再重新克隆或检出。
