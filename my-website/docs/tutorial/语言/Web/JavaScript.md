---
sidebar_label: "JavaScript"
sidebar_position: 3
---

# JavaScript 教程

JavaScript 是一种高级的、解释型的编程语言，主要用于 Web 开发。它是 Web 三大核心技术之一（HTML、CSS、JavaScript），也是世界上最流行的编程语言之一。


## JavaScript 的特点

- **动态类型**：变量类型在运行时确定
- **解释型语言**：无需编译，直接运行
- **跨平台**：支持多种操作系统和浏览器
- **事件驱动**：基于事件和回调的编程模式
- **函数式编程**：支持函数作为一等公民

## 基础语法

### 变量声明

```javascript
// var - 函数作用域（不推荐）
var name = "张三";

// let - 块作用域（推荐）
let age = 25;

// const - 常量（推荐）
const PI = 3.14159;

// 变量命名规则
let userName = "李四";        // 驼峰命名
let user_age = 30;          // 下划线命名
let $element = document.getElementById('myDiv'); // 特殊字符
```

### 数据类型

```javascript
// 基本数据类型
let number = 42;                    // 数字
let string = "Hello, World!";      // 字符串
let boolean = true;                 // 布尔值
let nullValue = null;               // 空值
let undefinedValue = undefined;     // 未定义
let symbol = Symbol('id');          // 符号（ES6）

// 对象类型
let object = {
    name: "张三",
    age: 25,
    city: "北京"
};

let array = [1, 2, 3, 4, 5];       // 数组
let function = function() {         // 函数
    return "Hello!";
};
```

### 字符串操作

```javascript
let firstName = "张";
let lastName = "三";
let fullName = firstName + " " + lastName;  // 字符串拼接

// 模板字符串（ES6）
let message = `你好，${fullName}！你今年${age}岁。`;

// 字符串方法
let text = "Hello, World!";
console.log(text.length);           // 长度
console.log(text.toUpperCase());    // 转大写
console.log(text.toLowerCase());    // 转小写
console.log(text.indexOf("World")); // 查找位置
console.log(text.substring(0, 5));  // 截取子串
```

### 数组操作

```javascript
let fruits = ["苹果", "香蕉", "橙子"];

// 访问元素
console.log(fruits[0]);            // 第一个元素
console.log(fruits[fruits.length - 1]); // 最后一个元素

// 添加元素
fruits.push("葡萄");               // 末尾添加
fruits.unshift("草莓");            // 开头添加

// 删除元素
let lastFruit = fruits.pop();      // 删除并返回最后一个
let firstFruit = fruits.shift();   // 删除并返回第一个

// 数组方法
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(x => x * 2);        // 映射
let evens = numbers.filter(x => x % 2 === 0); // 过滤
let sum = numbers.reduce((acc, x) => acc + x, 0); // 归约
```

## 控制流

### 条件语句

```javascript
let age = 18;

// if-else
if (age >= 18) {
    console.log("成年人");
} else if (age >= 13) {
    console.log("青少年");
} else {
    console.log("儿童");
}

// 三元运算符
let status = age >= 18 ? "成年人" : "未成年人";

// switch 语句
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("星期一");
        break;
    case "Tuesday":
        console.log("星期二");
        break;
    default:
        console.log("其他天");
}
```

### 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// for...of 循环（ES6）
let colors = ["红色", "绿色", "蓝色"];
for (let color of colors) {
    console.log(color);
}

// for...in 循环
let person = { name: "张三", age: 25 };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// while 循环
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// do-while 循环
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 3);
```

## 函数

### 函数声明

```javascript
// 函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 函数表达式
const greet2 = function(name) {
    return `Hello, ${name}!`;
};

// 箭头函数（ES6）
const greet3 = (name) => {
    return `Hello, ${name}!`;
};

// 简化的箭头函数
const greet4 = name => `Hello, ${name}!`;

// 调用函数
console.log(greet("张三"));
```

### 函数参数

```javascript
// 默认参数
function introduce(name, age = 25, city = "北京") {
    return `我是${name}，${age}岁，来自${city}`;
}

// 剩余参数
function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// 解构参数
function displayUser({ name, age, city }) {
    console.log(`姓名: ${name}, 年龄: ${age}, 城市: ${city}`);
}

displayUser({ name: "李四", age: 30, city: "上海" });
```

### 高阶函数

```javascript
// 函数作为参数
function processArray(arr, processor) {
    return arr.map(processor);
}

let numbers = [1, 2, 3, 4, 5];
let doubled = processArray(numbers, x => x * 2);

// 函数作为返回值
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

## 对象和类

### 对象操作

```javascript
// 创建对象
let person = {
    name: "张三",
    age: 25,
    greet: function() {
        return `我是${this.name}`;
    }
};

// 访问属性
console.log(person.name);
console.log(person["age"]);
console.log(person.greet());

// 修改属性
person.age = 26;
person.city = "北京";

// 删除属性
delete person.city;

// 对象方法简写（ES6）
let person2 = {
    name: "李四",
    age: 30,
    greet() {
        return `我是${this.name}`;
    }
};
```

### 类和继承

