---
slug: chatgpt-grok-4-7
title: ChatGPT 接入 Grok 4.7
authors: [xiaolinbenben]
tags: [ChatGPT, Grok, Codex]
---

想在 ChatGPT 桌面端(原 Codex)里面用 Grok 4.7，推荐使用 ChatGPT 助手，接入很方便。

<!-- truncate -->

## 下载助手

打开 [agent.terln.cn](https://agent.terln.cn)。

页面写了，只支持 Apple 芯片的 Mac，和 Windows。Mac 是 M1、M2、M3、M4 及更新型号，Windows 是 10 1809 或更高。选对应的系统，下载安装。

![下载 ChatGPT 助手，选 Apple 芯片 Mac 或 Windows](/img/blog/chatgpt-grok-4-7/01-download.png)

下载或安装遇到问题，按页面上的提示，添加开发者微信 terlnai。

## 订阅模式

打开助手。左侧「设置」里点「Codex 引擎」，右上角停在「订阅模式」。

三档是 Plus、Pro、Max，价格和大概用量写在卡片上。选一档，用支付宝或微信付。图里箭头指的是微信，支付宝在左边，两个都能付。

![在订阅模式里选套餐并付款](/img/blog/chatgpt-grok-4-7/02-subscription.png)

## 自定义模式

不想订阅，就接图灵 API。

打开 [api.terln.com](https://api.terln.com)，注册一个账号，免费额度比较少，建议充值一些额度。然后点顶部的「API 密钥」，新建一把。名称填「GPT 助手」，以后好认。额度可以保持不限额，过期时间按自己需要选。点「创建」，把生成的 Key 复制下来。

![在图灵 API 新建密钥](/img/blog/chatgpt-grok-4-7/03-create-api-key.png)

回到助手，切到「自定义模式」。

Base URL 照抄：

`https://api.terln.com/v1`

API Key 填刚才复制的那一把。

![自定义模式填 Base URL 和图灵的 API Key](/img/blog/chatgpt-grok-4-7/04-fill-api.png)

## 启动

订阅付完，或者上面两项填好，点窗口右下角的蓝色按钮，启动 ChatGPT。

![点右下角按钮启动 ChatGPT](/img/blog/chatgpt-grok-4-7/05-start.png)

起来之后，打开模型选择器。列表里有 Grok 4.7，选上即可。

![模型选择器里的 Grok 4.7](/img/blog/chatgpt-grok-4-7/06-grok-model.png)
