---
sidebar_label: "CSS"
sidebar_position: 2
---

# CSS 教程

CSS（Cascading Style Sheets，层叠样式表）是一种样式表语言，用于描述 HTML 或 XML 文档的呈现。CSS 是 Web 三大核心技术之一，负责网页的视觉设计和布局。


## CSS 的特点

- **样式与内容分离**：将样式定义与 HTML 结构分离
- **层叠性**：多个样式规则可以叠加应用
- **继承性**：子元素可以继承父元素的样式
- **优先级**：不同选择器有不同的优先级
- **响应式设计**：支持不同设备和屏幕尺寸

## CSS 基础语法

### 基本语法结构

```css
/* 选择器 { 属性: 值; } */
h1 {
    color: blue;
    font-size: 24px;
}

/* 多属性 */
p {
    color: red;
    font-size: 16px;
    line-height: 1.5;
    margin: 10px 0;
}
```

### 注释

```css
/* 这是单行注释 */

/*
这是多行注释
可以跨越多行
*/
```

## 选择器

### 基本选择器

```css
/* 元素选择器 */
h1 {
    color: blue;
}

/* ID 选择器 */
#header {
    background-color: #f0f0f0;
}

/* 类选择器 */
.highlight {
    background-color: yellow;
}

/* 通用选择器 */
* {
    margin: 0;
    padding: 0;
}
```

### 组合选择器

```css
/* 后代选择器 */
div p {
    color: green;
}

/* 子选择器 */
div > p {
    color: red;
}

/* 相邻兄弟选择器 */
h1 + p {
    color: blue;
}

/* 通用兄弟选择器 */
h1 ~ p {
    color: green;
}
```

### 属性选择器

```css
/* 属性存在选择器 */
[title] {
    color: blue;
}

/* 属性值选择器 */
[type="text"] {
    border: 1px solid #ccc;
}

/* 属性值包含选择器 */
[class*="btn"] {
    padding: 10px;
}

/* 属性值开始选择器 */
[href^="https"] {
    color: green;
}

/* 属性值结束选择器 */
[src$=".jpg"] {
    border: 2px solid #ccc;
}
```

### 伪类选择器

```css
/* 链接伪类 */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: green; }

/* 结构伪类 */
p:first-child { font-weight: bold; }
p:last-child { margin-bottom: 0; }
p:nth-child(2) { color: blue; }
p:nth-child(odd) { background-color: #f0f0f0; }

/* 表单伪类 */
input:focus { border-color: blue; }
input:disabled { opacity: 0.5; }
input:checked { background-color: green; }
```

### 伪元素选择器

```css
/* 首字母 */
p::first-letter {
    font-size: 2em;
    font-weight: bold;
}

/* 首行 */
p::first-line {
    color: red;
}

/* 前后内容 */
p::before {
    content: "开始：";
    color: green;
}

p::after {
    content: "结束。";
    color: blue;
}
```

## 盒模型

### 基本盒模型

```css
.box {
    width: 200px;           /* 内容宽度 */
    height: 100px;          /* 内容高度 */
    padding: 20px;          /* 内边距 */
    border: 2px solid #000; /* 边框 */
    margin: 10px;           /* 外边距 */
    background-color: #f0f0f0;
}
```

### 盒模型类型

```css
/* 标准盒模型 */
.standard-box {
    box-sizing: content-box;
    width: 200px;
    padding: 20px;
    border: 2px solid #000;
    /* 总宽度 = 200 + 40 + 4 = 244px */
}

/* 边框盒模型 */
.border-box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 2px solid #000;
    /* 总宽度 = 200px */
}
```

## 布局

### 文档流

```css
/* 块级元素 */
.block {
    display: block;
    width: 100%;
    margin: 10px 0;
}

/* 内联元素 */
.inline {
    display: inline;
    margin: 0 5px;
}

/* 内联块元素 */
.inline-block {
    display: inline-block;
    width: 200px;
    margin: 10px;
}
```

### Flexbox 布局

```css
/* Flex 容器 */
.flex-container {
    display: flex;
    flex-direction: row;        /* 主轴方向 */
    justify-content: center;     /* 主轴对齐 */
    align-items: center;        /* 交叉轴对齐 */
    flex-wrap: wrap;            /* 换行 */
    gap: 20px;                  /* 间距 */
}

/* Flex 项目 */
.flex-item {
    flex: 1;                    /* 弹性增长 */
    flex-basis: 200px;          /* 基础大小 */
    flex-shrink: 1;             /* 收缩比例 */
    flex-grow: 1;               /* 增长比例 */
}
```

