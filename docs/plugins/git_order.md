# git 命令

##

> git init
> git clone xxx
> git status
> git add .
> git commit -m "fea: xxx;"
> git push

使用 Git 下载指定分支命令为：git clone -b 分支名仓库地址 ； -b 表示要从分支下载

1. git branch -r
2. git status
3. git branch optimize
4. git checkout optimize // 切换分支 `git checkout <分支名称>`
5. git push -u origin optimize
6. git add .
7. git commit -m 'web 端优化'
8. git remote add origin [gitee 仓库地址] // 添加 remote 仓库地址:
9. git push origin master -u // -u 可不传 // 将项目内容推送到 gitee:
10. git branch -d <branch_name> // 删除本地的Git分支
11. git branch -D <branch_name> // 强制删除本地分支
12. git branch -a // 查看所有分支

- 1.切换分支 
  `git checkout <分支名称>`
- 2.创建并切换分支
  `git checkout -b <新分支名称>`
  - 相当于执行了以下两个命令
  `git branch new-feature`
  `git checkout new-feature`
- 3.重命名本地分支
  `git branch -m <新分支名称>`
  - 重命名一个不是当前分支的分支
  `git branch -m <旧分支名称> <新分支名称>`
- 4.删除本地分支
  `git branch -d <分支名称>`
  - 如果分支有未合并的更改，并且你确定要删除它，可以使用 -D 选项强制删除：
  `git branch -D <分支名称>`
- 5.使用--force或-f选项
- 6.查看远程分支
  - 查看远程库中已有分支，从图中找到自己想要切换的分支名。（remotes/origin/dev，remotes表示是远程库，origin表示远程库的名字，dev表示远程库的分支名）
  `git branch -a`
- 7.先查看本地分支
  `git branch`
- 8.删除远程分支
  git push origin -d <分支名称>
  git push origin -d abc // 如远程分支的名字为 origin/abc


- Git 2.23
  - git switch 分支名  // 切换分支
  - git switch -c 新分支名  // 创建并切换到新分支


### ESLint 的初始化
`npm init @eslint/config`
