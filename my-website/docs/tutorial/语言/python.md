---
sidebar_label: "Python"
sidebar_position: 4
---

# Python 教程

Python 是一种高级、解释型、通用的编程语言。它以简洁的语法和强大的功能而闻名，被广泛应用于 Web 开发、数据科学、人工智能、自动化脚本等领域。


## Python 的特点

- **简洁易读**：语法简洁，接近自然语言
- **跨平台**：支持 Windows、macOS、Linux 等操作系统
- **丰富的库**：拥有庞大的标准库和第三方库
- **开源免费**：完全开源，社区活跃
- **多范式**：支持面向对象、函数式、过程式编程

## 环境搭建

### 安装 Python

#### Windows

1. 访问 [Python 官网](https://www.python.org/downloads/)
2. 下载最新版本的 Python
3. 运行安装程序，勾选 "Add Python to PATH"
4. 验证安装：打开命令提示符，输入 `python --version`

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

# 退出虚拟环境
deactivate
```

### 包管理

```bash
# 安装包
pip install package_name

# 安装特定版本
pip install package_name==1.0.0

# 从 requirements.txt 安装
pip install -r requirements.txt

# 生成 requirements.txt
pip freeze > requirements.txt
```

## 基础语法

### 变量和数据类型

```python
# 数字类型
age = 25                    # 整数
height = 5.9              # 浮点数
complex_num = 3 + 4j      # 复数

# 字符串
name = "张三"
message = 'Hello, World!'
multiline = """这是一个
多行字符串"""

# 布尔类型
is_student = True
is_working = False

# 列表
fruits = ["苹果", "香蕉", "橙子"]
numbers = [1, 2, 3, 4, 5]

# 元组
coordinates = (10, 20)
colors = ("红色", "绿色", "蓝色")

# 字典
person = {
    "name": "李四",
    "age": 30,
    "city": "北京"
}

# 集合
unique_numbers = {1, 2, 3, 4, 5}
```

### 控制流

```python
# 条件语句
age = 18
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 循环语句
# for 循环
for i in range(5):
    print(i)

# 遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(fruit)

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
        break     # 退出循环
    print(i)
```

### 函数

```python
# 定义函数
def greet(name):
    return f"Hello, {name}!"

# 调用函数
message = greet("张三")
print(message)

# 带默认参数的函数
def introduce(name, age=25, city="北京"):
    return f"我是{name}，{age}岁，来自{city}"

# 可变参数
def sum_numbers(*args):
    return sum(args)

result = sum_numbers(1, 2, 3, 4, 5)

# 关键字参数
def create_profile(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

create_profile(name="李四", age=30, city="上海")

# Lambda 函数
square = lambda x: x ** 2
print(square(5))  # 输出: 25
```

### 类和对象

```python
# 定义类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        return f"我是{self.name}，{self.age}岁"
    
    def have_birthday(self):
        self.age += 1
        return f"{self.name}现在{self.age}岁了"

# 创建对象
person1 = Person("张三", 25)
print(person1.introduce())

# 继承
class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)
        self.student_id = student_id
    
    def study(self, subject):
        return f"{self.name}正在学习{subject}"

student = Student("李四", 20, "2023001")
print(student.study("Python"))
```

## 数据结构

### 列表操作

```python
# 创建列表
numbers = [1, 2, 3, 4, 5]
fruits = ["苹果", "香蕉", "橙子"]

# 访问元素
print(numbers[0])      # 第一个元素
print(numbers[-1])     # 最后一个元素
print(numbers[1:3])    # 切片

# 修改列表
numbers.append(6)      # 添加元素
numbers.insert(0, 0)   # 在指定位置插入
numbers.remove(3)      # 删除元素
numbers.pop()          # 删除并返回最后一个元素

# 列表推导式
squares = [x**2 for x in range(10)]
even_numbers = [x for x in range(20) if x % 2 == 0]
```

### 字典操作

```python
# 创建字典
person = {
    "name": "张三",
    "age": 25,
    "city": "北京"
}

# 访问值
print(person["name"])
print(person.get("age", 0))  # 带默认值

# 修改字典
person["age"] = 26
person["email"] = "zhangsan@example.com"

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")

# 字典推导式
squares_dict = {x: x**2 for x in range(5)}
```

### 集合操作

```python
# 创建集合
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# 集合运算
union = set1 | set2        # 并集
intersection = set1 & set2 # 交集
difference = set1 - set2   # 差集

# 集合方法
set1.add(6)               # 添加元素
set1.remove(1)            # 删除元素
set1.discard(2)           # 安全删除
```

## 文件操作

### 文件读写

```python
# 写入文件
with open("example.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!")
    file.write("\n这是第二行")

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
```

### CSV 文件处理

```python
import csv

# 写入 CSV
data = [
    ["姓名", "年龄", "城市"],
    ["张三", 25, "北京"],
    ["李四", 30, "上海"]
]

with open("data.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerows(data)

# 读取 CSV
with open("data.csv", "r", encoding="utf-8") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)
```

## 异常处理

### 基本异常处理

```python
# try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("不能除以零")
except Exception as e:
    print(f"发生错误: {e}")

# try-except-else-finally
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("文件不存在")
else:
    print("文件读取成功")
finally:
    print("清理资源")
```

### 自定义异常

```python
class CustomError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

def validate_age(age):
    if age < 0:
        raise CustomError("年龄不能为负数")
    if age > 150:
        raise CustomError("年龄不能超过150岁")
    return True

try:
    validate_age(-5)
except CustomError as e:
    print(f"验证失败: {e.message}")
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
print(result)

# 或者
from math_utils import add, multiply
result = add(5, 3)
```

### 创建包

```python
# 创建包结构
# mypackage/
#     __init__.py
#     module1.py
#     module2.py

# __init__.py
from .module1 import function1
from .module2 import function2

__all__ = ['function1', 'function2']

# 使用包
from mypackage import function1, function2
```

## 常用库

### 数据处理

```python
# NumPy - 数值计算
import numpy as np

# 创建数组
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# 数组运算
result = arr * 2
sum_result = np.sum(arr)

# Pandas - 数据分析
import pandas as pd

# 创建 DataFrame
data = {
    'Name': ['张三', '李四', '王五'],
    'Age': [25, 30, 35],
    'City': ['北京', '上海', '广州']
}
df = pd.DataFrame(data)

# 数据操作
print(df.head())
print(df.describe())
filtered_df = df[df['Age'] > 25]
```

### Web 开发

```python
# Flask - 轻量级 Web 框架
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/user/<name>')
def user(name):
    return f'Hello, {name}!'

if __name__ == '__main__':
    app.run(debug=True)

# Requests - HTTP 库
import requests

response = requests.get('https://api.github.com/users/octocat')
data = response.json()
print(data['name'])
```

### 数据可视化

```python
# Matplotlib - 绘图库
import matplotlib.pyplot as plt

# 创建图表
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]

