---
sidebar_label: "TypeScript"
sidebar_position: 1
---

# TypeScript 教程

TypeScript 是 JavaScript 的超集，由 Microsoft 开发。它添加了静态类型检查，让 JavaScript 代码更加安全、可维护，特别适合大型项目的开发。

## TypeScript 的特点

- **静态类型检查**：编译时发现类型错误
- **更好的 IDE 支持**：智能提示、自动补全、重构
- **渐进式采用**：可以逐步将 JavaScript 项目迁移到 TypeScript
- **现代 JavaScript 特性**：支持最新的 ECMAScript 特性
- **大型项目友好**：适合团队协作和大型项目开发

## 环境搭建

### 安装 TypeScript

```bash
# 全局安装
npm install -g typescript

# 或项目本地安装
npm install --save-dev typescript

# 验证安装
tsc --version
```

### 初始化项目

```bash
# 创建项目目录
mkdir my-typescript-project
cd my-typescript-project

# 初始化 package.json
npm init -y

# 安装 TypeScript
npm install --save-dev typescript @types/node

# 初始化 TypeScript 配置
npx tsc --init
```

### 配置文件

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",                    // 编译目标
    "module": "commonjs",                  // 模块系统
    "lib": ["ES2020", "DOM"],             // 包含的库
    "outDir": "./dist",                    // 输出目录
    "rootDir": "./src",                    // 源码目录
    "strict": true,                        // 严格模式
    "esModuleInterop": true,              // ES 模块互操作
    "skipLibCheck": true,                 // 跳过库检查
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 基础类型

### 基本类型

```typescript
// 数字
let age: number = 25;
let height: number = 5.9;

// 字符串
let name: string = "张三";
let message: string = `你好，${name}！`;

// 布尔值
let isStudent: boolean = true;
let isWorking: boolean = false;

// 数组
let numbers: number[] = [1, 2, 3, 4, 5];
let fruits: string[] = ["苹果", "香蕉", "橙子"];

// 元组
let person: [string, number] = ["张三", 25];

// 枚举
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}
let favoriteColor: Color = Color.Red;

// 任意类型
let anything: any = 42;
anything = "字符串";
anything = true;

// 空值
let nothing: void = undefined;
let nullValue: null = null;
let undefinedValue: undefined = undefined;

// 永不存在的值
function throwError(): never {
  throw new Error("错误");
}
```

### 联合类型

```typescript
// 联合类型
let id: string | number;
id = "123";
id = 456;

// 字面量类型
let direction: "up" | "down" | "left" | "right";
direction = "up";

// 类型别名
type Status = "loading" | "success" | "error";
let currentStatus: Status = "loading";
```

## 接口

### 基本接口

```typescript
// 定义接口
interface Person {
  name: string;
  age: number;
  email?: string;  // 可选属性
  readonly id: number;  // 只读属性
}

// 使用接口
let user: Person = {
  name: "张三",
  age: 25,
  id: 1
};

// 可选属性
let user2: Person = {
  name: "李四",
  age: 30,
  id: 2
  // email 是可选的，可以不提供
};
```

### 函数接口

```typescript
// 函数类型接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};

// 可索引接口
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
```

### 类接口

```typescript
// 类接口
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
}
```

## 类

### 基本类

```typescript
class Animal {
  // 属性
  name: string;
  private age: number;  // 私有属性
  protected species: string;  // 受保护属性
  public isAlive: boolean = true;  // 公共属性

  // 构造函数
  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // 方法
  speak(): string {
    return `${this.name} makes a sound`;
  }

  // 私有方法
  private getAge(): number {
    return this.age;
  }

  // 静态方法
  static create(name: string): Animal {
    return new Animal(name, 0, "unknown");
  }
}

// 使用类
let dog = new Animal("旺财", 3, "狗");
console.log(dog.speak());
```

### 继承

```typescript
// 基类
class Vehicle {
  protected brand: string;
  protected year: number;

  constructor(brand: string, year: number) {
    this.brand = brand;
    this.year = year;
  }

  start(): string {
    return `${this.brand} started`;
  }
}

// 派生类
class Car extends Vehicle {
  private doors: number;

  constructor(brand: string, year: number, doors: number) {
    super(brand, year);
    this.doors = doors;
  }

  // 重写方法
  start(): string {
    return `Car ${super.start()}`;
  }

  // 新方法
  openTrunk(): string {
    return "Trunk opened";
  }
}

// 使用继承
let myCar = new Car("Toyota", 2020, 4);
console.log(myCar.start());
```

### 抽象类

```typescript
// 抽象类
abstract class Shape {
  protected color: string;

  constructor(color: string) {
    this.color = color;
  }

  // 抽象方法
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // 具体方法
  getColor(): string {
    return this.color;
  }
}

// 实现抽象类
class Circle extends Shape {
  private radius: number;

  constructor(color: string, radius: number) {
    super(color);
    this.radius = radius;
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}
```

