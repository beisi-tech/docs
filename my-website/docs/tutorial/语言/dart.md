---
sidebar_label: "Dart"
sidebar_position: 5
---
# Dart 教程

Dart 是 Google 开发的一门现代化、面向对象且具备空安全（null safety）的编程语言，常与 Flutter 一起用于跨平台应用开发（iOS/Android/Web/桌面）。Dart 同时适用于服务端、脚本和命令行工具开发。

## Dart 的特点

- 强类型 + 空安全：在编译期发现更多问题
- 现代语法：简洁、可读性强，支持表达式函数、可选参数等
- 高性能：AOT 编译原生代码、JIT 支持热重载
- 异步友好：内置 `Future`/`Stream`，支持 `async/await`
- 跨平台：配合 Flutter 覆盖多端，也可用于后端与 CLI

## 环境与工具

### 安装 Dart SDK
- 推荐安装 Flutter（包含 Dart SDK）：参考 Flutter 官方安装文档
- 或单独安装 Dart SDK：访问 `https://dart.dev/get-dart`

验证安装：
```bash
dart --version
```

### 常用命令
```bash
# 运行 Dart 文件
dart run bin/main.dart

# 创建新的 Dart 控制台项目
dart create -t console dart_demo

# 代码格式化
dart format .

# 静态检查
dart analyze
```

## 语法基础

### 变量与常量
```dart
// 明确类型
type name = value;
int age = 18;
String username = 'alice';

// 使用 var/const/final
var city = 'Beijing';     // 推断为 String
final createdAt = DateTime.now(); // 运行期常量
const pi = 3.1415926;     // 编译期常量

// 可空与非空（空安全）
int? maybeNumber;         // 可为 null
int count = 0;            // 非空，必须初始化
```

### 内置类型与字面量
```dart
int a = 1;
double b = 2.5;
bool ok = true;
String s = 'hello';

// 字符串插值
String greet = 'Hi, $s, a+b=${a + b}';

// 集合
List<int> numbers = [1, 2, 3];
Set<String> tags = {'a', 'b'};
Map<String, int> score = {'Tom': 90, 'Jerry': 88};
```

### 控制流
```dart
if (a > 0) {
  // ...
} else if (a == 0) {
} else {}

for (var i = 0; i < 3; i++) {
  // ...
}

for (final n in numbers) {
  // ...
}

while (a < 5) {
  a++;
}

do {
  a--;
} while (a > 0);
```

### 函数与参数
```dart
// 普通函数
int add(int x, int y) {
  return x + y;
}

// 表达式函数
int sub(int x, int y) => x - y;

// 可选命名参数（带默认值）
String formatUser(String name, {int age = 18, String city = 'Beijing'}) {
  return '$name, $age, $city';
}

// 可选位置参数
String join(String a, [String b = '', String c = '']) => '$a$b$c';

// 匿名函数/高阶函数
void apply(List<int> list, int Function(int) f) {
  for (var i = 0; i < list.length; i++) {
    list[i] = f(list[i]);
  }
}
```

## 面向对象

### 类与构造函数
```dart
class Person {
  final String name;
  int age;

  // 常规构造
  Person(this.name, this.age);

  // 命名构造函数
  Person.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'];

  // 工厂构造（可返回缓存或子类）
  factory Person.empty() => Person('unknown', 0);

  void birthday() => age++;
  @override
  String toString() => 'Person(name: $name, age: $age)';
}
```

### 继承、接口、抽象
```dart
abstract class Animal {
  void speak();
}

class Dog extends Animal {
  @override
  void speak() => print('Woof');
}

// Dart 没有单独的 interface 关键字，任何类都可作为接口被 implements
class Loggable {
  void log(String msg) => print('[LOG] $msg');
}

class LoggerDog extends Dog implements Loggable {
  @override
  void log(String msg) => print('[Dog] $msg');
}
```

### Mixins 与扩展方法
```dart
mixin Walkable {
  void walk() => print('Walking');
}

class Cat with Walkable {}

extension StringX on String {
  String capitalize() => isEmpty ? this : this[0].toUpperCase() + substring(1);
}
```

## 集合与可迭代
```dart
final list = <int>[1, 2, 3];
list.add(4);
final doubled = list.map((e) => e * 2).toList();
final filtered = list.where((e) => e.isEven).toList();

final set = <String>{'a', 'b'}..add('a'); // 仍为 {a,b}

final map = <String, int>{'a': 1, 'b': 2};
map['c'] = 3;
map.update('a', (v) => v + 10, ifAbsent: () => 0);
```

