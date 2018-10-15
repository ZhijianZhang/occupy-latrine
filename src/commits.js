const cheerio = require('cheerio')
const https = require("https");
const logger = require('./logger')
const operFile = require('../src/oper-file')

/**
 * download 一个 html dom 数据
 * @param {*} url 
 */
function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, function (res) {
      let data = "";
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on("end", function () {
        resolve(data);
      });
    }).on("error", function () {
      reject(null);
    });
  })
}

/**
 * 解析html
 * @param {*} username 
 */
async function parser(username) {
  let tempFileName = `/Users/zhijianzhang/project/kaiyuan/occupy-latrine/temp/${username}.html`
  if (!username) {
    logger.fail('请输入需要解析的github账户名')
    return
  }

  // const readFileResult = await operFile.readFilePromise(tempFileName)

  // let $ = cheerio.load(readFileResult)
  // if (!readFileResult) {
  //   let url = `https://github.com/${username}`
  //   const result = await download(url)
  //   $ = cheerio.load(result)
  // }

  //获取html
  // console.info($('header').text());
  //获取文本内容
  //console.info($.text());

  let url = `https://github.com/${username}`
  const result = await download(url)
  let $ = cheerio.load(result)

  // const html = $('html').html()
  // const writeFileResult = await operFile
  //   .writeFilePromise(tempFileName, html)

  // console.log(writeFileResult)

  // 暂存文件，免得每次都访问网络

  // logger.info('writeFileResult', $(header))

  // .is-graph-loading.graph-canvas.calendar-graph.height-full
  const wrapper = $('.js-calendar-graph.is-graph-loading.graph-canvas.calendar-graph.height-full').html()
  const svg = $('g[transform="translate(16, 20)"]', wrapper).html()
  const gList = $('g', svg)

  let jsonResult = []

  gList.each((i, g) => {
    // console.log($(this).html())
    // console.log(g)
    // console.log(i)

    const rectDom = $(g).children('rect')
    // console.log(rectDom.length)

    let dataCount, dataDate

    rectDom.each((i, rect) => {

      dataCount = $(rect).attr('data-count')
      dataDate = $(rect).attr('data-date')
      // console.log(dataDate, ' ', dataCount)

      jsonResult.push({
        [dataDate]: dataCount
      })

    })


    // console.log($(this).html().attr("width"))
    // dataCount = $(this).attr('data-count')
    // dataDate = $(this).attr('data-date')
  })

  // console.log('jsonResult', jsonResult)

  const tempJsonFileName = `/Users/zhijianzhang/project/kaiyuan/occupy-latrine/temp/${username}.json`

  await operFile.writeFilePromise(tempJsonFileName, jsonResult)

  logger.success('download json success')
  // console.log(gList)
  // console.log('svg', svg)


  // gList.each(gDom => {
  //   let json, dataCount, dataDate
  //   console.log('gDom', gDom)
  //   gDom.each(rectDom => {
  //     console.log('rectDom', rectDom)
  //     // dataCount = $(rectDom).attr('data-count')
  //     // dataDate = $(rectDom).attr('data-date')

  //     // console.log(dataCount, ' ', dataDate)
  //   })
  // });

}

exports.parser = parser;

// test
parser('ZhijianZhang')