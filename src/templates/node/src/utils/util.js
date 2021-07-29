import path from 'path'
import xlsx from 'node-xlsx'

/**
 * 公共工具类
 */
export default class Utils {
  /**
   * 通过文件路径获取文件名
   * @param Path 路径名
   */
  static getFileNameByPath(Path) {
    return path.basename(Path).split('.')[0]
  }
  /**
   * 空字符串或undefined转为null,该方法会直接修改val的值
   * @param {*object} val
   */
  static empty2Null(val) {
    if (typeof val === 'object' && val !== null) {
      Object.keys(val).forEach(key => {
        val[key] = this.empty2Null(val[key])
      })
      return val
    }
    return val === '' || val === undefined ? (val = null) : val
  }
  /**
   * 等待函数
   * @param time 等待时间(毫秒)
   */
  static wait(time) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
  /**
   * 构建xlsx的buffer数据
   * @param {Array} columns 列 ['ID', 'Name']
   * @param {Array} data 数据 [[...],[...]]
   * @param {Array} options 配置
   * @param {Array} sheetName 表单名字
   * @returns {Buffer}
   */
  static buildXlsx({ columns, data, options, sheetName = 'sheet' }) {
    const datas = [columns, ...data]
    const buffer = xlsx.build([{ name: sheetName, data: datas }], options)
    return buffer
  }
  /**
   * 解析xlsx的数据,通过buffer或者路径
   * @param {Buffer|String} data 表单数据
   * @returns {Buffer}
   */
  static parseXlsx(data) {
    const result = xlsx.parse(data)
    return result
  }
}
