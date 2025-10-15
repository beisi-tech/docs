---
sidebar_label: "docker"
sidebar_position: 4
---
# Docker 教程

## 搭建私人 docker 镜像源教程

[搭建私人 docker 镜像源教程](https://www.bilibili.com/video/BV1eYZQYsEpi/)

## 如何使用 Docker

## 可能遇到的问题

1. docker desktop 启动报错：Docker Desktop - Virtual Machine Platform not enabled
   解决：
   1. Windows 服务打开 hyper V
   2. 打开虚拟机平台  
      ![alt text](../../../src/image/t_image20.png)

## 项目容器排布

### 排布说明

1. 所有项目均使用 Docker 部署，使用 `docker compose up -d` 启动
2. 关于 main 容器
   1. 所有项目配置 main 容器作为项目流量入口
   2. main 容器内配置了 Caddy 反向代理，通过反向代理将流量转发到各个服务容器
   3. main 容器负责创建项目容器网络，项目其他容器通过加入此网络进行通信
3. 关于端口的说明
   1. 只有 main 容器暴露外网 443 端口
   2. 每一个容器占用一个端口或者多个端口，端口号（880X）在下表中列出
   3. 对于含有静态文件的项目，通过 caddy 反向代理，把容器工作目录下的静态文件反向代理到指定的端口（880X）
   4. 对于后端，直接通过配置，运行在指定的端口（880X）
   5. mysql、redis 直接使用默认端口（3306、6379）
4. 使用此方案，可以方便地进行项目的管理与维护。每个人维护自己的项目，互不干扰，方便配置 CI/CD 流程，加快迭代

### 官网项目

| 仓库名/镜像名                   | 所含容器/服务 | 说明             | 占用端口 |
| ------------------------------- | ------------- | ---------------- | -------- |
| beisi-tech-main                 | caddy         | 官网项目流量入口 | 443      |
| beisi-tech-website              | caddy         | 倍司网络科技官网 | 8801     |
| beisi-tech-website-aibox        | caddy         | AI Box 官网      | 8802     |
| beisi-tech-website-golden-store | caddy         | 黄色仓库官网     | 8803     |
| beisi-tech-website-zhixin-tutor | caddy         | 知心家教官网     | 8804     |

### AI Box 项目

| 仓库名/镜像名            | 所含容器/服务        | 说明                     | 占用端口         |
| ------------------------ | -------------------- | ------------------------ | ---------------- |
| aibox-main               | caddy                | AI Box 项目流量入口      | 443              |
| aibox-services           | mysql、redis、node   | AI Box 项目后端服务      | 8801、3306、6379 |
| aibox-web-creative-space | caddy、python、mysql | AI Box 配套项目-智创空间 | 8802、3307       |
| aibox-web-feedback       | caddy、python        | AI Box 配套项目-联系客服 | 8803             |
| aibox-web-admin          | caddy                | AI Box 项目后台管理系统  | 8804             |

### 黄色仓库项目

| 仓库名/镜像名                      | 所含容器/服务 | 说明                        | 占用端口   |
| ---------------------------------- | ------------- | --------------------------- | ---------- |
| golden-store-main                  | caddy         | 黄色仓库项目流量入口        | 443        |
| golden-store-services              | mysql、python | 黄色仓库项目后端服务        | 8801、3306 |
| golden-store-web-manage            | caddy、python | 黄色仓库配套项目-开发者工具 | 8802       |
| golden-store-web-review            | caddy、python | 黄色仓库配套项目-审核系统   | 8803       |
| golden-store-web-event             | caddy、python | 黄色仓库配套项目-活动页面   | 8804       |
| golden-store-web-feedback          | caddy、python | 黄色仓库配套项目-反馈工具   | 8805       |
| golden-store-web-exchange-tutorial | caddy         | 黄色仓库配套项目-兑换教程   | 8806       |
| golden-store-web-pay               | caddy、php    | 黄色仓库配套项目-支付系统   | 8807       |

### 知心家教项目

| 仓库名/镜像名          | 所含容器/服务 | 说明                          | 占用端口   |
| ---------------------- | ------------- | ----------------------------- | ---------- |
| zhixin-tutor-main      | caddy         | 知心家教项目流量入口          | 443        |
| zhixin-tutor-services  | mysql、python | 知心家教项目后端服务          | 8801、3306 |
| zhixin-tutor-web-admin | caddy、python | 知心家教配套项目-后台管理系统 | 8802       |
