---
sidebar_label: "Next.js"
sidebar_position: 4
---

# Next.js 教程

Next.js 是一个基于 React 的生产级框架，提供了服务端渲染、静态站点生成、API 路由等功能。它让 React 应用开发更加简单和高效。

## 什么是 Next.js？

Next.js 是 Vercel 开发的 React 框架，提供了许多开箱即用的功能，包括：

- **服务端渲染 (SSR)**：在服务器上渲染 React 组件
- **静态站点生成 (SSG)**：构建时生成静态页面
- **API 路由**：在同一个项目中创建 API 端点
- **自动代码分割**：优化页面加载性能
- **内置 CSS 支持**：支持 CSS Modules、Sass 等

## 快速开始

### 环境要求

- Node.js 14.6 或更高版本
- npm、yarn 或 pnpm

### 创建 Next.js 应用

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### 手动安装

```bash
npm install next react react-dom
```

## 项目结构

```
my-app/
├── pages/                 # 页面目录
│   ├── api/              # API 路由
│   ├── _app.js           # 应用配置
│   └── index.js          # 首页
├── public/               # 静态资源
├── styles/               # 样式文件
├── components/           # 组件
└── package.json
```

## 页面和路由

### 基本页面

```jsx
// pages/index.js
export default function Home() {
  return (
    <div>
      <h1>首页</h1>
      <p>欢迎来到 Next.js!</p>
    </div>
  )
}
```

### 动态路由

```jsx
// pages/posts/[id].js
import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { id } = router.query

  return <p>文章 ID: {id}</p>
}
```

### 嵌套路由

```jsx
// pages/blog/index.js
export default function Blog() {
  return <h1>博客首页</h1>
}

// pages/blog/[slug].js
export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  return <h1>博客文章: {slug}</h1>
}
```

## 数据获取

### getStaticProps (SSG)

```jsx
// pages/posts.js
export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
```

### getServerSideProps (SSR)

```jsx
// pages/user/[id].js
export default function User({ user }) {
  return <h1>{user.name}</h1>
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.example.com/users/${params.id}`)
  const user = await res.json()

  return {
    props: {
      user,
    },
  }
}
```

### getStaticPaths

```jsx
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts')
  const posts = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`)
  const post = await res.json()

  return {
    props: {
      post,
    },
  }
}
```

## API 路由

### 基本 API 路由

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API!' })
}
```

### 处理不同 HTTP 方法

```jsx
// pages/api/users.js
export default function handler(req, res) {
  if (req.method === 'GET') {
    // 获取用户列表
    res.status(200).json({ users: [] })
  } else if (req.method === 'POST') {
    // 创建新用户
    const { name, email } = req.body
    res.status(201).json({ message: '用户创建成功' })
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

### 动态 API 路由

```jsx
// pages/api/users/[id].js
export default function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    // 获取特定用户
    res.status(200).json({ id, name: 'John Doe' })
  } else if (req.method === 'PUT') {
    // 更新用户
    res.status(200).json({ message: '用户更新成功' })
  } else if (req.method === 'DELETE') {
    // 删除用户
    res.status(200).json({ message: '用户删除成功' })
  }
}
```

## 样式处理

### CSS Modules

```css
/* styles/Home.module.css */
.container {
  padding: 0 2rem;
}

.title {
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
}
```

```jsx
// pages/index.js
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>首页</h1>
    </div>
  )
}
```

### 全局样式

```css
/* styles/globals.css */
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}
```

### Sass 支持

```bash
npm install sass
```

```scss
// styles/Home.module.scss
.container {
  padding: 0 2rem;
  
  .title {
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
  }
}
```

## 图片优化

### next/image 组件

```jsx
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile"
      width={500}
      height={500}
      priority
    />
  )
}
```

### 响应式图片

```jsx
import Image from 'next/image'

export default function ResponsiveImage() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={800}
        height={600}
        layout="responsive"
      />
    </div>
  )
}
```

## 字体优化

### 使用 Google Fonts

```jsx
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <h1 style={{ fontFamily: 'Inter, sans-serif' }}>首页</h1>
    </>
  )
}
```

### 使用 next/font

```jsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1 className={inter.className}>首页</h1>
  )
}
```

## 环境变量

### 创建环境变量文件

```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 使用环境变量

```jsx
// pages/api/data.js
export default function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  
  res.status(200).json({ 
    message: '环境变量已配置',
    apiUrl 
  })
}
```

## 中间件

### 创建中间件

```jsx
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // 检查用户认证
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
```

## 部署

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### 构建生产版本

```bash
npm run build
npm start
```

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## 性能优化

### 代码分割

```jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>加载中...</p>,
})

export default function Home() {
  return <DynamicComponent />
}
```

### 预加载

```jsx
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/about" prefetch={false}>
        关于我们
      </Link>
    </nav>
  )
}
```

## 最佳实践

1. **页面结构**：合理组织页面和组件
2. **数据获取**：选择合适的渲染策略
3. **性能优化**：使用图片优化、代码分割
4. **SEO**：合理使用元数据和结构化数据
5. **类型安全**：使用 TypeScript

## 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js 中文文档](https://nextjs.org/docs/getting-started)
- [Next.js 教程 - 菜鸟教程](https://www.runoob.com/nextjs/nextjs-tutorial.html)
- [Next.js 最佳实践](https://nextjs.org/docs/best-practices)

## 常见问题

### Q: 什么时候使用 SSG 还是 SSR？
A: SSG 适合静态内容，构建时生成；SSR 适合动态内容，每次请求时生成。

### Q: 如何优化 Next.js 应用性能？
A: 使用图片优化、代码分割、预加载、缓存等技术。

### Q: 如何处理 SEO？
A: 使用正确的元数据、结构化数据、sitemap 等。