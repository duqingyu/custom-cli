import {
  isArray,
  isBoolean,
  isNumber,
  isString,
  isRegExp,
  isObject,
  isDate,
  isError
} from 'core-util-is'


/**
 * 检测数据类型、空值类
 */
export default class IsHelper {
  constructor() {}
  // 判断是否是真正的空，undefined、null、''、NaN 为 true，其他为 false
  static isTrueEmpty(obj) {
    if (obj === undefined || obj === null || obj === '') {
      return true
    }
    if (isNumber(obj) && isNaN(obj)) {
      return true
    }
    return false
  }
  // 判断是否为空， undefined, null ,'', NaN, [], {}, 0, false 为 true，其他为 false。
  static isEmpty(obj) {
    if (this.isTrueEmpty(obj)) {
      return true
    } else if (isRegExp(obj)) {
      return false
    } else if (isDate(obj)) {
      return false
    } else if (isError(obj)) {
      return false
    } else if (isArray(obj)) {
      return obj.length === 0
    } else if (isString(obj)) {
      return obj.length === 0
    } else if (isNumber(obj)) {
      return obj === 0
    } else if (isBoolean(obj)) {
      return !obj
    } else if (isObject(obj)) {
      for (const key in obj) {
        return false && key // only for eslint
      }
      return true
    }
    return false
  }
}
