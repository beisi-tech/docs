---
sidebar_label: "GitHub Actions"
sidebar_position: 5
slug: github-actions
---

# GitHub Actions

GitHub Actions 是 GitHub 提供的持续集成和持续部署(CI/CD)平台,允许你自动化构建、测试和部署流程。

## 基础概念

### 核心组件

- **Workflow(工作流)**: 自动化流程,由一个或多个 job 组成
- **Job(作业)**: 工作流中的一组步骤,在同一个 runner 上执行
- **Step(步骤)**: job 中的单个任务,可以运行命令或 action
- **Action(动作)**: 可重用的最小代码单元
- **Runner(运行器)**: 执行工作流的服务器

### 工作流文件位置

```
.github/
  workflows/
    ci.yml
    deploy.yml
```

## 基础示例

### Hello World 工作流

```yaml
name: Hello World

on: [push]

jobs:
  hello:
    runs-on: ubuntu-latest
    steps:
      - name: 打印问候语
        run: echo "Hello, World!"
```

### Node.js CI/CD

```yaml
name: Node.js CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]

    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 设置 Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: 安装依赖
        run: npm ci

      - name: 运行测试
        run: npm test

      - name: 构建项目
        run: npm run build
```

## 触发事件

### 常用触发器

```yaml
# 推送触发
on:
  push:
    branches:
      - main
      - 'release/**'
    paths:
      - 'src/**'
      - '!src/test/**'

# Pull Request 触发
on:
  pull_request:
    types: [opened, synchronize, reopened]

# 定时触发
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 时间 0:00

# 手动触发
on:
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

# 多个事件
on: [push, pull_request, workflow_dispatch]
```

## 实用示例

### 自动部署到服务器

```yaml
name: Deploy to Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 部署到服务器
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/myapp
            git pull origin main
            npm install
            npm run build
            pm2 restart myapp
```

### Docker 构建和推送

```yaml
name: Docker Build and Push

on:
  push:
    tags:
      - "v*"

jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 设置 Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: 登录 Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: 提取元数据
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: myusername/myapp
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      - name: 构建并推送
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=registry,ref=myusername/myapp:buildcache
          cache-to: type=registry,ref=myusername/myapp:buildcache,mode=max
```

### 自动发布

```yaml
name: Release

on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          registry-url: "https://registry.npmjs.org"

      - name: 安装依赖
        run: npm ci

      - name: 构建
        run: npm run build

      - name: 创建 GitHub Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      - name: 发布到 NPM
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 代码质量检查

```yaml
name: Code Quality

on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: 安装依赖
        run: npm ci

      - name: ESLint 检查
        run: npm run lint

      - name: Prettier 格式检查
        run: npm run format:check

      - name: TypeScript 类型检查
        run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20.x"
          cache: "npm"

      - name: 安装依赖
        run: npm ci

      - name: 运行测试
        run: npm test -- --coverage

      - name: 上传覆盖率报告
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### 多环境部署

```yaml
name: Multi-Environment Deploy

on:
  push:
    branches:
      - develop
      - staging
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: ${{ github.ref == 'refs/heads/main' && 'production' || github.ref == 'refs/heads/staging' && 'staging' || 'development' }}
    steps:
      - name: 检出代码
        uses: actions/checkout@v4

      - name: 设置环境变量
        run: |
          if [ "${{ github.ref }}" == "refs/heads/main" ]; then
            echo "ENV=production" >> $GITHUB_ENV
            echo "SERVER_URL=${{ secrets.PROD_SERVER_URL }}" >> $GITHUB_ENV
          elif [ "${{ github.ref }}" == "refs/heads/staging" ]; then
            echo "ENV=staging" >> $GITHUB_ENV
            echo "SERVER_URL=${{ secrets.STAGING_SERVER_URL }}" >> $GITHUB_ENV
          else
            echo "ENV=development" >> $GITHUB_ENV
            echo "SERVER_URL=${{ secrets.DEV_SERVER_URL }}" >> $GITHUB_ENV
          fi

      - name: 部署到 ${{ env.ENV }}
        run: |
          echo "部署到 ${{ env.ENV }} 环境"
          echo "服务器地址: ${{ env.SERVER_URL }}"
```

## Secrets 管理

### 设置 Secrets

1. 进入仓库 Settings
2. 选择 Secrets and variables → Actions
3. 点击 New repository secret
4. 添加名称和值

### 使用 Secrets

```yaml
steps:
  - name: 使用密钥
    env:
      API_KEY: ${{ secrets.API_KEY }}
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    run: |
      echo "API Key 已设置"
      # 密钥不会在日志中显示
```

## 环境变量

### 定义环境变量

```yaml
# 工作流级别
env:
  NODE_VERSION: "20.x"
  BUILD_ENV: production

jobs:
  build:
    runs-on: ubuntu-latest
    # Job 级别
    env:
      DATABASE_URL: ${{ secrets.DATABASE_URL }}
    steps:
      # Step 级别
      - name: 构建
        env:
          API_URL: https://api.example.com
        run: npm run build
```

