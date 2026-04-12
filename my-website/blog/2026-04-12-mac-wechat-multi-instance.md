---
slug: mac-wechat-multi-instance
title: Mac 微信双开/多开超简教程（三行命令）
tags: [macOS, 效率工具]
---

在 Mac 上同时登录多个微信，不需要下载复杂的第三方工具。打开“终端(Terminal)”，依次执行以下三行命令即可搞定！

<!-- truncate -->

### 1. 复制微信应用
将原来的微信复制一份，并重命名为 `WeChat-2.app`：
```bash
sudo cp -R /Applications/WeChat.app /Applications/WeChat-2.app
```

### 2. 修改应用标识符（Bundle Identifier）
让系统能识别这是一个新的应用（将标识符修改为 `com.tencent.xin2`）：
```bash
sudo /usr/libexec/PlistBuddy -c "Set :CFBundleIdentifier com.tencent.xin2" /Applications/WeChat-2.app/Contents/Info.plist
```

### 3. 重新本地签名
```bash
sudo codesign --force --deep --sign - /Applications/WeChat-2.app
```

执行完毕后，去启动台或应用程序文件夹里找到新生成的 `WeChat-2`，打开即可登录第二个微信号。

---

**💡 小贴士：如果想开第三个微信怎么办？**
按同样的步骤，把上面三行命令里的 `WeChat-2` 全都改成 `WeChat-3`，把 `xin2` 改成 `xin3`，再执行一遍就可以了！以此类推，想开几个开几个。
