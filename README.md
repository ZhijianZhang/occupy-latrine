# occupy latrine 
[![Build Status](https://www.travis-ci.org/ZhijianZhang/occupy-latrine.svg?branch=master)](https://www.travis-ci.org/ZhijianZhang/occupy-latrine)

关于这个名字，占（茅）坑。 是有点味道的一个项目。请勿在吃东西时查看。

写这个npm包的起因是，有的时候会想到一些好听的名字，但是一时不知道写什么项目。为了好名字能够留下来，也为了能够督促我自己写多多的开源。

## latrine style
- latrine q [packagename] 查询某个包名是否在npm上已经发布，别人提前一步，就没办法占坑了哦~
- latrine p [packagename] 在本地创建一个最简单的npm包，并自动提交到npm，完成占坑。
- latrine g [packagename] 将本地刚（创建的）的目录，用api的形式，自动去github创建一个repo。让占坑来的更加理直气壮。

## change log
### fix: 
- 2018.10.3 修复 github token 读写不成功的问题



## feature
### 弥补你的git commits

原理是 `git commit --date="May 7 9:05:20 2016 +0800" -am "提交"` 这样就能够在你没有提交 commit 的时候提交了。慢慢补充github上的绿色。

git commit --date="Oct 15 9:05:20 2018 +0800" -am "提交"


git commit --date="Sep 16 2018 20:24:48 GMT+0800 (中国标准时间)" -am "getLatestDate"
