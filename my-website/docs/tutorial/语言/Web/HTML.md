---
sidebar_label: "HTML"
sidebar_position: 1
---

# HTML 教程

HTML（HyperText Markup Language，超文本标记语言）是构建网页的标准标记语言。它使用标签来描述网页的结构和内容，是 Web 开发的基础。

## HTML 的特点

- **标记语言**：使用标签来描述内容结构
- **平台无关**：可以在任何操作系统和浏览器中运行
- **易于学习**：语法简单，标签直观
- **标准化**：遵循 W3C 标准
- **可扩展**：支持自定义标签和属性

## HTML 基础结构

### 基本文档结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <h1>欢迎来到我的网站</h1>
    <p>这是一个段落。</p>
</body>
</html>
```

### 文档类型声明

```html
<!-- HTML5 文档类型 -->
<!DOCTYPE html>

<!-- HTML 4.01 严格模式 -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

<!-- XHTML 1.0 严格模式 -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

## 常用标签

### 标题标签

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### 文本标签

```html
<!-- 段落 -->
<p>这是一个段落。</p>

<!-- 换行 -->
<p>第一行<br>第二行</p>

<!-- 水平线 -->
<hr>

<!-- 强调文本 -->
<strong>重要文本</strong>
<em>强调文本</em>
<mark>高亮文本</mark>

<!-- 删除和插入 -->
<del>删除的文本</del>
<ins>插入的文本</ins>

<!-- 上标和下标 -->
<p>H<sub>2</sub>O</p>
<p>E = mc<sup>2</sup></p>
```

### 链接和图片

```html
<!-- 链接 -->
<a href="https://www.example.com">外部链接</a>
<a href="page.html">内部链接</a>
<a href="#section1">锚点链接</a>
<a href="mailto:email@example.com">邮件链接</a>
<a href="tel:+1234567890">电话链接</a>

<!-- 图片 -->
<img src="image.jpg" alt="图片描述" width="300" height="200">
<img src="logo.png" alt="公司标志" style="width: 100px; height: 50px;">

<!-- 响应式图片 -->
<img src="image.jpg" 
     alt="描述" 
     srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
     sizes="(max-width: 600px) 480px, (max-width: 1000px) 800px, 1200px">
```

### 列表

```html
<!-- 无序列表 -->
<ul>
    <li>项目 1</li>
    <li>项目 2</li>
    <li>项目 3</li>
</ul>

<!-- 有序列表 -->
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>

<!-- 定义列表 -->
<dl>
    <dt>术语 1</dt>
    <dd>术语 1 的定义</dd>
    <dt>术语 2</dt>
    <dd>术语 2 的定义</dd>
</dl>

<!-- 嵌套列表 -->
<ul>
    <li>主项目 1
        <ul>
            <li>子项目 1.1</li>
            <li>子项目 1.2</li>
        </ul>
    </li>
    <li>主项目 2</li>
</ul>
```

### 表格

```html
<table border="1">
    <caption>学生成绩表</caption>
    <thead>
        <tr>
            <th>姓名</th>
            <th>数学</th>
            <th>英语</th>
            <th>总分</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>张三</td>
            <td>95</td>
            <td>88</td>
            <td>183</td>
        </tr>
        <tr>
            <td>李四</td>
            <td>87</td>
            <td>92</td>
            <td>179</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>平均分</td>
            <td>91</td>
            <td>90</td>
            <td>181</td>
        </tr>
    </tfoot>
</table>

<!-- 表格合并单元格 -->
<table border="1">
    <tr>
        <td rowspan="2">合并行</td>
        <td>单元格 1</td>
        <td>单元格 2</td>
    </tr>
    <tr>
        <td colspan="2">合并列</td>
    </tr>
</table>
```

## 表单

### 基本表单

