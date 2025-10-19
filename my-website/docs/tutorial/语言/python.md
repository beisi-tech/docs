---
sidebar_label: "Python"
sidebar_position: 4
---

# Python 教程

Python 是一种高级的、解释型的编程语言，以其简洁的语法和强大的功能而闻名。它广泛应用于 Web 开发、数据科学、人工智能、自动化脚本等领域。

## 什么是 Python？

Python 是一种动态类型的编程语言，具有以下特点：

- **简洁易读**：语法清晰，代码可读性强
- **跨平台**：支持 Windows、macOS、Linux 等操作系统
- **丰富的库**：拥有庞大的标准库和第三方库生态系统
- **面向对象**：支持面向对象编程范式
- **开源免费**：完全开源，社区活跃

## 环境准备

### 安装 Python

#### Windows

1. 访问 [Python 官网](https://www.python.org/downloads/)
2. 下载最新版本的 Python
3. 运行安装程序，勾选 "Add Python to PATH"
4. 验证安装：

```bash
python --version
pip --version
```

#### macOS

```bash
# 使用 Homebrew 安装
brew install python

# 或下载官方安装包
# 访问 https://www.python.org/downloads/macos/
```

#### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# CentOS/RHEL
sudo yum install python3 python3-pip
```

### 虚拟环境

```bash
# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows
myenv\Scripts\activate

# macOS/Linux
source myenv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 退出虚拟环境
deactivate
```

## 基础语法

### 变量和数据类型

```python
# 变量声明
name = "John"
age = 25
height = 1.75
is_student = True

# 数据类型
print(type(name))        # <class 'str'>
print(type(age))         # <class 'int'>
print(type(height))      # <class 'float'>
print(type(is_student))  # <class 'bool'>

# 类型转换
age_str = str(age)
height_int = int(height)
is_student_num = int(is_student)
```

### 字符串操作

```python
# 字符串创建
text = "Hello, World!"
text2 = 'Python Programming'
multiline = """这是一个
多行字符串"""

# 字符串方法
print(text.upper())           # HELLO, WORLD!
print(text.lower())           # hello, world!
print(text.replace("World", "Python"))  # Hello, Python!
print(text.split(","))        # ['Hello', ' World!']

# 字符串格式化
name = "Alice"
age = 30
print(f"Hello, {name}! You are {age} years old.")
print("Hello, {}! You are {} years old.".format(name, age))
```

### 数字和数学运算

```python
# 基本运算
a = 10
b = 3

print(a + b)    # 13
print(a - b)    # 7
print(a * b)    # 30
print(a / b)    # 3.333...
print(a // b)   # 3 (整除)
print(a % b)    # 1 (取余)
print(a ** b)   # 1000 (幂运算)

# 数学函数
import math

print(math.sqrt(16))      # 4.0
print(math.pow(2, 3))     # 8.0
print(math.pi)             # 3.141592653589793
print(math.sin(math.pi/2)) # 1.0
```

## 控制流程

### 条件语句

```python
# if-elif-else
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Your grade is {grade}")

# 三元运算符
status = "Pass" if score >= 60 else "Fail"
print(status)
```

### 循环语句

```python
# for 循环
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)

# 带索引的循环
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# range 函数
for i in range(5):
    print(i)

for i in range(1, 10, 2):  # 从1到9，步长为2
    print(i)

# while 循环
count = 0
while count < 5:
    print(count)
    count += 1

# 循环控制
for i in range(10):
    if i == 3:
        continue  # 跳过当前迭代
    if i == 7:
        break    # 退出循环
    print(i)
```

## 数据结构

### 列表 (List)

```python
# 创建列表
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
empty = []

# 列表操作
numbers.append(6)           # 添加元素
numbers.insert(0, 0)        # 在索引0处插入0
numbers.remove(3)           # 删除第一个3
popped = numbers.pop()      # 删除并返回最后一个元素
numbers.extend([7, 8, 9])   # 扩展列表

# 列表切片
print(numbers[1:4])         # [1, 2, 4]
print(numbers[:3])          # [0, 1, 2]
print(numbers[3:])          # [4, 5, 6, 7, 8, 9]
print(numbers[::-1])        # 反转列表

# 列表推导式
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
```

### 字典 (Dictionary)

```python
# 创建字典
person = {
    "name": "John",
    "age": 25,
    "city": "New York"
}

# 访问和修改
print(person["name"])       # John
print(person.get("age"))    # 25
person["email"] = "john@example.com"

# 字典方法
print(person.keys())        # dict_keys(['name', 'age', 'city', 'email'])
print(person.values())      # dict_values(['John', 25, 'New York', 'john@example.com'])
print(person.items())       # dict_items([('name', 'John'), ...])

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)         # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### 元组 (Tuple)

