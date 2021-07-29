import Router from 'koa-router'
import $dbModel from '@/models'

const router = new Router()

/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 * @returns {List} 返回用户基础信息
 */
router.post('/login', async ctx => {
  const { username, password } = ctx.request.body
  return ctx.success()
})

module.exports = router
