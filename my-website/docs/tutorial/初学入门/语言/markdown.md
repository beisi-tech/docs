---
sidebar_label: "markdown"
sidebar_position: 2
---
# Markdown 教程

[Markdown 简单教程](https://www.bilibili.com/video/BV1si4y1472o/?share_source=copy_web&vd_source=7f54efe1da20c04e64d8b69684311984)

## VS code Markdown 推荐插件

1. Markdown All in One  
   ![alt text](../../../../src/image/t_image22.png)
2. Markdown Link Updater  
   ![alt text](../../../../src/image/t_image21.png)

## Markdown 常用语法参考

### 1. 标题语法

一个“#”代表一级标题，  
两个“#”代表二级标题，  
三个“#”代表三级标题  
示例：

#### 四级标题

##### 五级标题

###### 六级标题

### 2. 列表语法

“1. ”是列表语法的标志，数字加小数点加**空格**

### 3. 表格语法

表格的列与列之间用“|”隔开  
第一行是表头，如：

```
| 标题1 | 标题2 | 标题3 |
```

第二行说明了表格的对齐方式，如：

```
|:------|:-----:|------:|
```

第三行开始是正式的表格，如：

```
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |
```

示例：  
| 标题 1 | 标题 2 | 标题 3 |
|-------|-------|-------|
| 内容 1 | 内容 2 | 内容 3 |
| 内容 4 | 内容 5 | 内容 6 |

### 4. 代码块语法

单个反引号包裹行内代码，如`print(hello world!)`，  
三个反引号包裹代码块，如：

```python
print(hello world!)
```

### 插入图片语法

```
![image-name](path/image.png)
```

```
<img src=".path/image.png" style="width: 50%; max-width: 600px;" />
```

### 5. 换行语法

两个空格加回车换行
