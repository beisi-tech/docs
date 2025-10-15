---
sidebar_label: "database"
sidebar_position: 4
---
# 数据库教程

1. MySQL 数据库命令：
   1. 导出数据库命令：`system mysqldump -u root -p hsck_data > 路径\hsck.sql`
   2. 删除原有数据库并重新创建数据库命令：`mysql -u root -p -e "DROP DATABASE IF EXISTS hsck_data; CREATE DATABASE hsck_data;"`
   3. 导入数据库命令：`mysql -u root -p hsck_data < "这里替换为你的仓库路径/GoldenStore/后端/数据库文件/hsck_data_0xx.sql"`

### 数据库部分遵循规则

1. 测试 MySQL 数据库密码统一改成 123123
2. MySQL 数据库版本使用 8.0 版本

## 未来的项目会优先考虑使用 PostgreSQL 数据库