```html
<form action="/submit" method="post">
    <fieldset>
        <legend>用户信息</legend>
        
        <!-- 文本输入 -->
        <label for="username">用户名：</label>
        <input type="text" id="username" name="username" required>
        
        <!-- 密码输入 -->
        <label for="password">密码：</label>
        <input type="password" id="password" name="password" required>
        
        <!-- 邮箱输入 -->
        <label for="email">邮箱：</label>
        <input type="email" id="email" name="email" required>
        
        <!-- 数字输入 -->
        <label for="age">年龄：</label>
        <input type="number" id="age" name="age" min="1" max="120">
        
        <!-- 日期输入 -->
        <label for="birthday">生日：</label>
        <input type="date" id="birthday" name="birthday">
        
        <!-- 单选按钮 -->
        <fieldset>
            <legend>性别：</legend>
            <input type="radio" id="male" name="gender" value="male">
            <label for="male">男</label>
            <input type="radio" id="female" name="gender" value="female">
            <label for="female">女</label>
        </fieldset>
        
        <!-- 复选框 -->
        <fieldset>
            <legend>爱好：</legend>
            <input type="checkbox" id="reading" name="hobbies" value="reading">
            <label for="reading">阅读</label>
            <input type="checkbox" id="sports" name="hobbies" value="sports">
            <label for="sports">运动</label>
            <input type="checkbox" id="music" name="hobbies" value="music">
            <label for="music">音乐</label>
        </fieldset>
        
        <!-- 下拉选择 -->
        <label for="city">城市：</label>
        <select id="city" name="city">
            <option value="">请选择城市</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="guangzhou">广州</option>
        </select>
        
        <!-- 文本域 -->
        <label for="message">留言：</label>
        <textarea id="message" name="message" rows="4" cols="50" placeholder="请输入您的留言"></textarea>
        
        <!-- 文件上传 -->
        <label for="avatar">头像：</label>
        <input type="file" id="avatar" name="avatar" accept="image/*">
        
        <!-- 隐藏字段 -->
        <input type="hidden" name="token" value="abc123">
        
        <!-- 提交按钮 -->
        <button type="submit">提交</button>
        <button type="reset">重置</button>
    </fieldset>
</form>
```

### 表单验证

```html
<form>
    <!-- 必填字段 -->
    <input type="text" required placeholder="必填字段">
    
    <!-- 长度限制 -->
    <input type="text" minlength="3" maxlength="20" placeholder="3-20个字符">
    
    <!-- 数值范围 -->
    <input type="number" min="0" max="100" placeholder="0-100之间的数字">
    
    <!-- 正则表达式验证 -->
    <input type="text" pattern="[0-9]{11}" placeholder="11位手机号">
    
    <!-- 自定义验证消息 -->
    <input type="email" oninvalid="this.setCustomValidity('请输入有效的邮箱地址')" 
           oninput="this.setCustomValidity('')">
</form>
```

## 语义化标签

### HTML5 语义化标签

```html
<!-- 页面结构 -->
<header>
    <nav>
        <ul>
            <li><a href="#home">首页</a></li>
            <li><a href="#about">关于</a></li>
            <li><a href="#contact">联系</a></li>
        </ul>
    </nav>
</header>

<main>
    <article>
        <header>
            <h1>文章标题</h1>
            <time datetime="2024-01-01">2024年1月1日</time>
        </header>
        
        <section>
            <h2>章节标题</h2>
            <p>文章内容...</p>
        </section>
        
        <aside>
            <h3>相关链接</h3>
            <ul>
                <li><a href="#">相关文章1</a></li>
                <li><a href="#">相关文章2</a></li>
            </ul>
        </aside>
    </article>
</main>

<footer>
    <p>&copy; 2024 我的网站. 保留所有权利.</p>
</footer>
```

### 其他语义化标签

```html
<!-- 导航 -->
<nav>
    <a href="#home">首页</a>
    <a href="#about">关于</a>
    <a href="#contact">联系</a>
</nav>

<!-- 侧边栏 -->
<aside>
    <h2>侧边栏</h2>
    <p>侧边栏内容</p>
</aside>

<!-- 详细信息 -->
<details>
    <summary>点击展开</summary>
    <p>这里是详细信息内容。</p>
</details>

<!-- 进度条 -->
<progress value="70" max="100">70%</progress>

<!-- 标记 -->
<mark>重要内容</mark>

<!-- 时间 -->
<time datetime="2024-01-01T12:00:00Z">2024年1月1日中午12点</time>
```

