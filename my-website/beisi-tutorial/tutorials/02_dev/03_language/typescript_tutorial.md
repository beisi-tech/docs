# ts教程

## 一、JavaScript的困扰

- 1.不清不楚的数据类型
- 2.有漏洞的逻辑
- 3.访问不存在的属性
- 4.低级的拼写错误

TypeScript 核心就是「静态类型检查]。简言之就是把运行时的错误前置。同样的功能，TypeScript 的代码量要大于JavaScript，但由于 TypeScript 的代码结构更加清晰，在后期代码的维护中 TypeScript 却远胜于 JavaScript。

## 二、编译 TypeScript

浏览器不能直接运行 TypeScript 代码，需要编译为 JavaScript 再交由浏览器解析器执行。

自动化编译：

- 创建 TypeScript 编译控制文件 tsc --init
- 监视目录中的.ts 文件变化 tsc --watch