## 泛型

### 基本泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let output2 = identity<number>(42);

// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 泛型约束

```typescript
// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

// 在泛型约束中使用类型参数
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a"); // 正确
getProperty(x, "m"); // 错误
```

## 模块

### 导出

```typescript
// math.ts
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export const PI = 3.14159;

// 默认导出
export default function subtract(a: number, b: number): number {
  return a - b;
}

// 重新导出
export { add as addNumbers } from './math';
```

### 导入

```typescript
// main.ts
import subtract, { add, multiply, PI } from './math';
import * as MathUtils from './math';

console.log(add(2, 3));        // 5
console.log(multiply(2, 3));    // 6
console.log(subtract(5, 2));   // 3
console.log(PI);               // 3.14159

// 使用命名空间导入
console.log(MathUtils.add(2, 3));
```

## 装饰器

### 类装饰器

```typescript
// 装饰器函数
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  type = "report";
  title: string;

  constructor(t: string) {
    this.title = t;
  }
}
```

### 方法装饰器

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

## 高级类型

### 映射类型

```typescript
// 映射类型
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

// 使用映射类型
interface User {
  name: string;
  age: number;
  email: string;
}

type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
```

### 条件类型

```typescript
// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

type Example1 = NonNullable<string | null>;  // string
type Example2 = NonNullable<number | undefined>;  // number
```

### 工具类型

```typescript
// 内置工具类型
interface Person {
  name: string;
  age: number;
  email: string;
}

// Partial - 所有属性变为可选
type PartialPerson = Partial<Person>;

// Pick - 选择特定属性
type NameAndAge = Pick<Person, 'name' | 'age'>;

// Omit - 排除特定属性
type WithoutEmail = Omit<Person, 'email'>;

// Record - 创建记录类型
type StringRecord = Record<string, string>;

// ReturnType - 获取函数返回类型
function getUser() {
  return { name: 'John', age: 30 };
}
type User = ReturnType<typeof getUser>;
```

## 错误处理

### 异常处理

```typescript
// 自定义错误类
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// 错误处理函数
function validateAge(age: number): void {
  if (age < 0) {
    throw new ValidationError('年龄不能为负数');
  }
  if (age > 150) {
    throw new ValidationError('年龄不能超过150岁');
  }
}

// 使用 try-catch
try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('验证错误:', error.message);
  } else {
    console.error('未知错误:', error);
  }
}
```

## 与 JavaScript 集成

### 类型声明文件

```typescript
// types.d.ts
declare module 'my-library' {
  export function doSomething(): void;
  export const version: string;
}

// 全局声明
declare global {
  interface Window {
    myGlobalVar: string;
  }
}

// 模块声明
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
```

### 渐进式迁移

```typescript
// 1. 添加类型注解
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// 2. 使用 any 类型过渡
let data: any = fetchData();

// 3. 逐步添加具体类型
interface UserData {
  name: string;
  age: number;
}

let userData: UserData = data;
```

## 最佳实践

### 类型设计

```typescript
// 使用联合类型而不是 any
type Status = 'loading' | 'success' | 'error';

// 使用接口定义对象结构
interface ApiResponse<T> {
  data: T;
  status: Status;
  message?: string;
}

// 使用泛型提高复用性
function createApiResponse<T>(data: T, status: Status): ApiResponse<T> {
  return { data, status };
}
```

### 代码组织

```typescript
// 使用命名空间组织代码
namespace MyApp {
  export interface User {
    name: string;
    age: number;
  }

  export class UserService {
    static getUser(id: number): User {
      // 实现
      return { name: 'John', age: 30 };
    }
  }
}

// 使用模块组织代码
// user.ts
export interface User {
  name: string;
  age: number;
}

export class UserService {
  static getUser(id: number): User {
    return { name: 'John', age: 30 };
  }
}
```

## 学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript 中文文档](https://www.tslang.cn/)
- [TypeScript 教程 - 菜鸟教程](https://www.runoob.com/typescript/ts-tutorial.html)
- [TypeScript 深入理解](https://jkchao.github.io/typescript-book-chinese/)

## 常见问题

### Q: TypeScript 和 JavaScript 有什么区别？
A: TypeScript 是 JavaScript 的超集，添加了静态类型检查，编译后生成 JavaScript 代码。

### Q: 如何将现有的 JavaScript 项目迁移到 TypeScript？
A: 可以逐步迁移，先添加类型注解，然后逐步完善类型定义。

### Q: TypeScript 会影响性能吗？
A: TypeScript 只在编译时进行类型检查，运行时性能与 JavaScript 相同。