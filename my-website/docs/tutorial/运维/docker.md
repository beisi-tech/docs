---
sidebar_label: "Docker"
sidebar_position: 3
---

# Docker 教程

Docker 是一个开源的容器化平台，允许开发者将应用程序及其依赖项打包到轻量级、可移植的容器中。它简化了应用程序的部署、扩展和管理。

## 什么是 Docker？

Docker 是一个容器化平台，具有以下特点：

- **容器化**：将应用程序和依赖项打包到容器中
- **轻量级**：容器共享主机操作系统内核
- **可移植性**：在任何支持 Docker 的环境中运行
- **一致性**：开发、测试、生产环境保持一致
- **可扩展性**：轻松扩展和管理多个容器

## 环境准备

### 安装 Docker

#### Windows

1. 下载 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
2. 运行安装程序
3. 重启计算机
4. 启动 Docker Desktop

#### macOS

```bash
# 使用 Homebrew 安装
brew install --cask docker

# 或下载 Docker Desktop for Mac
# 访问 https://www.docker.com/products/docker-desktop/
```

#### Linux (Ubuntu)

```bash
# 更新包索引
sudo apt update

# 安装依赖
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# 添加 Docker 官方 GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# 添加 Docker 仓库
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 安装 Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将用户添加到 docker 组
sudo usermod -aG docker $USER
```

### 验证安装

```bash
# 检查 Docker 版本
docker --version
docker-compose --version

# 运行测试容器
docker run hello-world
```

## 基础概念

### 镜像 (Image)

镜像是容器的模板，包含运行应用程序所需的所有内容。

```bash
# 查看本地镜像
docker images

# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx:latest
docker pull python:3.9

# 删除镜像
docker rmi nginx:latest
```

### 容器 (Container)

容器是镜像的运行实例。

```bash
# 运行容器
docker run -d -p 8080:80 --name my-nginx nginx

# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 停止容器
docker stop my-nginx

# 启动容器
docker start my-nginx

# 删除容器
docker rm my-nginx
```

### 数据卷 (Volume)

数据卷用于持久化数据。

```bash
# 创建数据卷
docker volume create my-volume

# 查看数据卷
docker volume ls

# 使用数据卷
docker run -d -v my-volume:/data nginx

# 删除数据卷
docker volume rm my-volume
```

## Dockerfile

### 基础 Dockerfile

```dockerfile
# 使用官方 Python 镜像作为基础镜像
FROM python:3.9-slim

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 暴露端口
EXPOSE 5000

# 设置环境变量
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# 运行应用
CMD ["python", "app.py"]
```

### 多阶段构建

```dockerfile
# 构建阶段
FROM node:16 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# 生产阶段
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 优化 Dockerfile

```dockerfile
# 使用多阶段构建减少镜像大小
FROM python:3.9-slim AS base

# 安装系统依赖
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 创建非 root 用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 设置工作目录
WORKDIR /app

# 复制依赖文件
COPY requirements.txt .

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt

# 复制应用代码
COPY . .

# 更改文件所有者
RUN chown -R appuser:appuser /app

# 切换到非 root 用户
USER appuser

# 暴露端口
EXPOSE 5000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# 运行应用
CMD ["python", "app.py"]
```

## Docker Compose

### 基础配置

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=development
    volumes:
      - .:/app
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - web

volumes:
  postgres_data:
```

### 环境配置

```yaml
# docker-compose.override.yml (开发环境)
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - DEBUG=1
      - FLASK_ENV=development

  db:
    ports:
      - "5432:5432"
```

```yaml
# docker-compose.prod.yml (生产环境)
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile.prod
    environment:
      - FLASK_ENV=production
      - DATABASE_URL=postgresql://user:password@db:5432/myapp
    restart: unless-stopped

  db:
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    restart: unless-stopped
```

### 使用 Docker Compose

```bash
# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f web

# 停止服务
docker-compose down

# 重新构建并启动
docker-compose up --build

# 使用特定配置文件
docker-compose -f docker-compose.prod.yml up -d
```

## 网络管理

### 创建网络

```bash
# 创建自定义网络
docker network create my-network

# 查看网络
docker network ls

# 查看网络详情
docker network inspect my-network

# 删除网络
docker network rm my-network
```

### 容器间通信

```bash
# 运行容器并连接到网络
docker run -d --name web --network my-network nginx
docker run -d --name db --network my-network postgres

# 容器可以通过服务名互相访问
# web 容器可以通过 "db" 主机名访问数据库
```

## 数据管理

### 数据卷

```bash
# 创建命名数据卷
docker volume create my-data

# 使用数据卷
docker run -d -v my-data:/var/lib/mysql mysql

# 备份数据卷
docker run --rm -v my-data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz -C /data .

# 恢复数据卷
docker run --rm -v my-data:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /data
```

### 绑定挂载

