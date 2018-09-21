const fs = require('fs')
const chalk = require('chalk')

exports.readFilePromise = function (filename, format = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, format, (err, data) => {
      if (err)
        reject(err)
      else {
        console.log(chalk.green('read file success!'))
        resolve(data)
      }
    })
  })
}


exports.writeFilePromise = function (filename, data, format = 'utf-8') {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, JSON.stringify(data), format, (err) => {
      console.log('writeFile...')
      if (err) {
        console.log('err', err)
        reject(err)
      } else {
        console.log(chalk.green('write file success ...!'))
        resolve({
          msg: 'ok'
        })
      }
    })
  })
}



