#简介
##Api
##接口报错表
400- 0  请求参数错误
     1  用户不存在
     2  用户已存在
     3  用户名或密码错误
     4  用户名或密码为空 （注册）
     5  token或puid不存在
     6  token失效
     7  缺少文章参数
     8  查询文章出错

500- 0  数据库错误

##数据结构
用户(user)
name        String
passwd      String
id          String  后端添加

文章(blog)
title       String
content     String
author      String
blogID      String  后端添加

##添加Api流程
router/index.js  增加接口监听
db/*             增加数据库操作
handler/index    增加方法映射
handler/*        增加对应方法