---
sidebar_label: "JavaScript"
sidebar_position: 3
---

# JavaScript 教程

JavaScript 是一种高级的、解释型的编程语言，主要用于 Web 开发。它是现代 Web 开发的核心技术之一，支持前端和后端开发。

## 什么是 JavaScript？

JavaScript 是一种动态类型的编程语言，具有以下特点：

- **动态类型**：变量类型在运行时确定
- **解释型语言**：代码在运行时解释执行
- **面向对象**：支持面向对象编程范式
- **函数式编程**：支持函数式编程特性
- **异步编程**：支持异步操作和事件驱动编程

## 环境准备

### 浏览器环境

JavaScript 可以直接在浏览器中运行：

```html
<!DOCTYPE html>
<html>
<head>
    <title>JavaScript 示例</title>
</head>
<body>
    <script>
        console.log('Hello, JavaScript!');
    </script>
</body>
</html>
```

### Node.js 环境

安装 Node.js 后可以在命令行中运行 JavaScript：

```bash
node --version
node script.js
```

### 在线编辑器

- [CodePen](https://codepen.io/)
- [JSFiddle](https://jsfiddle.net/)
- [Repl.it](https://repl.it/)

## 基础语法

### 变量声明

```javascript
// var (函数作用域，不推荐)
var name = 'John';

// let (块作用域，推荐)
let age = 25;

// const (常量，推荐)
const PI = 3.14159;

// 解构赋值
const [a, b, c] = [1, 2, 3];
const { name: userName, age: userAge } = { name: 'John', age: 25 };
```

### 数据类型

```javascript
// 基本数据类型
let string = 'Hello World';
let number = 42;
let boolean = true;
let undefinedVar = undefined;
let nullVar = null;
let symbol = Symbol('id');

// 对象类型
let object = {
  name: 'John',
  age: 25,
  isActive: true
};

let array = [1, 2, 3, 4, 5];
let function = function() { return 'Hello'; };

// 类型检查
typeof string;        // 'string'
typeof number;        // 'number'
typeof boolean;       // 'boolean'
typeof object;        // 'object'
typeof array;         // 'object'
typeof function;      // 'function'
```

### 运算符

```javascript
// 算术运算符
let a = 10, b = 3;
console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.333...
console.log(a % b);   // 1
console.log(a ** b);  // 1000 (幂运算)

// 比较运算符
console.log(a > b);   // true
console.log(a < b);   // false
console.log(a >= b);  // true
console.log(a <= b);  // false
console.log(a == b);  // false (值相等)
console.log(a === b); // false (值和类型都相等)
console.log(a != b);  // true
console.log(a !== b); // true

// 逻辑运算符
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

// 三元运算符
let result = a > b ? 'a is greater' : 'b is greater';
```

## 控制流程

### 条件语句

```javascript
// if-else
let score = 85;

if (score >= 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else if (score >= 70) {
    console.log('C');
} else {
    console.log('F');
}

// switch 语句
let day = 'Monday';

switch (day) {
    case 'Monday':
        console.log('Start of work week');
        break;
    case 'Friday':
        console.log('TGIF!');
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('Weekend!');
        break;
    default:
        console.log('Regular day');
}
```

### 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// for...of 循环
const fruits = ['apple', 'banana', 'orange'];
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in 循环
const person = { name: 'John', age: 25 };
for (const key in person) {
    console.log(key, person[key]);
}

// while 循环
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// do-while 循环
let x = 0;
do {
    console.log(x);
    x++;
} while (x < 3);
```

## 函数

### 函数声明和表达式

```javascript
// 函数声明
function greet(name) {
    return `Hello, ${name}!`;
}

// 函数表达式
const greet2 = function(name) {
    return `Hello, ${name}!`;
};

// 箭头函数
const greet3 = (name) => {
    return `Hello, ${name}!`;
};

// 箭头函数简化
const greet4 = name => `Hello, ${name}!`;

// 调用函数
console.log(greet('World'));     // Hello, World!
console.log(greet2('World'));    // Hello, World!
console.log(greet3('World'));    // Hello, World!
console.log(greet4('World'));    // Hello, World!
```

### 高阶函数

```javascript
// 函数作为参数
function applyOperation(x, y, operation) {
    return operation(x, y);
}

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

console.log(applyOperation(5, 3, add));        // 8
console.log(applyOperation(5, 3, multiply));   // 15

// 函数作为返回值
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

### 闭包

```javascript
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1
console.log(counter1()); // 3
```

## 数组操作

### 数组方法

```javascript
const numbers = [1, 2, 3, 4, 5];

// map - 转换数组
const doubled = numbers.map(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// filter - 过滤数组
const evens = numbers.filter(x => x % 2 === 0);
console.log(evens); // [2, 4]

// reduce - 归约数组
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// find - 查找元素
const found = numbers.find(x => x > 3);
console.log(found); // 4

// some - 检查是否有元素满足条件
const hasEven = numbers.some(x => x % 2 === 0);
console.log(hasEven); // true

// every - 检查所有元素是否满足条件
const allPositive = numbers.every(x => x > 0);
console.log(allPositive); // true

// forEach - 遍历数组
numbers.forEach(x => console.log(x));

// 链式调用
const result = numbers
    .filter(x => x % 2 === 0)
    .map(x => x * 2)
    .reduce((acc, curr) => acc + curr, 0);
console.log(result); // 12
```

### 数组解构和展开

```javascript
// 数组解构
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3, 4, 5]

// 展开运算符
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 复制数组
const original = [1, 2, 3];
const copy = [...original];
```

## 对象操作

### 对象创建和访问

```javascript
// 对象字面量
const person = {
    name: 'John',
    age: 25,
    greet() {
        return `Hello, I'm ${this.name}`;
    }
};

// 访问属性
console.log(person.name);        // John
console.log(person['age']);      // 25
console.log(person.greet());     // Hello, I'm John

// 动态属性名
const prop = 'name';
console.log(person[prop]);       // John

// 对象解构
const { name, age } = person;
console.log(name, age);          // John 25

// 对象展开
const extendedPerson = { ...person, city: 'New York' };
console.log(extendedPerson);
```

### 对象方法

```javascript
const users = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 30 },
    { name: 'Bob', age: 20 }
];

