# UniApp 打包操作指南

## 一、H5 打包流程

### 1. 配置服务器地址

1. **进入项目目录**：  
   打开 `src/config` 文件夹。

2. **修改服务器地址**：  
   编辑 `config.js` 文件，将服务器地址配置为实际的 URL ![配置H5服务器URL](../../../src/image/t_image25.png)。  
   ![配置H5Web发行](../../../src/image/t_image26.png)

3. **配置 WEB 发行**：  
   ![Web发行域名配置界面](../../../src/image/t_image27.png)

### 2. 执行打包操作

1. **完成配置后执行打包命令**：  
   点击确认即可打包，然后看终端输入打包目录

2. **生成核心文件**：  
   打包完成后会生成以下三个核心文件：
   - `index.html`
   - `static/`（静态资源目录）
   - `asserts/`  
     ![打包生成文件](../../../src/image/t_image28.png)

## 二、APK 打包流程

### 1. 打包 APK

1. **点击发行的 AP 打包**：  
   在打包界面选择 **自有证书**。

2. **配置证书信息**：

   - **Key 文件路径**：`golden-storce/前端/sck.keystore`
   - **证书密码**：`123123`
   - **私钥密码**：`123123`
   - **别名**：`hsck`

3. **点击打包**：  
   完成配置后点击打包按钮，生成 APK 文件。  
   打包完成后会生成一个 APK 文件。  
   ![打包生成文件](../../../src/image/t_image29.png)

### 2. 修改版本号

如果需要修改版本号，请在前端目录下的 `manifest.json` 文件中进行修改。  
找到对应字段并更新版本号：

![打包生成文件](../../../src/image/t_image30.png)

### 3.插件市场安装 scss 插件

## 三、导入一个 UI 框架

### 1.插件市场安装 scss 插件

https://ext.dcloud.net.cn/plugin?id=2046

### 2.复制 UI 库到项目

https://ext.dcloud.net.cn/plugin?name=uview-plus

### 3.main.js

在/_ import Vue from 'vue' _/后面添加

import uviewPlus from '@/uni_modules/uview-plus'
Vue.use(uviewPlus)
共两行代码

### 4.App.vue

将 <style></style> 替换为

<style lang="scss">
	@import "@/uni_modules/uview-plus/index.scss";
</style>

### 5.uni.scss

最前面加入
@import '@/uni_modules/uview-plus/theme.scss';

### 6.manifest.json

在“map-weixin”和 "map-toutiao"中加入
"mergeVirtualHostAttributes" : true

### 7.安装依赖库

npm i dayjs
npm i clipboard

### 8. pages.json

在 pages 同级配置 easycom
"easycom": {
"autoscan": true,
// 注意一定要放在 custom 里，否则无效，https://ask.dcloud.net.cn/question/131175
"custom": {
"^u--(._)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue",
"^up-(._)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue",
"^u-([^-].\*)": "@/uni_modules/uview-plus/components/u-$1/u-$1.vue"
}
},
