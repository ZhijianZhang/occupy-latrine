# occupy latrine 
[![Build Status](https://www.travis-ci.org/ZhijianZhang/occupy-latrine.svg?branch=master)](https://www.travis-ci.org/ZhijianZhang/occupy-latrine)

关于这个名字，占（茅）坑。 是有点味道的一个项目。请勿在吃东西时查看。

写这个npm包的起因是，有的时候会想到一些好听的名字，但是一时不知道写什么项目。为了好名字能够留下来，也为了能够督促我自己写多多的开源。

## latrine style
- latrine q [packagename] 查询某个包名是否在npm上已经发布，别人提前一步，就没办法占坑了哦~
- latrine p [packagename] 在本地创建一个最简单的npm包，并自动提交到npm，完成占坑。
- latrine g [packagename] 将本地刚（创建的）的目录，用api的形式，自动去github创建一个repo。让占坑来的更加理直气壮。
- latrine c ':rocket: makeupCommits' 提交commit， latrine commit 会根据你的github中今年提交每天提交的 commit 数，来修改 commit 的时间，让你自己慢慢填满你的 github

## change log
### fix: 
- 2018.10.3 修复 github token 读写不成功的问题

### feature：
#### makeup commits
- 2018.10.16 增加了“弥补”提交 commit 到未提交的日期的功能，为了好多好多的“深绿色”。
- 2018.10.16 增加了拉取 commits 缓存机制



## feature
### 弥补你的git commits

原理是 `git commit --date="May 7 9:05:20 2016 +0800" -am "提交"` 这样就能够在你没有提交 commit 的时候提交了。慢慢补充github上的绿色。

### todo
1. 最好能够 提示开发者输入 emoji
2. 最好是通过本地计数，又可以强制更新，加快 makeup commit 的速度
3. console 加载中 动画，叫什么来着

### done
1. 可以强制拉取 commit 次数 
2. 直接 push
3. makeup commit 的缓存机制： 不应该每次 commit 的时候都去拉一次列表， 有过期时间