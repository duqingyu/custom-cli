import IsHelper from '@/utils/isHelper'
import Koa from 'koa'
import koaBody from 'koa-body'
import Logger from '@/plugin/logger'
import Dayjs from '@/plugin/dayjs'
import Interface from '@/interface'
import errorMiddleWare from '@/middleWare/errorMiddleWare'
import SERVERCONFIG from '@/config/server'

// import '@/schedule'

const app = new Koa()

// 中间件
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 1024 * 1024 * 50
    },
    onError: error => {
      Logger.error('koaBody on error', error)
    }
  })
)
app.use(errorMiddleWare())

// 接口路由
Interface.forEach(router => {
  app.use(router)
})

// 全局变量
global.IsHelper = IsHelper // 判断相关方法
global.Dayjs = Dayjs // 日期时间相关
global.Logger = Logger // 日志相关

// 错误处理
app.on('error', err => {
  Logger.error('app on error', err)
})

// 启动服务监听本地端口
app.listen(SERVERCONFIG.port, () => {
  Logger.info(`=================================`)
  Logger.info(`success listen at port:${SERVERCONFIG.port}......`)
  Logger.info(`=================================`)
})
