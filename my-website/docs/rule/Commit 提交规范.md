---
sidebar_label: "Commit 提交规范"
sidebar_position: 3
slug: commit-specification
---

# 项目开发编码规范

## Commit 提交规范

| 类型     | 说明                                           |
| -------- | ---------------------------------------------- |
| feat     | 新增功能                                       |
| fix      | 修复 Bug                                       |
| docs     | 文档变更                                       |
| style    | 代码风格调整（不影响功能，比如空格、格式化等） |
| refactor | 代码重构（既不新增功能，也不修复 bug）         |
| perf     | 性能优化                                       |
| test     | 测试相关                                       |
| chore    | 构建或辅助工具变更（如依赖更新、构建脚本等）   |
| ci       | CI 配置更新                                    |
| build    | 打包构建相关                                   |
| revert   | 撤销上一次的提交                               |

**示范如下：**

```
feat: 支持用户使用手机号登录
fix: 修复微信支付回调问题
docs: 更新安装部署指南
style: 优化头部布局的代码缩进
refactor: 重构用户认证模块代码逻辑
perf: 优化列表渲染性能
test: 增加订单模块的单元测试
chore: 升级vue到最新版本
ci: 更新 Jenkins 流水线配置
build: 修改 Dockerfile，减小镜像体积
```
