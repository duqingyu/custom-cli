import Joi from 'joi'
import requireContext from 'node-require-context'
import Utils from '@/utils/util'

export const getJoiRuleList = () => {
  const contextDir = requireContext(__dirname, false, /[^\.js]$/)
  const result = contextDir.keys().reduce((result, dirId) => {
    // 文件夹下面的所有js文件
    const dirName = Utils.getFileNameByPath(dirId)
    const contextFile = requireContext(dirId, true, /\.js$/)

    contextFile.keys().forEach((moduleId) => {
      const fileName = Utils.getFileNameByPath(moduleId)
      // 对所有接口名称添加相应前缀,方便校验
      let obj = contextFile(moduleId)
      let newObj = {}
      for (const key in obj) {
        const prefix = `/${dirName}/${fileName}/`
        newObj[prefix + key] = obj[key]
      }
      result = {
        ...result,
        ...newObj
      }
    })
    return result
  }, [])
  return result
}

/**
 *  通过规则和值来校验前端参数
 * @param {Object} rules
 * @param {Object} values
 */
export const joiValid = (rules, values) => {
  // 需要添加unknown，只对写了规则的参数进行校验
  const schema = Joi.object().keys(rules).unknown()
  const { error, value } = schema.validate(values)
  if (error) {
    return { message: error.details[0].message }
  } else {
    return false
  }
}