## 空安全与可空类型
```dart
int? maybe;
// 空判断
final v = maybe ?? 0;       // null 合并
// 条件访问
print(maybe?.toString());   // maybe 为 null 时结果为 null
// 断言非空（谨慎使用）
int sure = maybe!;          // 若 maybe 为 null 将抛异常
```

## 异步编程：Future 与 Stream

### Future 与 async/await
```dart
Future<int> fetchNumber() async {
  await Future.delayed(Duration(milliseconds: 300));
  return 42;
}

Future<void> main() async {
  try {
    final n = await fetchNumber();
    print('result: $n');
  } catch (e) {
    print('error: $e');
  }
}
```

### Stream（数据流）
```dart
Stream<int> counter(int max) async* {
  for (var i = 1; i <= max; i++) {
    await Future.delayed(Duration(milliseconds: 100));
    yield i;
  }
}

void listenDemo() async {
  await for (final v in counter(5)) {
    print('tick: $v');
  }
}
```

## 错误与异常
```dart
int safeParse(String s) {
  try {
    return int.parse(s);
  } on FormatException {
    return -1;
  } catch (e, st) {
    // 其它错误
    print('error: $e');
    print(st);
    rethrow; // 需要时可继续上抛
  } finally {
    // 收尾工作
  }
}
```

## 包管理（pub）

`pubspec.yaml` 示例：
```yaml
name: dart_demo
description: Demo project
version: 0.1.0
environment:
  sdk: '>=3.0.0 <4.0.0'
dependencies:
  http: ^1.2.0
dev_dependencies:
  test: ^1.25.0
```

常用命令：
```bash
# 获取依赖
dart pub get

# 升级依赖
dart pub upgrade

# 运行测试
dart test
```

使用第三方包：
```dart
import 'package:http/http.dart' as http;

Future<void> fetchTodo() async {
  final res = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/todos/1'));
  if (res.statusCode == 200) {
    print(res.body);
  }
}
```

## CLI 项目示例

项目结构：
```
project/
├─ bin/
│  └─ main.dart
├─ lib/
│  └─ utils.dart
└─ pubspec.yaml
```

`bin/main.dart`：
```dart
import 'package:project/utils.dart';

void main(List<String> args) {
  print('Args: $args');
  print(sum([1, 2, 3]));
}
```

`lib/utils.dart`：
```dart
int sum(List<int> nums) => nums.fold(0, (a, b) => a + b);
```

运行：
```bash
dart run bin/main.dart a b c
```

## 并发模型：Isolates（了解）

Dart 通过 Isolate 提供多线程并行能力，每个 Isolate 有独立内存，通过消息传递通信：
```dart
import 'dart:isolate';

void worker(SendPort send) {
  send.send('hello from isolate');
}

Future<void> spawnDemo() async {
  final receive = ReceivePort();
  await Isolate.spawn(worker, receive.sendPort);
  receive.listen((msg) {
    print(msg);
    receive.close();
  });
}
```

## 与 Flutter 的关系

- Flutter 使用 Dart 构建跨平台 UI
- 学习 Dart 语法与异步编程，将帮助更快掌握 Flutter
- 常配合：`dart devtools`、`flutter pub` 等工具链

## 最佳实践

- 开启分析与格式化：`dart analyze`、`dart format`
- 善用空安全：优先非空类型，必要时使用可空与 null 合并
- 纯函数与不可变：尽量减少副作用，提高可测试性
- 分层与模块化：清晰的包与库划分，避免循环依赖
- 单元测试优先：使用 `package:test` 覆盖核心逻辑

## 学习资源

- 官方文档：`https://dart.dev/`
- 语言导览：`https://dart.dev/language`
- 包搜索：`https://pub.dev/`
- 异步指南：`https://dart.dev/codelabs/async-await`

## 常见问题

- Q: Dart 与 Java/Kotlin/TS 的关系？
  - A: 语法风格相近（强类型、OOP、泛函特性），但 Dart 拥有自己的运行时与工具链，AOT/JIT 并存。
- Q: 需要先学 Flutter 吗？
  - A: 不需要。可先用 Dart 写 CLI/脚本/后端，打好语言与异步基础再上手 Flutter 更顺利。
- Q: 空安全会带来不便吗？
  - A: 初期需要适应，但能显著减少 NPE 类错误，建议拥抱空安全与类型系统。