```python
# 创建元组
coordinates = (10, 20)
colors = ("red", "green", "blue")
single = (42,)  # 单元素元组需要逗号

# 元组解包
x, y = coordinates
print(f"x: {x}, y: {y}")

# 元组是不可变的
# coordinates[0] = 15  # 这会报错
```

### 集合 (Set)

```python
# 创建集合
numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "orange"}

# 集合操作
numbers.add(6)              # 添加元素
numbers.remove(1)           # 删除元素
numbers.discard(7)          # 安全删除（不存在也不报错）

# 集合运算
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}

print(set1 | set2)          # 并集 {1, 2, 3, 4, 5, 6}
print(set1 & set2)          # 交集 {3, 4}
print(set1 - set2)          # 差集 {1, 2}
print(set1 ^ set2)          # 对称差集 {1, 2, 5, 6}
```

## 函数

### 函数定义和调用

```python
# 基本函数
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))       # Hello, Alice!

# 默认参数
def greet_with_title(name, title="Mr."):
    return f"Hello, {title} {name}!"

print(greet_with_title("Smith"))           # Hello, Mr. Smith!
print(greet_with_title("Smith", "Dr."))    # Hello, Dr. Smith!

# 可变参数
def sum_numbers(*args):
    return sum(args)

print(sum_numbers(1, 2, 3, 4))     # 10

# 关键字参数
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="John", age=25, city="NYC")

# 返回值
def get_user_info():
    return "John", 25, "NYC"  # 返回元组

name, age, city = get_user_info()
```

### 高阶函数

```python
# 函数作为参数
def apply_operation(x, y, operation):
    return operation(x, y)

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

print(apply_operation(5, 3, add))        # 8
print(apply_operation(5, 3, multiply))    # 15

# lambda 函数
square = lambda x: x ** 2
print(square(5))  # 25

# 内置高阶函数
numbers = [1, 2, 3, 4, 5]

# map
squares = list(map(lambda x: x**2, numbers))
print(squares)  # [1, 4, 9, 16, 25]

# filter
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# reduce
from functools import reduce
sum_all = reduce(lambda x, y: x + y, numbers)
print(sum_all)  # 15
```

## 面向对象编程

### 类和对象

```python
class Person:
    # 类变量
    species = "Homo sapiens"
    
    def __init__(self, name, age):
        # 实例变量
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"
    
    def have_birthday(self):
        self.age += 1
        return f"Happy birthday! Now I'm {self.age} years old"

# 创建对象
person = Person("Alice", 25)
print(person.greet())           # Hello, I'm Alice
print(person.have_birthday())   # Happy birthday! Now I'm 26 years old
```

### 继承

```python
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # 调用父类构造函数
        self.student_id = student_id
    
    def study(self, subject):
        return f"{self.name} is studying {subject}"
    
    def greet(self):  # 重写父类方法
        return f"Hi, I'm {self.name}, a student"

# 使用子类
student = Student("Bob", 20, "S12345")
print(student.greet())         # Hi, I'm Bob, a student
print(student.study("Math"))   # Bob is studying Math
```

### 特殊方法

```python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    def __len__(self):
        return self.pages
    
    def __eq__(self, other):
        return self.title == other.title and self.author == other.author

book1 = Book("Python Guide", "John Doe", 300)
book2 = Book("Python Guide", "John Doe", 250)

print(book1)           # Python Guide by John Doe
print(len(book1))      # 300
print(book1 == book2)  # True
```

## 文件操作

### 文件读写

```python
# 写入文件
with open("example.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\n")
    file.write("This is a Python example.\n")

# 读取文件
with open("example.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# 逐行读取
with open("example.txt", "r", encoding="utf-8") as file:
    for line in file:
        print(line.strip())

# 读取所有行
with open("example.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
    print(lines)
```

### CSV 文件处理

```python
import csv

# 写入 CSV
data = [
    ["Name", "Age", "City"],
    ["John", 25, "New York"],
    ["Alice", 30, "London"],
    ["Bob", 35, "Tokyo"]
]

with open("people.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# 读取 CSV
with open("people.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

## 异常处理

### try-except

```python
# 基本异常处理
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")

# 多个异常
try:
    number = int("abc")
    result = 10 / number
except ValueError:
    print("Invalid number format")
except ZeroDivisionError:
    print("Cannot divide by zero")
except Exception as e:
    print(f"An error occurred: {e}")

# finally 块
try:
    file = open("nonexistent.txt", "r")
except FileNotFoundError:
    print("File not found")
finally:
    print("This always executes")
```

### 自定义异常

```python
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    if age < 0:
        raise CustomError("Age cannot be negative")
    if age > 150:
        raise CustomError("Age cannot be greater than 150")
    return True

try:
    validate_age(-5)
except CustomError as e:
    print(f"Custom error: {e.message}")
