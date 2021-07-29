import schedule from 'node-schedule'
import Logger from '@/plugin/logger'

/**
 * 后台定时任务
 * https://www.npmjs.com/package/node-schedule
 */

// 每分钟的第1秒执行一次
schedule.scheduleJob('0 * * * * *', () => {
  // 解决PM2部署会在每个进程都执行一次的问题
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_APP_INSTANCE == 0
  ) {
    Logger.info('定时任务,每分钟的第1秒执行一次!')
    // 这里写定时任务的代码
    // code...
  }
})
