# 简介

## Api

### 接口报错表

 主错误号 | 副错误号 | 含义
--- | --- | ---
40 | 00 | 请求参数错误
40 | 01 | 用户不存在
40 | 02 | 用户已存在
40 | 03 | 用户名或密码错误
40 | 04 | 用户名或密码为空 （注册）
40 | 05 | token或puid不存在
40 | 06 | token失效
40 | 07 | 缺少文章参数
40 | 08 | 查询文章出错
40 | 09 | 缺少puid参数
40 | 10 | 缺少blogID参数
40 | 11 | 文章不存在(限制了用户只能查询自己)

 主错误号 | 副错误号 | 含义
--- | --- | ---
50 | 00 | 数据库错误

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