// Object.keys()
const keys = Object.keys(users[0]);
console.log(keys); // ['name', 'age']

// Object.values()
const values = Object.values(users[0]);
console.log(values); // ['John', 25]

// Object.entries()
const entries = Object.entries(users[0]);
console.log(entries); // [['name', 'John'], ['age', 25]]

// Object.assign()
const newUser = Object.assign({}, users[0], { city: 'New York' });
console.log(newUser);
```

## ES6+ 特性

### 模板字符串

```javascript
const name = 'John';
const age = 25;

// 模板字符串
const message = `Hello, my name is ${name} and I'm ${age} years old.`;
console.log(message);

// 多行字符串
const multiLine = `
    This is a
    multi-line
    string.
`;
```

### 类和继承

```javascript
// 类定义
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    static createAdult(name) {
        return new Person(name, 18);
    }
}

// 继承
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    
    study() {
        return `${this.name} is studying`;
    }
}

const student = new Student('Alice', 20, 'A');
console.log(student.greet());  // Hello, I'm Alice
console.log(student.study()); // Alice is studying

// 静态方法
const adult = Person.createAdult('Bob');
console.log(adult.age); // 18
```

### Promise 和异步编程

```javascript
// Promise 基础
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});

promise.then(result => {
    console.log(result); // Success!
}).catch(error => {
    console.error(error);
});

// async/await
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 并行执行
async function fetchMultipleData() {
    const [data1, data2, data3] = await Promise.all([
        fetchData(),
        fetchData(),
        fetchData()
    ]);
    return { data1, data2, data3 };
}
```

### 模块系统

```javascript
// math.js (模块)
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;

export default class Calculator {
    multiply(a, b) {
        return a * b;
    }
}

// main.js (使用模块)
import Calculator, { add, subtract } from './math.js';

