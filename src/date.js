const { existsPromise, readFilePromise } = require('../src/oper-file')
const logger = require('../src/logger')

const monthShortName = {
  "1": 'Jan',
  "2": 'Feb',
  "3": 'Mar',
  "4": 'Apr',
  "5": 'May',
  "6": 'Jun',
  "7": 'Jul',
  "8": 'Aug',
  "9": 'Sep',
  "10": 'Oct',
  "11": 'Nov',
  "12": 'Dec',
}

// 每天提交 commit 的过滤阈值
const COUNT = 10

/**
 * makeup commit 的逻辑：
 * 获取最当前日期开始，commit 次数不足 12 次最近的日期
 * @param {*} username 
 * @param {*} commitNums 
 * @param {*} count 每天的 commit 次数
 * TODO: 再优化吧。。。
 */
async function getLatestDate(username, commitNums, count = COUNT) {
  if (!username) {
    logger.fail('function getLatestDate need the argument named username.')
  }
  let data = commitNums
  if (!commitNums) {
    // TODO: 路径需要更改
    const commitNumFileName = `/Users/zhijianzhang/project/kaiyuan/occupy-latrine/temp/${username}.json`
    // TODO: 先假定存在
    // await existsPromise(commitNumFileName)
    data = JSON.parse(await readFilePromise(commitNumFileName))
  }

  // TODO: 判断是否对象，不是的话，尝试转化对象，不能转化的话退出
  // 从最近 commit 不足的日子开始
  let keys = Object.keys(data)
  keys = keys.sort().reverse()

  // 有序的日期数组
  let underCountKeys = []

  keys.map(key => {
    if (data && data[key] < count) {
      underCountKeys.push(key)
    }
  })

  // console.log(underCountKeys.length ? underCountKeys[0] : keys[0])

  return underCountKeys.length ? underCountKeys[0] : keys[0]
}

/**
 * 将 2018-10-14 yyyy-mm-dd 时间转化为 Oct 15 9:05:20 2018 +0800 的格林时间
 * @param {*} date 
 */
function getGrimmTime(date) {
  // TODO: 判断是否是 yyyy-mm-dd 格式（直接从 github 解析出来的）
  // 必须要给这个格式的时间
  const ymd = date && date.split('-')

  if (!ymd || ymd.length < 2) {
    logger.fail('wrong date format. function getGrimmTime need a date of yyyy-mm-dd.')
  }
  // Tue Oct 16 2018 20:24:48 GMT+0800 (CST)
  // 去掉当前时间
  const now = new Date().toString().slice(15)
  const grimmTime = `${monthShortName[ymd[1]]} ${ymd[2]} ${ymd[0]} ${now}`
  // console.log(grimmTime)

  return grimmTime
}

/**
 * 合并 getGrimmTime 和 
 * @param {*} username 
 * @param {*} commitNums 
 * @param {*} count 
 */
async function getDate(username, commitNums, count = COUNT) {
  const date = await getLatestDate(username, commitNums, count)
  logger.info('latest date: ' + date)
  return getGrimmTime(date)
}

exports.getDate = getDate

// test
// getLatestDate('ZhijianZhang')
// getGrimmTime()