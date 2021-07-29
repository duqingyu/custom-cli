import jwt from 'jsonwebtoken'

// 秘钥
const TOKENSECRET = 'GUIMA_PRODUCT_2021@#@@gf'
// 过期时间一周(秒)
const EXPIRESIN = 7 * 24 * 60 * 60

/**
 * token相关服务
 */
export default class TokenHelper {
  static async create(data) {
    const token = jwt.sign(data, TOKENSECRET, { expiresIn: EXPIRESIN })
    return token
  }
  static async parse(token) {
    try {
      const data = jwt.verify(token, TOKENSECRET)
      return data
    } catch (error) {
      // 如果是token过期了,返回错误信息
      if (error.message === 'jwt expired') {
        return error.message
      }
      return false
    }
  }
}
