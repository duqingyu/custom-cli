const child_process = require('child_process')

module.exports = function () {
  return new Promise(resolve => {
    const data = child_process.exec('npm install')
    data.stdout.on('data', function (data) {
      console.info(data)
    })
    data.on('exit', code => {
      // console.log(`child process exited with code ${code}`)
      resolve(code)
    })
    // data.on('close', code => {
    //   console.log(`child process close all stdio with code ${code}`)
    // })
  })
}
