// 后端错误相关状态码
export default {
  success: 1,
  fail: -1,
  queryError: 400, // 请求参数有误
  expiredLogin: 401, // 登录过期
  noLogin: 403 // 未登录或者请求了没有权限的页面或按钮
}
