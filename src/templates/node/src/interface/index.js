import requireContext from 'node-require-context'
import Utils from '@/utils/util'

// 获取所有文件夹
function getInterfaceList() {
  const contextDir = requireContext(__dirname, false, /[^\.js]$/)
  const result = contextDir.keys().reduce((result, dirId) => {
    // 文件夹下面的所有js文件
    const dirName = Utils.getFileNameByPath(dirId)
    const contextFile = requireContext(dirId, true, /\.js$/)

    contextFile.keys().forEach(moduleId => {
      const fileName = Utils.getFileNameByPath(moduleId)
      let router = contextFile(moduleId)
      // 为路由接口添加目录名前缀
      router.prefix(`/${dirName}/${fileName}`)
      result.push(router.routes())
    })
    return result
  }, [])
  return result
}

const interfaceList = getInterfaceList()

export default interfaceList
