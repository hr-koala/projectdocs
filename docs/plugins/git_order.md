# git 命令

##

> git init
> git clone xxx
> git status
> git add .
> git commit -m "fea: xxx;"
> git push

使用 Git 下载指定分支命令为：git clone -b 分支名仓库地址 ； -b 表示要从分支下载
git branch -r
git status
git branch optimize
git checkout optimize
git push -u origin optimize
git add .
git commit -m 'web 端优化'
git remote add origin [gitee 仓库地址] // 添加 remote 仓库地址:
git push origin master -u // -u 可不传 // 将项目内容推送到 gitee:

ESLint 的初始化
`npm init @eslint/config`
