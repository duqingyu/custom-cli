import Sequelize from 'sequelize'
import DBCONFIG from '@/config/db'
import Logger from '@/plugin/logger'
import { createNamespace } from 'cls-hooked'

// 事务处理
const namespace = createNamespace('product-namespace')
Sequelize.useCLS(namespace)

// 连接数据库
const $db = new Sequelize(DBCONFIG.dbName, DBCONFIG.user, DBCONFIG.password, {
  host: DBCONFIG.host,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  define: {
    freezeTableName: true, // 是否不需要自动添加复数
    timestamps: false // 是否需要自动添加时间
  },
  logging: process.env.NODE_ENV === 'development', // A function that gets executed every time Sequelize would log something.
  timezone: '+08:00' // 默认情况下，sequelize保存日期时会转换成 +00:00时区
})

;(async function () {
  try {
    await $db.sync({ force: false })
  } catch (error) {
    Logger.error('$db.sync Error', error)
  }
})()

export default $db
