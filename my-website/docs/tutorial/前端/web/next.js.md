---
sidebar_label: "Next.js"
sidebar_position: 4
---

# Next.js 教程

Next.js 是一个基于 React 的生产级框架，提供了服务端渲染、静态站点生成、API 路由等功能，让开发者能够构建高性能的全栈 Web 应用。

## 什么是 Next.js？

Next.js 是 React 的元框架，提供了以下核心功能：

- **服务端渲染 (SSR)**：在服务器上渲染 React 组件
- **静态站点生成 (SSG)**：构建时预渲染页面
- **API 路由**：创建后端 API 端点
- **自动代码分割**：优化页面加载性能
- **内置 CSS 支持**：支持 CSS Modules、Sass 等
- **文件系统路由**：基于文件结构的路由系统

## 环境准备

### 系统要求

- Node.js 18.17 或更高版本
- npm、yarn 或 pnpm 包管理器

### 创建 Next.js 项目

使用官方脚手架创建项目：

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
npm run dev
```

或者使用 TypeScript 模板：

```bash
npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint
```

## 项目结构

```
my-nextjs-app/
├── pages/                 # 页面路由
│   ├── api/              # API 路由
│   ├── _app.js           # 应用组件
│   ├── _document.js      # 文档组件
│   └── index.js          # 首页
├── public/               # 静态资源
├── styles/               # 样式文件
├── components/           # 组件
├── lib/                  # 工具函数
├── next.config.js       # Next.js 配置
└── package.json
```

## 路由系统

### 页面路由

Next.js 使用文件系统路由，`pages` 目录下的文件自动成为路由：

```jsx
// pages/index.js - 对应路由 "/"
export default function Home() {
  return <h1>Home Page</h1>;
}

// pages/about.js - 对应路由 "/about"
export default function About() {
  return <h1>About Page</h1>;
}

// pages/blog/[slug].js - 动态路由 "/blog/hello-world"
export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// 获取动态路由参数
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'hello-world' } },
      { params: { slug: 'learn-nextjs' } }
    ],
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return {
    props: { post }
  };
}
```

### 嵌套路由

```jsx
// pages/blog/index.js - "/blog"
export default function Blog() {
  return <h1>Blog</h1>;
}

// pages/blog/[slug].js - "/blog/[slug]"
export default function BlogPost() {
  return <h1>Blog Post</h1>;
}

// pages/blog/[slug]/edit.js - "/blog/[slug]/edit"
export default function EditPost() {
  return <h1>Edit Post</h1>;
}
```

### 路由跳转

```jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navigation() {
  const router = useRouter();

  return (
    <nav>
      {/* 使用 Link 组件进行客户端路由 */}
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      
      {/* 编程式导航 */}
      <button onClick={() => router.push('/contact')}>
        Go to Contact
      </button>
    </nav>
  );
}
```

## 数据获取

### getStaticProps (SSG)

在构建时获取数据，适用于静态内容：

```jsx
// pages/posts.js
export default function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 60, // 增量静态再生，60秒后重新生成
  };
}
```

### getServerSideProps (SSR)

在每次请求时获取数据：

```jsx
// pages/user/[id].js
export default function User({ user }) {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.example.com/users/${params.id}`);
  const user = await res.json();

  return {
    props: {
      user,
    },
  };
}
```

### getStaticPaths

为动态路由生成静态路径：

```jsx
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: false, // 或 true 或 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}
```

## API 路由

在 `pages/api` 目录下创建 API 端点：

```jsx
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API!' });
}

// pages/api/users.js
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const users = await getUsers();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// pages/api/users/[id].js - 动态 API 路由
export default async function handler(req, res) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const user = await getUserById(id);
    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const user = await updateUser(id, req.body);
    res.status(200).json(user);
  } else if (req.method === 'DELETE') {
    await deleteUser(id);
    res.status(204).end();
  }
}
```

## 样式处理

### CSS Modules

```css
/* styles/Button.module.css */
.button {
  background-color: #0070f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0051a2;
}
```

```jsx
// components/Button.js
import styles from '../styles/Button.module.css';

export default function Button({ children, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
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

```jsx
// pages/_app.js
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Tailwind CSS

安装和配置 Tailwind CSS：

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```jsx
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```jsx
// components/Button.js
export default function Button({ children, variant = 'primary' }) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}
```

## 图片优化

Next.js 提供了内置的图片优化组件：

```jsx
import Image from 'next/image';

function MyImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // 预加载重要图片
    />
  );
}

// 响应式图片
function ResponsiveImage() {
  return (
    <div className="image-container">
      <Image
        src="/images/landscape.jpg"
        alt="Landscape"
        fill
        className="object-cover"
      />
    </div>
  );
}
```

## 环境变量

### 客户端环境变量

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
```

```jsx
// 在组件中使用
function MyComponent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const appName = process.env.NEXT_PUBLIC_APP_NAME;
  
  return <h1>Welcome to {appName}</h1>;
}
```

### 服务端环境变量

```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
SECRET_KEY=your-secret-key
```

```jsx
// pages/api/data.js
export default async function handler(req, res) {
  const dbUrl = process.env.DATABASE_URL;
  const secretKey = process.env.SECRET_KEY;
  
  // 使用环境变量连接数据库
  // ...
}
```

## 中间件

创建中间件处理请求：

```jsx
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 检查用户认证
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/protected/:path*']
};
```

## 部署

### Vercel 部署

```bash
npm install -g vercel
vercel
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### 静态导出

```jsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## 性能优化

### 代码分割

```jsx
import dynamic from 'next/dynamic';

// 动态导入组件
const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // 禁用服务端渲染
});

// 条件加载
const AdminPanel = dynamic(() => import('../components/AdminPanel'), {
  loading: () => <p>Loading admin panel...</p>
});

function App({ user }) {
  return (
    <div>
      <h1>My App</h1>
      {user.isAdmin && <AdminPanel />}
    </div>
  );
}
```

### 预加载

```jsx
import Link from 'next/link';

function Navigation() {
  return (
    <nav>
      <Link href="/about" prefetch={false}>
        <a>About</a>
      </Link>
      <Link href="/contact" prefetch={true}>
        <a>Contact</a>
      </Link>
    </nav>
  );
}
```

## 测试

### Jest 配置

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

```jsx
// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

```jsx
// __tests__/Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 最佳实践

1. **文件组织**：按功能组织组件和页面
2. **性能优化**：使用 Image 组件、代码分割
3. **SEO 优化**：使用 Head 组件设置元数据
4. **错误处理**：创建自定义错误页面
5. **类型安全**：使用 TypeScript

## 学习资源

- [Next.js 官方文档](https://nextjs.org/docs)
- [Next.js 中文文档](https://nextjs.org/docs/getting-started)
- [Next.js 示例](https://github.com/vercel/next.js/tree/canary/examples)
- [Next.js 博客](https://nextjs.org/blog)

## 常见问题

### Q: 什么时候使用 SSG vs SSR？
A: SSG 适用于静态内容，SSR 适用于需要实时数据的页面。

### Q: 如何优化 Next.js 应用性能？
A: 使用 Image 组件、代码分割、预加载、缓存策略等。

### Q: 如何处理 SEO？
A: 使用 Head 组件设置元数据，考虑使用 SSG 或 SSR。