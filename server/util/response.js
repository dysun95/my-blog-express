function response(res, status) {
  if (status) {
    let errMsg = statusDict[status] || "error"
    res.send({
      status: status,
      message: errMsg
    })
  }
}

const statusDict = {
  4000: '请求参数错误',
  4001: '用户不存在',
  4002: '用户名已存在',
  4003: '用户名或密码错误',
  4004: '用户名或密码为空',
  4005: 'token或puid不存在',
  4006: 'token失效',
  4007: '缺少文章参数',
  4008: '查询文章出错',
  4009: '缺少puid参数',
  5000: '数据库错误'
}

module.exports = response