const calc = new Calculator();
console.log(add(5, 3));           // 8
console.log(calc.multiply(4, 6)); // 24
```

## DOM 操作

### 选择元素

```javascript
// 选择单个元素
const element = document.getElementById('myId');
const element2 = document.querySelector('.myClass');
const element3 = document.querySelector('#myId .myClass');

// 选择多个元素
const elements = document.querySelectorAll('.myClass');
const elements2 = document.getElementsByClassName('myClass');
```

### 修改元素

```javascript
// 修改内容
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// 修改属性
element.setAttribute('class', 'newClass');
element.className = 'anotherClass';

// 修改样式
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// 添加/移除类
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');
```

### 事件处理

```javascript
// 添加事件监听器
element.addEventListener('click', function(event) {
    console.log('Clicked!', event.target);
});

// 箭头函数
element.addEventListener('click', (event) => {
    console.log('Clicked!', event.target);
});

// 事件委托
document.addEventListener('click', (event) => {
    if (event.target.matches('.button')) {
        console.log('Button clicked!');
    }
});

// 移除事件监听器
const handler = (event) => console.log('Clicked!');
element.addEventListener('click', handler);
element.removeEventListener('click', handler);
```

## 错误处理

### try-catch

```javascript
try {
    // 可能出错的代码
    const result = riskyOperation();
    console.log(result);
} catch (error) {
    // 处理错误
    console.error('Error occurred:', error.message);
} finally {
    // 无论是否出错都会执行
    console.log('Cleanup');
}

// 抛出错误
function validateAge(age) {
    if (age < 0) {
        throw new Error('Age cannot be negative');
    }
    if (age > 150) {
        throw new Error('Age cannot be greater than 150');
    }
    return true;
}
```

### 异步错误处理

```javascript
// Promise 错误处理
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// async/await 错误处理
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}
```

## 性能优化

### 防抖和节流

```javascript
// 防抖函数
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// 节流函数
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// 使用示例
const debouncedSearch = debounce((query) => {
    console.log('Searching for:', query);
}, 300);

const throttledScroll = throttle(() => {
    console.log('Scrolling...');
}, 100);
```

### 内存管理

```javascript
// 避免内存泄漏
function createHandler() {
    const data = new Array(1000000).fill('data');
    
    return function() {
        // 使用 data
        console.log(data.length);
    };
}

// 清理事件监听器
function setupEventListeners() {
    const handler = (event) => console.log(event);
    document.addEventListener('click', handler);
    
    // 返回清理函数
    return () => document.removeEventListener('click', handler);
}

const cleanup = setupEventListeners();
// 在适当的时候调用
cleanup();
```

## 测试

### 单元测试

```javascript
// 简单的测试函数
function test(description, testFn) {
    try {
        testFn();
        console.log(`✓ ${description}`);
    } catch (error) {
        console.log(`✗ ${description}`);
        console.log(error);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
            }
        }
    };
}

// 测试示例
test('add function', () => {
    expect(add(2, 3)).toBe(5);
});

test('array operations', () => {
    const numbers = [1, 2, 3];
    const doubled = numbers.map(x => x * 2);
    expect(doubled).toEqual([2, 4, 6]);
});
```

## 最佳实践

1. **使用 const 和 let**：避免使用 var
2. **函数式编程**：优先使用 map、filter、reduce
3. **错误处理**：总是处理可能的错误
4. **代码组织**：使用模块化开发
5. **性能优化**：避免不必要的 DOM 操作
6. **代码可读性**：使用有意义的变量名和函数名

## 学习资源

- [MDN JavaScript 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

## 常见问题

### Q: JavaScript 是单线程的吗？
A: JavaScript 本身是单线程的，但通过事件循环和异步操作可以实现并发。

### Q: 如何避免回调地狱？
A: 使用 Promise、async/await 或函数式编程方法如 map、filter 等。

### Q: 什么是闭包？
A: 闭包是函数能够访问其外部作用域变量的特性，即使外部函数已经执行完毕。