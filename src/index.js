const program = require('commander')
const Question = require('./question')

// 查看版本
// 1.dylan-cli -v
// 2.dylan-cli --version
// 初始化项目
// 1.dylan-cli init vue
// 2.dylan-cli init node
program
  .version('1.0.0', '-v, --version')
  .command('init <templateName>')
  .action(templateName => {
    Question(templateName)
  })
program.parse(process.argv)