### 默认环境变量

```yaml
steps:
  - name: 打印环境信息
    run: |
      echo "仓库: ${{ github.repository }}"
      echo "分支: ${{ github.ref }}"
      echo "提交: ${{ github.sha }}"
      echo "触发事件: ${{ github.event_name }}"
      echo "运行器: ${{ runner.os }}"
```

## 缓存

### 缓存依赖

```yaml
steps:
  - uses: actions/checkout@v4

  - name: 缓存 node_modules
    uses: actions/cache@v3
    with:
      path: ~/.npm
      key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
      restore-keys: |
        ${{ runner.os }}-node-

  - name: 安装依赖
    run: npm ci
```

### 缓存构建产物

```yaml
steps:
  - name: 缓存构建
    uses: actions/cache@v3
    with:
      path: |
        build
        dist
        .next/cache
      key: ${{ runner.os }}-build-${{ github.sha }}
      restore-keys: |
        ${{ runner.os }}-build-
```

## 矩阵构建

### 多版本测试

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [16, 18, 20]
        exclude:
          - os: macos-latest
            node-version: 16
    steps:
      - uses: actions/checkout@v4
      - name: 设置 Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

## 条件执行

### 使用 if 条件

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 仅在 main 分支执行
        if: github.ref == 'refs/heads/main'
        run: echo "部署到生产环境"

      - name: 仅在 PR 时执行
        if: github.event_name == 'pull_request'
        run: echo "这是 Pull Request"

      - name: 成功时执行
        if: success()
        run: echo "前面的步骤都成功了"

      - name: 失败时执行
        if: failure()
        run: echo "有步骤失败了"

      - name: 总是执行
        if: always()
        run: echo "无论如何都会执行"
```

## 复用工作流

### 创建可复用工作流

```yaml
# .github/workflows/reusable-deploy.yml
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
      node-version:
        required: false
        type: string
        default: "20.x"
    secrets:
      deploy-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ inputs.node-version }}
      - run: npm ci
      - run: npm run build
      - name: 部署
        env:
          TOKEN: ${{ secrets.deploy-token }}
        run: npm run deploy
```

### 调用可复用工作流

```yaml
# .github/workflows/main.yml
name: Main Workflow

on: [push]

jobs:
  deploy-staging:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: staging
      node-version: "20.x"
    secrets:
      deploy-token: ${{ secrets.STAGING_TOKEN }}

  deploy-production:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
    secrets:
      deploy-token: ${{ secrets.PROD_TOKEN }}
```

## 最佳实践

### 1. 合理使用缓存

```yaml
- name: 缓存依赖
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
```

### 2. 使用依赖锁定

```yaml
# 使用 npm ci 而不是 npm install
- run: npm ci
```

### 3. 合理设置超时

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 30 # 防止作业无限运行
```

### 4. 使用并发控制

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true # 取消进行中的旧运行
```

### 5. 保护敏感信息

```yaml
# ❌ 错误
- run: echo "API_KEY=${{ secrets.API_KEY }}"

# ✅ 正确
- run: echo "API_KEY=***"
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

## 调试技巧

### 启用调试日志

在仓库设置中添加 secrets:

- `ACTIONS_STEP_DEBUG`: `true`
- `ACTIONS_RUNNER_DEBUG`: `true`

### 使用 tmate 调试

```yaml
- name: 调试会话
  if: failure()
  uses: mxschmitt/action-tmate@v3
  timeout-minutes: 30
```

### 打印上下文信息

```yaml
- name: 打印上下文
  run: |
    echo "GitHub Context:"
    echo '${{ toJSON(github) }}'
    echo "Runner Context:"
    echo '${{ toJSON(runner) }}'
```

## 常用 Actions

### 官方 Actions

- `actions/checkout@v4` - 检出代码
- `actions/setup-node@v4` - 设置 Node.js
- `actions/setup-python@v4` - 设置 Python
- `actions/setup-go@v4` - 设置 Go
- `actions/cache@v3` - 缓存依赖
- `actions/upload-artifact@v3` - 上传构建产物
- `actions/download-artifact@v3` - 下载构建产物

### 社区 Actions

- `docker/build-push-action@v5` - Docker 构建和推送
- `codecov/codecov-action@v3` - 代码覆盖率
- `peter-evans/create-pull-request@v5` - 创建 PR
- `peaceiris/actions-gh-pages@v3` - 部署到 GitHub Pages

## 参考资源

- [GitHub Actions 官方文档](https://docs.github.com/cn/actions)
- [Actions Marketplace](https://github.com/marketplace?type=actions)
- [Awesome Actions](https://github.com/sdras/awesome-actions)
- [GitHub Actions 示例](https://github.com/actions/starter-workflows)