plt.plot(x, y)
plt.xlabel('X 轴')
plt.ylabel('Y 轴')
plt.title('示例图表')
plt.show()

# Seaborn - 统计图表
import seaborn as sns
import pandas as pd

# 创建示例数据
data = pd.DataFrame({
    'x': [1, 2, 3, 4, 5],
    'y': [2, 4, 6, 8, 10]
})

sns.scatterplot(data=data, x='x', y='y')
plt.show()
```

## 最佳实践

### 代码风格

```python
# PEP 8 风格指南
def calculate_average(numbers):
    """
    计算数字列表的平均值
    
    Args:
        numbers (list): 数字列表
    
    Returns:
        float: 平均值
    """
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

# 使用类型提示
from typing import List, Optional

def process_data(data: List[int], threshold: Optional[int] = None) -> float:
    if threshold is None:
        threshold = 10
    
    filtered_data = [x for x in data if x > threshold]
    return sum(filtered_data) / len(filtered_data) if filtered_data else 0
```

### 测试

```python
import unittest

class TestCalculator(unittest.TestCase):
    def test_add(self):
        self.assertEqual(add(2, 3), 5)
        self.assertEqual(add(-1, 1), 0)
    
    def test_multiply(self):
        self.assertEqual(multiply(2, 3), 6)
        self.assertEqual(multiply(-2, 3), -6)

if __name__ == '__main__':
    unittest.main()
```

## 学习资源

- [Python 官方文档](https://docs.python.org/zh-cn/3/)
- [Python 教程 - 菜鸟教程](https://www.runoob.com/python/python-tutorial.html)
- [Python 进阶指南](https://python-guide.readthedocs.io/)
- [Real Python](https://realpython.com/)

## 常见问题

### Q: Python 2 和 Python 3 有什么区别？
A: Python 3 是 Python 的未来，有更好的 Unicode 支持、语法改进等。建议使用 Python 3。

### Q: 如何提高 Python 代码性能？
A: 使用适当的数据结构、避免不必要的循环、使用生成器、考虑使用 NumPy 等优化库。

### Q: 如何处理 Python 中的内存问题？
A: 使用生成器、及时释放大对象、使用 `del` 语句、监控内存使用情况。
