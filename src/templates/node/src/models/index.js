import requireContext from 'node-require-context'
import $db from '@/utils/dbHelper'
import Sequelize from 'sequelize'
import Utils from '@/utils/util'
import path from 'path'

const requireModelPath = path.join(__dirname, './tableModel')
const requireViewsPath = path.join(__dirname, './viewsModel')
const modelContext = requireContext(requireModelPath, true, /\.js$/)
const viewsContext = requireContext(requireViewsPath, true, /\.js$/)

// 将文件名转为key值,model实例为value值
// 在model调用的时候直接model[key].xxx, 如model.guimaUser
function getModelList(context) {
  let modelList = context.keys().reduce((result, moduleId) => {
    let modelName = Utils.getFileNameByPath(moduleId)
    let modelValue = context(moduleId)($db, Sequelize.DataTypes)
    let modelList = Object.assign({}, result, {
      [modelName]: modelValue
    })
    // console.log('modelList', modelList)
    return modelList
  }, {})
  return modelList
}

// 合并表格模型和视图模型
// 设置表和视图的关联
// 注意:视图模型目前需要手动创建,sequelize-auto无法检测到视图
let modelList = { ...getModelList(modelContext), ...getModelList(viewsContext) }

// 由于sequelize-auto无法自动关联表之间的关系
// 导致使用include相关功能的时候报错
// 暂时通过外键规则给它添加关联关系,后续比多N:M多对多关系需要扩展
Object.keys(modelList).forEach(model => {
  const currentModel = modelList[model]
  Object.getOwnPropertyNames(currentModel.rawAttributes).forEach(attributeName => {
    const value = currentModel.rawAttributes[attributeName]
    if (value.references) {
      const targetTableName = value.references.model.tableName
      const targetKey = value.references.key
      const targetModel = modelList[targetTableName]

      // 外键名字规则是对应的属性名guima_user_detail
      // console.log('targetTableName', targetTableName, currentModel.tableName)
      targetModel.hasMany(currentModel, {
        // 由于不指定as,默认sequlize会指定as为表明并且加复数
        // 所有这里指定当前表明不加复数,那么在业务中使用include的时候必须加上当前表名
        // 如guima_goods_category写成goods_category
        as: currentModel.tableName, //.replace('guima_', ''),
        foreignKey: attributeName,
        sourceKey: targetKey
      })
      currentModel.belongsTo(targetModel, {
        as: targetModel.tableName, //.replace('guima_', ''),
        foreignKey: attributeName,
        targetKey
      })
    }
  })
})

// 没关联关系写死的表关系
// modelList['pickup_order_item'].belongsTo(modelList['variant'], {
//   foreignKey: 'sku',
//   targetKey: 'sku'
//   // constraints: false
// })
// modelList['variant'].hasMany(modelList['pickup_order_item'], {
//   foreignKey: 'sku',
//   sourceKey: 'sku'
// })

// modelList['guima_user'].hasMany(modelList['guima_user_detail'], {
//   as: 'guima_user_detail',
//   foreignKey: 'user_id'
// })
// modelList['guimaUserDetail'].belongsTo(modelList['guimaUser'])

export default modelList
