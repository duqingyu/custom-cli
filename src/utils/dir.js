const fs = require('fs')
const path = require('path')

// 递归读取文件
function readDirs(p) {
  let data = []
  let names = fs.readdirSync(p)
  names.forEach(name => {
    const location = path.join(p, name)
    const info = fs.statSync(location)
    if (info.isDirectory()) {
      data = [...data, ...readDirs(location)]
    } else {
      // console.log(`file:${location}`)
      data.push(location)
    }
  })
  return data
}

// 递归创建目录文件
function mkDirs(p, dirs = []) {
  const isExist = fs.existsSync(p)
  if (!isExist) {
    return mkDirs(path.dirname(p), [...dirs, p])
  } else {
    while (dirs.length) {
      const currentPath = dirs.pop()
      fs.mkdirSync(currentPath)
    }
  }
}

module.exports = { readDirs, mkDirs }
