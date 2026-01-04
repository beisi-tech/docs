---
slug: scientific-internet-access-guide-for-chinese-developers
title: 中国开发者的科学上网指南
authors: xiaolinbenben
tags: [科学上网, 开发工具, VPN]
---

快速上手指南

## 推荐机场

| 序号 | 机场名称 | 机场网址 | 邀请链接 |
|:---:|:------:|:------:|:------:|
| 1 | CuteCloud | [ure.best](https://ure.best) | [点击注册](https://ure.best/#/register?code=hyoLOeHC) |
| 2 | 一分机场 | [一分机场.com](https://xn--4gqx1hgtfdmt.com) | [点击注册](https://xn--4gqx1hgtfdmt.com/#/register?code=1mCc22Ay) |
| 3 | 泡泡狗 | [paopao.dog](https://paopao.dog) | [点击注册](https://access.paopao.dog/#/register?code=Xk6dGKa4) |
| 4 | 奶昔机场 | [nexitallysafe.com](https://nexitallysafe.com) | 无 |

## 推荐静态 IP

| 服务商 | 网址 | 邀请链接 |
|:-----:|:---:|:-------:|
| ClipProxy | [cliproxy.com](https://cliproxy.com) | [点击注册](https://share.cliproxy.com/share/jtut5tzcd) |

## 推荐代理工具

| 平台 | 推荐工具 |
|:---:|:-------:|
| Windows | Clash Verge |
| macOS | Clash Verge |
| Android | Clash Meta |
| iOS | Shadowrocket |

## 机场使用教程

参考各机场网址内部教程即可。

## 链式代理教程
以下以Clash Verge工具说明具体流程

第一步：购买Cliproxy的【长效静态IP】。价格约28元/月，你可以像我一样先买一个月试用，支持支付宝付款。
自行购买：https://cliproxy.com/zh/

第二步：购买成功后打开Cliproxy的【长效静态IP】后台。重点关注IP地址、端口（IP地址后三位数字）、用户名、密码。

第三步：回到Clash Verge界面，在【订阅】栏找到你的自用节点模块，右键选择【编辑节点】。
在弹出界面左侧，输入你购买的静态IP内容，格式为： socks5://用户名:密码@主机:端口#备注名称
填好后，在点击界面下方的【添加前置代理节点】，此时你会看到右边出现你刚添加的节点，最后点击右下方的【保存】，然后你会看到界面会弹出绿色方块提示保存成功。

第四步：回到Clash Verge 【订阅】栏，对你的自用节点右键选择【编辑代理组】
弹出界面设置如下：
第一行【代理组类型】选最后一栏【根据定义的代理链传递】（relay）。
第二行【代理组组名】填你代理组的名字，填你喜欢的。
第四行【引入代理】栏，先选择你自用代理的其中一个节点，然后再选择你在第三步保存的前置代理节点。

最后再按下方【添加前置代理组】，看到添加成功后最后点击右下角【保存】，你会看到界面右上角出现绿色模块提示【保存成功】

第五步：点击Clash Verge左侧菜单【代理】，选择【全局】，点击选择你刚添加的代理组。

第六步：点击Clash Verge左侧菜单【设置】栏，打开【虚拟网卡】模式，如果无法打开，点击旁边的扳手🔧小图标安装，虚拟网络设置中选择【System】，点击保存

最后就有了纯洁的IP，请注意你的IP地址，一定要跟你购买的静态ip地址一致。

教程参考：[Twitter 教程](https://x.com/Eddy_Gudong/status/1993250981728174339)(https://future-resolution-3a0.notion.site/IP-2b63c8961cf380c6a18bd1cbb508c035)



