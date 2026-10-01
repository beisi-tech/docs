---
slug: fullstack-app-template
title: 一份自己用的全栈模板
authors: [xiaolinbenben]
tags: [全栈, 模板, Go]
---
我开源了一份自己在用的全栈模板：[fullstack-app-template](https://github.com/xiaolinbenben/fullstack-app-template)。

前台用 React、Vite、TypeScript 和 shadcn/ui。管理端用 React、Vite 和 Ant Design Pro。后端用 Go 和 Gin。

使用这个模板，可以提高开发运维的效率。**前后端统一打包，使用很方便。**

<!-- truncate -->

## 项目结构

公共页面在 `web/`。用的是 React、Vite、TypeScript 和 shadcn/ui，用户打开的是域名根路径。

管理端在 `admin/`。构建工具还是 React 和 Vite，界面用 Ant Design Pro，路径是 `/admin/`。

后端只放在 `server/`，框架是 Gin。两套前端构建完，产物分别进入 `server/web/dist/public` 和 `server/web/dist/admin`，再嵌进这一个 Go 程序。上线以后，页面和接口从同一个进程出去。

本地开发时，两个 Vite 都把 `/api` 和 `/healthz` 代理到 `127.0.0.1:8000`。请求走这层代理，Gin 不用再加 CORS，我也不用另维护一份前端环境变量。

## 模板里的开发约定

模板里写了开发时要遵守的约定。例如：接口只用 `GET` 和 `POST`，不用 `PUT`、`PATCH`、`DELETE`；接口返回格式使用 `success`、`message`、`data`；前端依赖固定为 pnpm 11.9.0，并提交锁文件。

## 部署方式

镜像里只有这一个进程。容器监听 `3000`，Compose 把它绑在 `127.0.0.1:3000`。

域名、HTTPS 和反向代理交给 1Panel。证书由 1Panel 管理，仓库和镜像里都不放证书。

GitHub Actions 负责检查、构建，并把镜像推到 GHCR，再通过 SSH 更新服务器上的 Compose。服务器上的 `.env` 留在机器上，流水线不去改它。

数据库选型根据实际情况：简单的应用使用 SQLite。中大型应用使用 PostgreSQL，放进 Docker Compose，和这个应用一起编排。
