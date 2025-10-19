---
sidebar_label: "React"
sidebar_position: 1
---

# React 教程

React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发。它采用组件化开发模式，让开发者能够构建可复用的 UI 组件。

## 什么是 React？

React 是一个声明式、高效且灵活的用于构建用户界面的 JavaScript 库。它让你可以通过组合小组件来构建复杂的 UI。

### React 的核心概念

- **组件化**：将 UI 拆分为独立、可复用的组件
- **虚拟 DOM**：提高性能的虚拟 DOM 机制
- **单向数据流**：数据从父组件流向子组件
- **JSX**：JavaScript 的语法扩展，让你在 JavaScript 中写类似 HTML 的代码

## 环境准备

### 安装 Node.js

首先确保你的系统已安装 Node.js（推荐版本 16 或更高）：

```bash
node --version
npm --version
```

### 创建 React 项目

使用 Create React App 创建新项目：

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

或者使用 Vite（更快的构建工具）：

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

## 基础语法

### 第一个组件

```jsx
// App.js
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello, React!</h1>
    </div>
  );
}

export default App;
```

### JSX 语法

JSX 是 JavaScript 的语法扩展，让你在 JavaScript 中写类似 HTML 的代码：

```jsx
const element = <h1>Hello, world!</h1>;

// 在 JSX 中使用 JavaScript 表达式
const name = 'React';
const element = <h1>Hello, {name}!</h1>;

// 条件渲染
const isLoggedIn = true;
return (
  <div>
    {isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}
  </div>
);
```

### 组件定义

#### 函数组件（推荐）

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 使用箭头函数
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
```

#### 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
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

  // 相当于 componentDidMount 和 componentDidUpdate
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

## 列表渲染

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build an app' },
    { id: 3, text: 'Deploy to production' }
  ];

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

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your email"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your message"
      />
      <button type="submit">Submit</button>
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
      <ChildComponent message={message} onMessageChange={setMessage} />
    </div>
  );
}

// 子组件
function ChildComponent({ message, onMessageChange }) {
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => onMessageChange('Hello from child')}>
        Change message
      </button>
    </div>
  );
}
```

## 常用 Hook

### useContext

```jsx
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>Themed toolbar</div>;
}
```

### useReducer

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}
```

## 性能优化

### React.memo

```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // 只有当 data 改变时才会重新渲染
  return <div>{data}</div>;
});
```

### useMemo 和 useCallback

```jsx
import React, { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ items }) {
  const [filter, setFilter] = useState('');

  // 只有当 items 或 filter 改变时才重新计算
  const filteredItems = useMemo(() => {
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);

  // 只有当依赖项改变时才重新创建函数
  const handleClick = useCallback((id) => {
    console.log('Clicked item:', id);
  }, []);

  return (
    <div>
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />
      {filteredItems.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}
```

## 路由管理

使用 React Router 进行路由管理：

```bash
npm install react-router-dom
```

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}

function Contact() {
  return <h1>Contact Page</h1>;
}
```

## 状态管理 - Redux

对于复杂应用，可以使用 Redux 进行状态管理：

```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// 创建 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 创建 store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// 组件中使用
function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>
        +
      </button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>
        -
      </button>
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

### 使用 Jest 和 React Testing Library

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments counter when button is clicked', () => {
  render(<Counter />);
  
  const button = screen.getByText('Click me');
  const count = screen.getByText(/You clicked \d+ times/);
  
  expect(count).toHaveTextContent('You clicked 0 times');
  
  fireEvent.click(button);
  
  expect(count).toHaveTextContent('You clicked 1 times');
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

将 `build` 文件夹拖拽到 Netlify 的部署区域即可。

## 最佳实践

1. **组件设计**：保持组件小而专注，单一职责
2. **状态管理**：合理使用 useState 和 useEffect
3. **性能优化**：使用 React.memo、useMemo、useCallback
4. **代码组织**：按功能组织文件结构
5. **类型安全**：考虑使用 TypeScript

## 学习资源

- [React 官方文档](https://react.dev/)
- [React 中文文档](https://zh-hans.react.dev/)
- [React 教程 - MDN](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- [React 模式](https://reactpatterns.com/)

## 常见问题

### Q: 什么时候使用类组件？
A: 现在推荐使用函数组件和 Hooks，除非你需要使用一些类组件特有的功能。

### Q: 如何优化 React 应用性能？
A: 使用 React DevTools Profiler 分析性能瓶颈，合理使用 memo、useMemo、useCallback。

### Q: 如何处理异步操作？
A: 使用 useEffect 处理副作用，结合 async/await 或 Promise 处理异步操作。