### Grid 布局

```css
/* Grid 容器 */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;  /* 列定义 */
    grid-template-rows: auto 1fr auto;   /* 行定义 */
    gap: 20px;                           /* 间距 */
    grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
}

/* Grid 项目 */
.grid-item {
    grid-column: 1 / 3;         /* 跨越列 */
    grid-row: 1 / 2;            /* 跨越行 */
    grid-area: main;            /* 网格区域 */
}
```

### 定位

```css
/* 相对定位 */
.relative {
    position: relative;
    top: 10px;
    left: 20px;
}

/* 绝对定位 */
.absolute {
    position: absolute;
    top: 50px;
    right: 20px;
}

/* 固定定位 */
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

/* 粘性定位 */
.sticky {
    position: sticky;
    top: 0;
    background-color: white;
}
```

## 样式属性

### 文本样式

```css
.text-style {
    font-family: Arial, sans-serif;  /* 字体族 */
    font-size: 16px;                 /* 字体大小 */
    font-weight: bold;               /* 字体粗细 */
    font-style: italic;             /* 字体样式 */
    line-height: 1.5;               /* 行高 */
    text-align: center;             /* 文本对齐 */
    text-decoration: underline;      /* 文本装饰 */
    text-transform: uppercase;      /* 文本转换 */
    letter-spacing: 2px;             /* 字母间距 */
    word-spacing: 5px;               /* 单词间距 */
}
```

### 颜色和背景

```css
.color-background {
    color: #333;                    /* 文字颜色 */
    background-color: #f0f0f0;      /* 背景颜色 */
    background-image: url('bg.jpg'); /* 背景图片 */
    background-size: cover;         /* 背景大小 */
    background-position: center;     /* 背景位置 */
    background-repeat: no-repeat;    /* 背景重复 */
    background-attachment: fixed;   /* 背景固定 */
}
```

### 边框和圆角

```css
.border-style {
    border: 2px solid #000;         /* 边框 */
    border-radius: 10px;            /* 圆角 */
    border-top: 1px solid red;     /* 上边框 */
    border-left: 3px solid blue;    /* 左边框 */
    box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 阴影 */
}
```

### 尺寸和间距

```css
.size-spacing {
    width: 300px;                   /* 宽度 */
    height: 200px;                  /* 高度 */
    max-width: 100%;               /* 最大宽度 */
    min-height: 100px;             /* 最小高度 */
    margin: 20px;                  /* 外边距 */
    padding: 15px;                 /* 内边距 */
    margin-top: 10px;              /* 上外边距 */
    padding-left: 20px;           /* 左内边距 */
}
```

## 响应式设计

### 媒体查询

```css
/* 移动端样式 */
@media (max-width: 768px) {
    .container {
        width: 100%;
        padding: 10px;
    }
    
    .nav {
        display: none;
    }
}

/* 平板样式 */
@media (min-width: 769px) and (max-width: 1024px) {
    .container {
        width: 90%;
        max-width: 800px;
    }
}

/* 桌面端样式 */
@media (min-width: 1025px) {
    .container {
        width: 1200px;
        margin: 0 auto;
    }
}
```

### 响应式图片

```css
.responsive-img {
    max-width: 100%;
    height: auto;
}

/* 不同屏幕尺寸的图片 */
@media (max-width: 600px) {
    .hero-image {
        background-image: url('mobile-hero.jpg');
    }
}

@media (min-width: 601px) {
    .hero-image {
        background-image: url('desktop-hero.jpg');
    }
}
```

## 动画和过渡

### 过渡效果

```css
.transition {
    transition: all 0.3s ease;
    background-color: blue;
}

.transition:hover {
    background-color: red;
    transform: scale(1.1);
}

/* 具体属性过渡 */
.specific-transition {
    transition: background-color 0.5s ease,
                transform 0.3s ease-in-out;
}
```

### 关键帧动画

```css
/* 定义动画 */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 应用动画 */
.animate {
    animation: fadeIn 1s ease-in-out;
}

/* 动画属性 */
.animation-properties {
    animation-name: fadeIn;
    animation-duration: 2s;
    animation-timing-function: ease;
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: both;
}
```

