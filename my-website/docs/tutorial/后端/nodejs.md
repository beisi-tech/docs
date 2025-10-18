---
sidebar_label: "nodejs"
sidebar_position: 1
---
# Node.js 后端开发
## 论如何优雅的使用 npm 包管理工具

> Author:
> 
> First Creation: 2025-03-01

## 常见的 npm 包管理工具

- [npm](https://www.npmjs.com/)
- [yarn](https://yarnpkg.com/)
- [pnpm](https://pnpm.io/zh-CN/)

### 不同包管理工具的优缺点

#### npm

优点显而易见：无需配置，随 NodeJS 安装。

但缺点较多：
- 无法更换国内镜像源
- 每个项目都需要重复下载安装 node_modules
- 不支持并行下载

#### yarn

和 `npm` 的优缺点几乎一致，但 `yarn` 支持并行下载（下的更快一点罢了）。

#### cnpm

和 `npm` 的优缺点一致，但 `cnpm` 支持更换国内镜像源。

#### pnpm

使用**硬链接**减少磁盘占用，支持并行下载。一般选这个总没错 :)

pnpm 支持切换国内镜像源，命令如下：

```bash
pnpm config set registry https://registry.npmmirror.com
```

pnpm 恢复默认镜像源的命令如下：

```bash
pnpm config set registry https://registry.npmjs.org
```

## 如何获取这些包管理工具

|包管理工具| 获取方式                                                            |
|---|-----------------------------------------------------------------|
|npm| Node.JS 自带                                                      |
|yarn| `npm install -g yarn`                                           |
|cnpm| `npm install -g cnpm --registry=https://registry.npmmirror.com` |
|pnpm| `npm install -g pnpm`                                           |

## Powershell 无法运行 npm 命令？

如果 Powershell 无法运行 npm 命令，请尝试在 Powershell 中运行下面的命令：

```powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser
```