```

## 模块和包

### 创建模块

```python
# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

def power(a, b):
    return a ** b

# 使用模块
import math_utils

result = math_utils.add(5, 3)
print(result)  # 8

# 或者
from math_utils import add, multiply
result = add(5, 3)
print(result)  # 8
```

### 包结构

```
my_package/
    __init__.py
    utils.py
    models.py
    tests/
        __init__.py
        test_utils.py
```

```python
# my_package/__init__.py
from .utils import helper_function
from .models import User

__version__ = "1.0.0"

# 使用包
from my_package import helper_function, User
```

## 常用库

### requests (HTTP 请求)

```python
import requests

# GET 请求
response = requests.get("https://api.github.com/users/octocat")
data = response.json()
print(data["name"])

# POST 请求
payload = {"name": "John", "age": 25}
response = requests.post("https://httpbin.org/post", json=payload)
print(response.json())
```

### pandas (数据处理)

```python
import pandas as pd

# 创建 DataFrame
data = {
    "Name": ["John", "Alice", "Bob"],
    "Age": [25, 30, 35],
    "City": ["New York", "London", "Tokyo"]
}

df = pd.DataFrame(data)
print(df)

# 数据操作
print(df.describe())          # 统计信息
print(df[df["Age"] > 25])     # 过滤数据
print(df.groupby("City").mean())  # 分组统计
```

### matplotlib (数据可视化)

```python
import matplotlib.pyplot as plt
import numpy as np

# 创建数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 绘制图形
plt.figure(figsize=(10, 6))
plt.plot(x, y, label="sin(x)")
plt.xlabel("x")
plt.ylabel("y")
plt.title("Sine Wave")
plt.legend()
plt.grid(True)
plt.show()
```

## 项目实践

### 简单的 Web 爬虫

```python
import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 提取标题
        title = soup.find('title').text
        print(f"页面标题: {title}")
        
        # 提取所有链接
        links = soup.find_all('a', href=True)
        print(f"找到 {len(links)} 个链接")
        
        return {
            'title': title,
            'links': [link['href'] for link in links]
        }
    except Exception as e:
        print(f"爬取失败: {e}")
        return None

# 使用示例
result = scrape_website("https://example.com")
```

### 数据处理脚本

```python
import csv
import json
from datetime import datetime

def process_sales_data(input_file, output_file):
    """处理销售数据"""
    sales_data = []
    
    with open(input_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            # 数据清洗和转换
            processed_row = {
                'date': datetime.strptime(row['date'], '%Y-%m-%d').isoformat(),
                'product': row['product'].strip().title(),
                'quantity': int(row['quantity']),
                'price': float(row['price']),
                'total': int(row['quantity']) * float(row['price'])
            }
            sales_data.append(processed_row)
    
    # 计算统计信息
    total_sales = sum(item['total'] for item in sales_data)
    avg_sale = total_sales / len(sales_data)
    
    result = {
        'summary': {
            'total_records': len(sales_data),
            'total_sales': total_sales,
            'average_sale': avg_sale
        },
        'data': sales_data
    }
    
    # 保存结果
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(result, file, indent=2, ensure_ascii=False)
    
    print(f"处理完成，共 {len(sales_data)} 条记录")
    print(f"总销售额: ${total_sales:,.2f}")

# 使用示例
# process_sales_data('sales.csv', 'sales_report.json')
```

## 测试

### 单元测试

```python
import unittest

def add(a, b):
    return a + b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

class TestMathFunctions(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
    
    def test_divide(self):
        self.assertEqual(divide(10, 2), 5)
        self.assertRaises(ValueError, divide, 10, 0)

if __name__ == '__main__':
    unittest.main()
```

## 最佳实践

1. **代码风格**：遵循 PEP 8 规范
2. **文档字符串**：为函数和类添加文档
3. **异常处理**：合理处理可能的异常
4. **虚拟环境**：使用虚拟环境管理依赖
5. **代码复用**：将常用功能封装成函数或类
6. **测试驱动**：编写测试确保代码质量

## 学习资源

- [Python 官方文档](https://docs.python.org/zh-cn/)
- [Python 教程](https://docs.python.org/zh-cn/3/tutorial/)
- [Real Python](https://realpython.com/)
- [Python 进阶](https://github.com/eastlakeside/interpy-zh)

## 常见问题

### Q: 如何安装第三方库？
A: 使用 `pip install package_name` 命令安装。

### Q: Python 中的 GIL 是什么？
A: GIL (Global Interpreter Lock) 是 Python 解释器的全局锁，它确保同一时间只有一个线程执行 Python 字节码。

### Q: 如何提高 Python 代码性能？
A: 使用适当的数据结构、避免不必要的循环、使用内置函数、考虑使用 NumPy 等优化库。