### 变换

```css
.transform {
    transform: translate(50px, 100px);  /* 位移 */
    transform: rotate(45deg);          /* 旋转 */
    transform: scale(1.5);             /* 缩放 */
    transform: skew(10deg, 5deg);      /* 倾斜 */
    
    /* 组合变换 */
    transform: translate(50px, 50px) rotate(45deg) scale(1.2);
    
    /* 3D 变换 */
    transform: rotateX(45deg) rotateY(30deg);
    transform-style: preserve-3d;
    perspective: 1000px;
}
```

## CSS 预处理器

### Sass/SCSS

```scss
// 变量
$primary-color: #007bff;
$font-size: 16px;

// 嵌套
.navbar {
    background-color: $primary-color;
    
    .nav-item {
        padding: 10px;
        
        &:hover {
            background-color: darken($primary-color, 10%);
        }
    }
}

// 混合
@mixin button-style($bg-color, $text-color) {
    background-color: $bg-color;
    color: $text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

.btn-primary {
    @include button-style($primary-color, white);
}

// 继承
%button-base {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn {
    @extend %button-base;
}
```

### Less

```less
// 变量
@primary-color: #007bff;
@font-size: 16px;

// 嵌套
.navbar {
    background-color: @primary-color;
    
    .nav-item {
        padding: 10px;
        
        &:hover {
            background-color: darken(@primary-color, 10%);
        }
    }
}

// 混合
.button-style(@bg-color, @text-color) {
    background-color: @bg-color;
    color: @text-color;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
}

.btn-primary {
    .button-style(@primary-color, white);
}
```

## CSS 框架

### Bootstrap

```html
<!-- Bootstrap 网格系统 -->
<div class="container">
    <div class="row">
        <div class="col-md-6 col-lg-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">卡片标题</h5>
                    <p class="card-text">卡片内容</p>
                    <a href="#" class="btn btn-primary">按钮</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

### Tailwind CSS

```html
<!-- Tailwind 实用类 -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div class="md:flex">
        <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48" src="img.jpg" alt="图片">
        </div>
        <div class="p-8">
            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                分类
            </div>
            <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
                标题
            </a>
            <p class="mt-2 text-slate-500">描述内容</p>
        </div>
    </div>
</div>
```

## 最佳实践

### 代码组织

```css
/* 1. 重置样式 */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 2. 基础样式 */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

/* 3. 布局样式 */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* 4. 组件样式 */
.button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 4px;
}

/* 5. 工具类 */
.text-center { text-align: center; }
.mb-20 { margin-bottom: 20px; }
.hidden { display: none; }
```

### 性能优化

```css
/* 使用高效选择器 */
.header { }                    /* 类选择器 - 高效 */
#main-content { }             /* ID 选择器 - 高效 */
div p { }                     /* 后代选择器 - 中等 */
div > p { }                   /* 子选择器 - 高效 */

/* 避免复杂选择器 */
div ul li a span { }          /* 过于复杂 */

/* 使用 CSS 变量 */
:root {
    --primary-color: #007bff;
    --font-size: 16px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size);
}
```

### 可维护性

```css
/* 使用有意义的类名 */
.navbar { }
.navbar-brand { }
.navbar-nav { }
.navbar-item { }

/* 使用 BEM 命名法 */
.block { }
.block__element { }
.block--modifier { }

/* 示例 */
.card { }
.card__header { }
.card__body { }
.card--featured { }
```

## 学习资源

- [MDN CSS 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- [CSS 教程 - 菜鸟教程](https://www.runoob.com/css/css-tutorial.html)
- [W3Schools CSS 教程](https://www.w3schools.com/css/)
- [CSS-Tricks](https://css-tricks.com/) - CSS 技巧和教程

## 常见问题

### Q: CSS 的优先级是如何计算的？
A: CSS 优先级按以下顺序计算：内联样式 > ID 选择器 > 类选择器 > 元素选择器。具体数值为：内联样式(1000) > ID(100) > 类(10) > 元素(1)。

### Q: 如何实现响应式设计？
A: 使用媒体查询、弹性布局(Flexbox)、网格布局(Grid)和相对单位(rem、em、%)来实现响应式设计。

### Q: CSS 预处理器有什么优势？
A: CSS 预处理器提供了变量、嵌套、混合、继承等功能，让 CSS 代码更加模块化和可维护。