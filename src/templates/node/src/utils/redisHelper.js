import redis from 'redis'
import SERVERCONFIG from '@/config/server'
import Logger from '@/plugin/logger'

const client = redis.createClient(SERVERCONFIG.redisPort)

client.on('error', function (error) {
  Logger.error('redis客户端报错：', error)
})

/**
 * oss相关服务
 */
export default class redisHelper {
  static set(key, data) {
    client.set(key, data)
  }
  static setex(key, t, data) {
    client.setex(key, t, data)
  }
  static get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, reply) => {
        if (err) {
          return reject(err)
        }
        resolve(reply)
      })
    })
  }
  static del(key) {
    return new Promise((resolve, reject) => {
      client.del(key, (err, reply) => {
        if (err) {
          return reject(err)
        }
        resolve(reply)
      })
    })
  }
}
