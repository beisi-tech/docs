---
sidebar_label: "Prettier"
sidebar_position: 4
slug: Prettier
---

# Prettier教程

<br/>

### Prettier工具使用
#### 获取Prettier
全局安装Prettier
```
npm install -g prettier

yarn global add prettier

pnpm i -g prettier
```

#### 使用 Prettier
打开你的终端/Terminal/命令行，不管在IDE的终端里还是在系统的cmd/powershell/terminal都行
为了了解Prettier的完整功能列表，我们可以直接运行其help命令。
```
prettier -h
```
常用的两个功能： <b>检查</b>和<b>改正</b>。对prettier传入对应的flag就可以使用。
<br/>
比如我们要检查当前所在文件夹的全部文件，我们可以直接运行：
```
prettier . -c
```

这个命令的意思是：检查当前所在文件夹的全部文件，然后根据配置文件中的规则，检查出错的地方，然后在控制台输出文件名和检查结果。

如果 WARN 较多，则说明文件存在格式问题，可以直接修正。如果出现 ERROR 则通常意味着文件出现格式错误（比如没有关闭 Tag），需要自行手动修正。

直接修正则需要运行 `-w` 参数：

```
prettier . -w
```

<br/>

### VSCode 集成 Prettier 工具
1. 在VSCode中的Extension中输入prettier，找到对应的插件并且下载<br/>
   ![prettier_image1.png](../../../src/image/prettier_image1.png)
2. 点击设置<br/>
   ![prettier_image2.png](../../../src/image/prettier_image2.png)
3. 在设置中，按照下图操作<br/>
   ![prettier_image3.png](../../../src/image/prettier_image3.png)
4. 在页面代码处，右键，选择"Format Document"，然后选择prettier，保存页面，页面代码自动格式化<br/>
   ![prettier_image4.png](../../../src/image/prettier_image4.png)
