---
sidebar_label: "React"
sidebar_position: 1
---

# React 教程

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发并维护。它采用组件化开发模式，让开发者能够构建可复用的 UI 组件。

## 什么是 React？

React 是一个声明式、高效且灵活的用于构建用户界面的 JavaScript 库。它让你可以通过组合小组件来构建复杂的 UI。

### React 的核心概念

- **组件化**：将 UI 拆分为独立、可复用的组件
- **虚拟 DOM**：提高性能的虚拟 DOM 机制
- **单向数据流**：数据从父组件流向子组件
- **JSX**：JavaScript 的语法扩展

## 快速开始

### 环境要求

- Node.js 14.0 或更高版本
- npm 或 yarn 包管理器

### 创建 React 应用

使用 Create React App 创建新项目：

```bash
npx create-react-app my-app
cd my-app
npm start
```

### 手动安装 React

```bash
npm install react react-dom
```

## 基础语法

### 第一个组件

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
```

### 类组件

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Welcome;
```

### 函数组件（推荐）

```jsx
import React from 'react';

const Welcome = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

export default Welcome;
```

## 状态管理

### useState Hook

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### useEffect Hook

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 事件处理

```jsx
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

## 条件渲染

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}
```

## 列表渲染

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

## 表单处理

```jsx
import React, { useState } from 'react';

function NameForm() {
  const [value, setValue] = useState('');

  const handleSubmit = (event) => {
    alert('A name was submitted: ' + value);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type="text" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## 组件通信

### 父子组件通信

```jsx
// 父组件
function App() {
  const [message, setMessage] = useState('Hello from parent');

  return (
    <div>
      <ChildComponent message={message} />
    </div>
  );
}

// 子组件
function ChildComponent({ message }) {
  return <p>{message}</p>;
}
```

### 兄弟组件通信

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
    </ThemeContext.Provider>
  );
}

function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <header>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </header>
  );
}
```

## 生命周期

### 函数组件生命周期

```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // 组件挂载后执行
    console.log('Component mounted');
    
    return () => {
      // 组件卸载前执行
      console.log('Component will unmount');
    };
  }, []);

  useEffect(() => {
    // 每次渲染后执行
    console.log('Component updated');
  });

  return <div>My Component</div>;
}
```

## 性能优化

### React.memo

```jsx
import React, { memo } from 'react';

const MyComponent = memo(({ name }) => {
  return <div>{name}</div>;
});
```

### useMemo

```jsx
import React, { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
}
```

### useCallback

```jsx
import React, { useCallback, useState } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

## 路由

### React Router 基础

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 状态管理

### Redux 基础

```bash
npm install redux react-redux
```

```jsx
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Reducer
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Store
const store = createStore(counterReducer);

// Component
function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```

## 测试

### Jest 和 React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter on button click', () => {
  render(<Counter />);
  const button = screen.getByText('+');
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

## 部署

### 构建生产版本

```bash
npm run build
```

### 部署到 Vercel

```bash
npm install -g vercel
vercel
```

### 部署到 Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 最佳实践

1. **组件设计**：保持组件小而专注
2. **状态管理**：合理使用 useState 和 useEffect
3. **性能优化**：使用 React.memo、useMemo、useCallback
4. **代码组织**：按功能组织文件结构
5. **类型安全**：使用 TypeScript 或 PropTypes

## 学习资源

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)
- [React 教程 - 菜鸟教程](https://www.runoob.com/react/react-tutorial.html)
- [React 进阶指南](https://react.iamkasong.com/)

## 常见问题

### Q: 什么时候使用类组件还是函数组件？
A: 现在推荐使用函数组件和 Hooks，除非你需要使用一些类组件特有的生命周期方法。

### Q: 如何优化 React 应用性能？
A: 使用 React.memo、useMemo、useCallback，避免不必要的重新渲染，合理使用 key 属性。

### Q: 如何处理异步操作？
A: 使用 useEffect 处理副作用，结合 async/await 或 Promise 处理异步数据。