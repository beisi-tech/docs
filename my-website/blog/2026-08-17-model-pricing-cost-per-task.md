---
slug: model-pricing-cost-per-task
title: 别再只拿 Token 单价比较模型了
authors: [xiaolinbenben]
tags: [AI, 大模型, Agent]
---

我们过去比较模型价格，可能一直都算错了。大家习惯拿每百万 Token 的价格横向对比，但问题是，不同模型输出的 Token 根本不是同一种“计量单位”：完成同样一段文本，GPT-5.6 Sol 可能只需要 766 Tokens，Claude Opus 5 却需要 1170 Tokens，前者比后者少了约 34.5%。这意味着，Token 单价看起来更便宜的模型，完成同一个任务时未必真的更省钱。真正值得比较的，不是“一百万 Token 卖多少钱”，而是完成同一个任务究竟要花多少钱。到了 Agent 时代，模型还要连续调用工具、反复推理和自我纠错，单看 Token 价格就更容易失真，最终真正有意义的指标可能只剩一个：**Cost per successful task，也就是每个成功任务的成本**。所以下次再讨论谁家的模型更贵，不妨先问一句：你这一百万 Token，到底能做多少事？模型价格不能只看单价，也得算效率了，家人们。

<!-- truncate -->
