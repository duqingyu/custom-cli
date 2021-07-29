/**
 * api接口权限配置,后台默认全部都需要权限,必须登录
 * 需要登录权限的填写接口名称即可
 */

// 需要权限的接口
export const authList = [
  //user模块
  '/api/user/getDeveloperList' //获取开发者列表
]

// 一些不需要权限的接口白名单
export const authWhiteList = [
  //user模块
  '/api/user/login' //用户登录
]