## 多媒体内容

### 音频

```html
<!-- 基本音频 -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    您的浏览器不支持音频播放。
</audio>

<!-- 音频属性 -->
<audio controls autoplay loop muted preload="auto">
    <source src="background.mp3" type="audio/mpeg">
</audio>
```

### 视频

```html
<!-- 基本视频 -->
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    您的浏览器不支持视频播放。
</video>

<!-- 视频属性 -->
<video controls autoplay loop muted poster="thumbnail.jpg">
    <source src="movie.mp4" type="video/mp4">
    <track kind="subtitles" src="subtitles.vtt" srclang="zh" label="中文字幕">
</video>
```

### 嵌入内容

```html
<!-- iframe 嵌入 -->
<iframe src="https://www.example.com" width="800" height="600" frameborder="0"></iframe>

<!-- 嵌入地图 -->
<iframe src="https://maps.google.com/embed?pb=..." width="600" height="450" style="border:0;"></iframe>

<!-- 嵌入视频 -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID" width="560" height="315" frameborder="0" allowfullscreen></iframe>
```

## 元数据

### head 标签内容

```html
<head>
    <!-- 字符编码 -->
    <meta charset="UTF-8">
    
    <!-- 视口设置 -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- 页面描述 -->
    <meta name="description" content="这是一个关于HTML教程的页面">
    <meta name="keywords" content="HTML,教程,Web开发">
    <meta name="author" content="作者姓名">
    
    <!-- 搜索引擎优化 -->
    <meta name="robots" content="index, follow">
    <meta name="googlebot" content="index, follow">
    
    <!-- 社交媒体标签 -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="image.jpg">
    <meta property="og:url" content="https://example.com">
    
    <!-- 页面标题 -->
    <title>页面标题</title>
    
    <!-- 图标 -->
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    
    <!-- 样式表 -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- 脚本 -->
    <script src="script.js"></script>
</head>
```

## 最佳实践

### 代码规范

```html
<!-- 使用小写标签名 -->
<div>内容</div>

<!-- 正确嵌套标签 -->
<div>
    <p>段落内容</p>
</div>

<!-- 使用引号包围属性值 -->
<img src="image.jpg" alt="图片描述">

<!-- 自闭合标签 -->
<img src="image.jpg" alt="描述" />
<br />
<hr />

<!-- 缩进和格式 -->
<div class="container">
    <header>
        <h1>标题</h1>
    </header>
    <main>
        <p>内容</p>
    </main>
</div>
```

### 可访问性

```html
<!-- 使用语义化标签 -->
<nav role="navigation">
    <ul>
        <li><a href="#home">首页</a></li>
    </ul>
</nav>

<!-- 添加 alt 属性 -->
<img src="logo.jpg" alt="公司标志">

<!-- 使用 label 标签 -->
<label for="email">邮箱地址：</label>
<input type="email" id="email" name="email">

<!-- 添加 ARIA 属性 -->
<button aria-label="关闭对话框">×</button>
<div role="alert" aria-live="polite">错误消息</div>
```

### 性能优化

```html
<!-- 延迟加载图片 -->
<img src="image.jpg" alt="描述" loading="lazy">

<!-- 预加载重要资源 -->
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>

<!-- 预连接到外部域名 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 使用 CDN -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
```

## 学习资源

- [MDN HTML 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [HTML 教程 - 菜鸟教程](https://www.runoob.com/html/html-tutorial.html)
- [W3Schools HTML 教程](https://www.w3schools.com/html/)
- [HTML 标准规范](https://html.spec.whatwg.org/)

## 常见问题

### Q: HTML 和 XHTML 有什么区别？
A: XHTML 是 HTML 的 XML 版本，语法更严格，要求所有标签都必须正确嵌套和闭合。

### Q: 为什么要使用语义化标签？
A: 语义化标签让代码更易读，有利于 SEO 优化和无障碍访问，也便于维护。

### Q: HTML5 有哪些新特性？
A: HTML5 引入了新的语义化标签、表单控件、多媒体支持、Canvas、Web Storage 等特性。