---
slug: deepseek-harness-guide
title: DeepSeek Harness 一文入门，附小白安装教程
authors: [xiaolinbenben]
tags: [AI, Agent, DeepSeek, 工具]
---

8月13日，DeepSeek 官方 GitHub 上多了一个仓库，名字叫 DeepSeek Harness。

![DeepSeek Harness 开发者预览版：一切皆插件](/img/blog/deepseek-harness-guide/01-hero.png)

<!-- truncate -->

这个仓库上线第一天，星数已经突破了二万。第一天到这个数，在开源世界里很少见。

**先说它是什么。**

这两年让 AI 写代码、让 AI 替你跑任务，已经不新鲜。但聊天框里能说会道的模型，和真的能在你电脑上打开文件、运行命令、把一件事从头做完的智能体，中间隔着一整套工程。模型是大脑，它还需要手和工具架。读文件、跑命令这些活，总得有个壳子来管，还得把几百轮对话整理成模型看得懂的上下文，碰到越权的操作，知道停下来问你。这层壳子，业内叫 harness，这个词的本义是马具，套在马身上拉车的那一套。DeepSeek Harness 就是 DeepSeek 官方做的这套开源 harness，仓库代号叫 dsh。

**DeepSeek 为什么突然做这个，要先看一件旧事。**

过去一年里，社区想用 DeepSeek 的模型干编程的活，多数是把它接到别人的工具里。V2EX 上有人开帖问，deepseek 配 Claude Code、Codex、OpenCode、Pi 哪个最好用，楼里有人统计缓存命中率，有人算哪个更省钱，聊了几十层。模型是 DeepSeek 的，壳子是别人的，这个状态持续了挺久，官方还专门给自家模型加了 Codex 支持，是社区用户先注意到的。

据国内媒体梳理，今年5月 DeepSeek 内部组了一个 Harness 团队，对标 Claude Code，7月初公众号注册上线，8月1日开放内测申请，8月13日正式开源。有报道把这步棋总结成一句话，DeepSeek 第一次把手伸到了模型输出之后的执行层，从造更强的模型，走向让模型真正开始工作。

**它最核心的设计，README 第一句就写明白了，一切皆插件（Everything is a Plugin）。**

这句话怎么理解，举个例子。传统软件总有一个改不动的核心，你想加功能，要么等厂商，要么自己改源码。DeepSeek Harness 没有这种核心，它底下用一个叫 Cordis 的插件框架，模型适配器是插件，工具注册表是插件，会话日志是插件，连最核心的智能体循环本身都是插件。想换模型提供方，挂一个插件。想加一种工具，挂一个插件。想让敏感操作默认先问过你，改一个策略配置就行。每一样都能撤销，插件卸下来，它贡献的东西跟着消失。

官方文档把设计依据指向一篇论文，《A Programming Paradigm for Spatiotemporal Composability》。论文里的思想不用全懂，记住结论就够，每一项能力都拆成可插拔的模块，谁都能在别人写的插件旁边再挂一个自己的。

那它现在能干什么。

我按用法分成三种，小白从第一种开始。

**三种用法，小白从网页版开始**

**最省事的是网页版。**

装好以后，浏览器打开一个本地地址，界面像你熟悉的聊天框，但背后的智能体能读写你选中的文件夹、运行命令、把大任务拆给子智能体，权限不够的时候停下来问你。

![DeepSeek Harness Web UI](/img/blog/deepseek-harness-guide/02-home.png)

官方预置了几套 agent 配置，**标准模式带全套工具，极简模式只留 Shell 和文件编辑；还有一套创造模式，专门用来创建自定义 agent 配置，允许在运行时检查、实验插件。** 它内置的工具有执行 Bash、PowerShell、运行代码、待办清单，还能调用技能、在拿不准时向你提问。每一步操作都会写进一份仅追加的日志，干到一半可以回放，也可以从某个点分叉重来。

![DeepSeek Harness 模式选择](/img/blog/deepseek-harness-guide/03-modes.png)

**第二种叫无头模式。** 网页版适合你坐在电脑前看它干活，无头模式适合把任务丢给它让它自己跑完。一条命令传一个任务，它新建会话，干完，把最终结果打印出来，退出。适合接进自动化流程。

**第三种是 Python SDK。** 写程序的人可以把它当库来用，在代码里创建一个智能体实例，让它去执行任务，干完把最终回复交给你。这条只适合会写 Python 的人，而且对系统平台有要求，下面安装部分会说到。

**安装教程，从头到尾**

