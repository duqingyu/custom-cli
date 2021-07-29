const inquirer = require('inquirer')
const GenerateTemplate = require('./generate')

/**
 * 设置命令行问题配置模板选项
 * @param {String} templateName 模板名称,可选[vue, node]
 * 1、修改项目名称
 * 2、选择是否自动安装依赖
 */
module.exports = async function (templateName) {
  const question = [
    {
      type: 'input',
      name: 'projectName',
      message: 'projectName：(项目名称)',
      default: 'my-project',
      validate(val) {
        if (!val) {
          return '请输入项目名称'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'version',
      message: 'version：(版本号)',
      default: '1.0.0'
    },
    {
      type: 'list',
      name: 'isInstall',
      message: '是否自动安装依赖？',
      choices: [
        {
          name: 'Yes',
          value: true
        },
        {
          name: 'No',
          value: false
        }
      ]
    }
  ]
  const answers = await inquirer.prompt(question)
  return GenerateTemplate(templateName, answers)
}