```javascript
// 类声明（ES6）
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `我是${this.name}，${this.age}岁`;
    }
    
    // 静态方法
    static createAdult(name) {
        return new Person(name, 18);
    }
}

// 继承
class Student extends Person {
    constructor(name, age, studentId) {
        super(name, age);
        this.studentId = studentId;
    }
    
    study(subject) {
        return `${this.name}正在学习${subject}`;
    }
}

// 使用类
let student = new Student("王五", 20, "2023001");
console.log(student.greet());
console.log(student.study("JavaScript"));
```

## DOM 操作

### 选择元素

```javascript
// 选择单个元素
let element = document.getElementById('myId');
let element2 = document.querySelector('.myClass');
let element3 = document.querySelector('#myId');

// 选择多个元素
let elements = document.getElementsByClassName('myClass');
let elements2 = document.querySelectorAll('.myClass');
```

### 修改元素

```javascript
// 修改内容
element.textContent = "新文本";
element.innerHTML = "<strong>粗体文本</strong>";

// 修改属性
element.setAttribute('class', 'newClass');
element.className = 'anotherClass';

// 修改样式
element.style.color = 'red';
element.style.fontSize = '16px';

// 添加/删除类
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
```

### 事件处理

```javascript
// 添加事件监听器
element.addEventListener('click', function(event) {
    console.log('元素被点击了');
    console.log(event.target);
});

// 移除事件监听器
function handleClick(event) {
    console.log('点击处理');
}
element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// 事件委托
document.addEventListener('click', function(event) {
    if (event.target.matches('.button')) {
        console.log('按钮被点击了');
    }
});
```

## 异步编程

### Promise

```javascript
// 创建 Promise
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("数据获取成功");
        }, 1000);
    });
}

// 使用 Promise
fetchData()
    .then(data => {
        console.log(data);
        return "处理数据";
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error("错误:", error);
    });
```

### async/await

```javascript
// async 函数
async function fetchUserData() {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('获取用户数据失败:', error);
        throw error;
    }
}

// 使用 async/await
async function displayUser() {
    try {
        const userData = await fetchUserData();
        console.log('用户数据:', userData);
    } catch (error) {
        console.error('显示用户数据失败:', error);
    }
}
```

### Fetch API

```javascript
// GET 请求
fetch('/api/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('错误:', error));

// POST 请求
fetch('/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: '张三',
        email: 'zhangsan@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('创建成功:', data));
```

## 模块系统

### ES6 模块

```javascript
// math.js - 导出模块
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14159;

// 默认导出
export default function subtract(a, b) {
    return a - b;
}

// main.js - 导入模块
import subtract, { add, multiply, PI } from './math.js';

console.log(add(2, 3));        // 5
console.log(multiply(2, 3));    // 6
console.log(subtract(5, 2));   // 3
console.log(PI);               // 3.14159
```

### CommonJS 模块（Node.js）

```javascript
// math.js
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

module.exports = {
    add,
    multiply
};

// main.js
const { add, multiply } = require('./math.js');

console.log(add(2, 3));        // 5
console.log(multiply(2, 3));   // 6
```

## 错误处理

### try-catch

```javascript
try {
    // 可能出错的代码
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    // 处理错误
    console.error('发生错误:', error.message);
} finally {
    // 无论是否出错都会执行
    console.log('清理工作');
}
```

### 自定义错误

```javascript
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

function validateAge(age) {
    if (age < 0) {
        throw new ValidationError('年龄不能为负数');
    }
    if (age > 150) {
        throw new ValidationError('年龄不能超过150岁');
    }
    return true;
}

try {
    validateAge(-5);
} catch (error) {
    if (error instanceof ValidationError) {
        console.error('验证错误:', error.message);
    } else {
        console.error('未知错误:', error.message);
    }
}
```

## 最佳实践

### 代码组织

```javascript
// 使用 IIFE 避免全局污染
(function() {
    'use strict';
    
    // 私有变量
    let privateVar = '私有数据';
    
    // 公共接口
    window.MyModule = {
        publicMethod: function() {
            return privateVar;
        }
    };
})();

// 使用命名空间
const MyApp = {
    Utils: {
        formatDate: function(date) {
            return date.toLocaleDateString();
        }
    },
    Services: {
        fetchData: function() {
            return fetch('/api/data');
        }
    }
};
```

### 性能优化

```javascript
// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

## 学习资源

- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript 教程 - 菜鸟教程](https://www.runoob.com/js/js-tutorial.html)
- [JavaScript.info](https://zh.javascript.info/)
- [ES6 入门教程](https://es6.ruanyifeng.com/)

## 常见问题

### Q: JavaScript 和 Java 有什么关系？
A: 除了名字相似，JavaScript 和 Java 是完全不同的编程语言。JavaScript 主要用于 Web 开发，而 Java 是通用编程语言。

### Q: 如何调试 JavaScript 代码？
A: 使用浏览器开发者工具、console.log()、断点调试、错误处理等技术来调试代码。

### Q: JavaScript 是单线程还是多线程？
A: JavaScript 是单线程的，但通过事件循环和异步编程可以实现并发操作。