先准备环境。

网页版和命令行版跑在 Node.js 上。Node.js 是让 JavaScript 程序在电脑上运行的运行时，你不用懂它，装就行。去 Node.js 官网下载 LTS 版本，一路点下一步装完。装好后打开命令行，Windows 用 PowerShell，Mac 用终端，敲 node -v，能看到版本号，就说明装好了。

然后一行命令启动，命令行里输入下面这行

```bash
npx @deepseek-ai/dsh web
```

npx 是 Node.js 自带的小工具，作用就是运行一个还没安装的包。第一次运行，它会问你要不要下载这个包，输入 y 回车。

下载完成服务启动，命令会打印访问地址，默认是 `http://127.0.0.1:3080`。浏览器打开这个地址，就进了界面。

进去以后先配模型。

在界面里打开设置，进模型那一页，DeepSeek 卡片上有一个 API 密钥输入框，把你从 DeepSeek 开放平台申请的 API 密钥填进去，保存。填好密钥，模型路由立即可用，不用重启，默认接 DeepSeek 自家的 V4 Flash 和 V4 Pro 两个模型。密钥存在 $DSH_HOME/.credentials.yaml 这个文件里，网页上永远只显示脱敏后的形式，不会把明文回显出来。除了 DeepSeek 官方，它也支持 Anthropic、OpenAI，或者任何兼容 OpenAI 接口的自建服务，都在同一个模型设置页里加。

![添加 API Key 开始使用](/img/blog/deepseek-harness-guide/04-api-key.png)

然后是选工作区。

点击选择工作区，把你想让智能体干活的项目文件夹加进来，选中它。没选中之前，会话输入框是灰的，选完才能打字。

![选择工作区](/img/blog/deepseek-harness-guide/05-workspace.png)

最后是发任务。

新建一个会话，直接发一句自然语言就行。官方文档拿自己的仓库举的例子是 Summarize this repository and identify its main packages，意思是概括这个仓库，说清楚它的主要组成，你换成自己的项目同样适用。模型会自己读写文件、跑命令，碰到超出权限的操作，先停下来问你同不同意。

如果不喜欢一行命令的方式，或者想改源码、写插件，也可以从源码跑。先装 pnpm，一个和 npm 类似的包管理器（这个项目用的是 pnpm 11 系列），然后依次执行下面这几条命令

```bash
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

Python SDK 的流程，官方文档写的是克隆仓库、创建虚拟环境、安装 deepseek-harness-sdk，再跑仓库自带的示例脚本。它要求 Python 3.10 以上和 Git，官方列出的支持平台是 Linux 和 macOS，其中 macOS 还要求 14 以上且是 Apple 芯片。Windows 不在支持列表里。提前说清楚，免得你在 Windows 上装了半天才发现跑不起来。

**三句凉水话**

**第一句，这项目还在开发者预览阶段。** README 自己就写明了，正在快速迭代，未来会出现破坏兼容性的变更。今天配好的配置，过一阵可能要跟着改。想立刻拿它当生产工具的人，先别把身家押上去。

![内测声明](/img/blog/deepseek-harness-guide/06-statement.png)

**第二句，热度高和成熟是两回事。** 仓库里确实塞了很重的东西，事故复盘文档、一整套自动化测试门禁、详细到词条的术语表，看得出团队自己很认真。但认真不等于久经考验。上线当天就破了两万星的数字，说明的是市场的期待，离稳定运行还有距离。

**第三句，报错大多能自己解决。** 最常见的两个，MISSING_CREDENTIAL，意思是没配密钥，回模型设置页填上就行。UNKNOWN_MODEL，意思是配置引用了一个不存在的模型，换成已配置的就好。错误信息给得挺直白，至少你知道该往哪查。

要不要现在装，我的看法是可以装，而且值得试一下。成本就一个 Node.js 加一条命令，风险很小。就算项目以后大改，你损失的也就是一下午。只是别一上来就让它碰你最重要的代码仓库，先拿一个临时文件夹或者不太要紧的小项目练手，看它怎么规划、怎么提问，关键时刻会不会停手等你点头。看它干活的样子，比听人讲一百遍都管用。

\---

关键来源

DeepSeek Harness 仓库 https://github.com/deepseek-ai/deepseek-harness

官方使用 Web UI 指南 https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/index.md

官方配置模型指南 https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/providers.md

官方 Python SDK 指南 https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/user/guide/python-sdk.md

DeepSeek 官方 API 文档 https://api-docs.deepseek.com
