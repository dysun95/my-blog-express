# 简介

## Api

### 接口报错表

 主错误号 | 副错误号 | 含义
--- | --- | ---
400 | 0 | 请求参数错误
400 | 1 | 用户不存在
400 | 2 | 用户已存在
400 | 3 | 用户名或密码错误
400 | 4 | 用户名或密码为空 （注册）
400 | 5 | token或puid不存在
400 | 6 | token失效
400 | 7 | 缺少文章参数
400 | 8 | 查询文章出错

 主错误号 | 副错误号 | 含义
--- | --- | ---
500 | 0 | 数据库错误

### 数据结构

#### 用户(user)

属性名 | 类型 | 备注
--- | --- | ---
name | String
passwd | String
id | String | 后端生成

#### 文章(blog)

属性名 | 类型 | 备注
--- | --- | ---
title | String
content | String
author | String
blogID | String | 后端添加

### 添加Api流程

router/index.js  增加接口监听  
db/*             增加数据库操作  
handler/index    增加方法映射  
handler/*        增加对应方法  