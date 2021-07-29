const Path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const { readDirs, mkDirs } = require('./utils/dir')
const installModule = require('./installModule')
const ora = require('ora')

/**
 * 渲染ejs模板
 * @param {*} curPath 来源文件路径
 * @param {*} targetPath 模板文件路径
 * @param {*} replace 要代替的文化对象
 */
function render(curPath, targetPath, replace) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(curPath, replace, (err, result) => {
      if (err) {
        return reject(err)
      }
      fs.writeFileSync(targetPath, result)
      resolve()
    })
  })
}

async function download(dir, { projectName, version, isInstall }) {
  console.log('参数信息：', dir, projectName, version, isInstall)

  const pathList = readDirs(dir)
  for (const p of pathList) {
    // 数据源
    // const file = fs.readFileSync(p)
    // 目标目录
    const targetPath = p.replace(dir, process.cwd())
    // 复制之前，如果没有文件，需要先创建文件夹
    await mkDirs(Path.dirname(targetPath))
    // ejs渲染
    await render(p, targetPath, {
      projectName,
      version
    })
    // 后续code..
    // 1. 针对不同的文件设置变量
    // 2. 优化流程
    // 直接复制无法修改变量值
    // fs.copyFileSync(p, targetPath)
    console.log('targetPath：', targetPath)
  }
  // 如果需要自动安装依赖
  if (isInstall) {
    const spinner = ora('Loading npm install').start()
    await installModule()
    spinner.color = 'yellow'
    spinner.text = 'Loading finished'
    spinner.stop()
  }
}

/**
 * 生成模板
 * 备注：模板文件可以放在git上，方便修改(download-git-repo这个库去git下载)
 */
module.exports = function (templateName, answers) {
  switch (templateName) {
    case 'vue':
      return download(Path.join(__dirname, 'templates/vue'), answers)
    case 'node':
      return download(Path.join(__dirname, 'templates/node'), answers)
    default:
      console.error('找不到对应模板,请输入vue|node')
      break
  }
}