```bash
# 使用绑定挂载
docker run -d -v /host/path:/container/path nginx

# 只读挂载
docker run -d -v /host/path:/container/path:ro nginx
```

## 镜像管理

### 构建镜像

```bash
# 构建镜像
docker build -t my-app:latest .

# 构建时指定 Dockerfile
docker build -f Dockerfile.prod -t my-app:prod .

# 构建时传递构建参数
docker build --build-arg VERSION=1.0 -t my-app:1.0 .
```

### 镜像标签和推送

```bash
# 给镜像打标签
docker tag my-app:latest username/my-app:latest

# 推送到仓库
docker push username/my-app:latest

# 从仓库拉取
docker pull username/my-app:latest
```

### 镜像优化

```dockerfile
# 使用 .dockerignore 文件
# .dockerignore
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
.nyc_output
coverage
.coverage
.pytest_cache
```

## 容器编排

### 服务发现

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx
    ports:
      - "80:80"
    depends_on:
      - app1
      - app2

  app1:
    image: my-app:latest
    environment:
      - SERVICE_NAME=app1
      - PORT=3000

  app2:
    image: my-app:latest
    environment:
      - SERVICE_NAME=app2
      - PORT=3000
```

### 负载均衡

```yaml
# docker-compose.yml
version: '3.8'

services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - web1
      - web2

  web1:
    image: my-app:latest
    environment:
      - INSTANCE=1

  web2:
    image: my-app:latest
    environment:
      - INSTANCE=2
```

## 监控和日志

### 容器监控

```bash
# 查看容器资源使用情况
docker stats

# 查看特定容器
docker stats my-container

# 实时监控
docker stats --no-stream
```

### 日志管理

```bash
# 查看容器日志
docker logs my-container

# 实时查看日志
docker logs -f my-container

# 查看最近的日志
docker logs --tail 100 my-container

# 查看带时间戳的日志
docker logs -t my-container
```

### 健康检查

```dockerfile
# Dockerfile
FROM nginx:alpine

# 添加健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

COPY nginx.conf /etc/nginx/nginx.conf
```

## 安全最佳实践

### 非 root 用户

```dockerfile
# 创建非 root 用户
RUN groupadd -r appuser && useradd -r -g appuser appuser

# 更改文件所有者
RUN chown -R appuser:appuser /app

# 切换到非 root 用户
USER appuser
```

### 最小权限原则

```dockerfile
# 使用最小化基础镜像
FROM alpine:latest

# 只安装必要的包
RUN apk add --no-cache python3 py3-pip

# 删除不必要的文件
RUN rm -rf /var/cache/apk/*
```

### 安全扫描

```bash
# 使用 Docker Scout 扫描镜像
docker scout cves my-app:latest

# 使用 Trivy 扫描
trivy image my-app:latest
```

## 部署策略

### 蓝绿部署

```bash
# 部署新版本
docker-compose -f docker-compose.blue.yml up -d

# 切换流量
# 更新负载均衡器配置

# 停止旧版本
docker-compose -f docker-compose.green.yml down
```

### 滚动更新

```bash
# 更新服务
docker-compose up -d --no-deps web

# 检查服务健康
docker-compose ps

# 回滚（如果需要）
docker-compose down
docker-compose up -d
```

## 故障排除

### 常见问题

1. **容器无法启动**
   ```bash
   # 查看容器日志
   docker logs container-name
   
   # 检查容器状态
   docker inspect container-name
   ```

2. **端口冲突**
   ```bash
   # 检查端口占用
   netstat -tulpn | grep :80
   
   # 使用不同端口
   docker run -p 8080:80 nginx
   ```

3. **磁盘空间不足**
   ```bash
   # 清理未使用的镜像
   docker image prune
   
   # 清理所有未使用的资源
   docker system prune -a
   ```

### 调试容器

```bash
# 进入运行中的容器
docker exec -it container-name /bin/bash

# 使用不同 shell
docker exec -it container-name /bin/sh

# 查看容器进程
docker exec container-name ps aux
```

## 最佳实践

1. **镜像优化**：使用多阶段构建、最小化基础镜像
2. **安全**：使用非 root 用户、定期更新镜像
3. **监控**：设置健康检查、日志管理
4. **备份**：定期备份数据卷
5. **文档**：记录配置和部署流程

## 学习资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker 中文文档](https://docs.docker-cn.com/)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

## 常见问题

### Q: 如何优化 Docker 镜像大小？
A: 使用多阶段构建、选择最小化基础镜像、合并 RUN 指令、使用 .dockerignore 文件。

### Q: 如何处理容器间的数据共享？
A: 使用数据卷、绑定挂载或网络共享存储。

### Q: 如何实现容器的高可用？
A: 使用 Docker Swarm 或 Kubernetes 进行容器编排，配置健康检查和自动重启。
