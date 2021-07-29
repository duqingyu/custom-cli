import ERRORCODECONFIG from '@/config/errorCode'
import Logger from '@/plugin/logger'

/**
 * 接口响应成功与失败相关方法
 * 如果需要响应500,使用koa自带的ctx.throw()
 * @param {*} options
 */
export default (options = {}) => {
  return async function (ctx, next) {
    ctx.fail = (msg = '请求失败', data = null) => {
      ctx.status = 200
      ctx.body = {
        code: ERRORCODECONFIG.fail,
        msg,
        data
      }
    }
    ctx.success = (data = null) => {
      ctx.status = 200
      ctx.body = {
        code: ERRORCODECONFIG.success,
        data
      }
    }
    ctx.successFile = (buffer, filename) => {
      ctx.status = 200
      ctx.set('Content-Disposition', 'attachment; filename=' + filename)
      ctx.body = buffer
    }
    try {
      await next()
    } catch (error) {
      Logger.error(`接口${ctx.request.url}报错:`, error)
      ctx.fail('服务器开小差了~')
    }
  }
}
