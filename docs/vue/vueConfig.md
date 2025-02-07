## 1、.npmrc

‌npmrc文件‌是一个npm的配置文件，用于配置npm（Node.js包管理工具）的行为和设置。它可以在不同的层级存在，包括全局配置、本地项目配置和用户级别配置。通过.npmrc文件，可以自定义npm的许多方面，如注册表地址、缓存位置、代理设置等‌。
1. `.npmrc`文件的作用和配置项
   ‌配置项‌：.npmrc文件可以包含多种配置项，如注册表地址、缓存位置、代理设置等。例如，可以通过设置registry=https://registry.npmjs.org来指定npm仓库地址‌。
   ‌位置‌：.npmrc文件可以位于以下几个地方：
   - 全局配置‌：$PREFIX/etc/npmrc，影响整个系统范围内的npm配置。
   - ‌用户级别‌：~/.npmrc，作用于当前用户的所有项目。
   - ‌项目级别‌：位于项目的根目录中，用于覆盖全局配置，适应项目的具体需求‌。
2. `.npmrc`文件的优先级
   - 全局配置‌：优先级最高，影响所有项目和包的设置。
   - ‌用户级别‌：次之，作用于当前用户的所有项目。
   - ‌项目级别‌：最低，仅在该项目中有效，用于覆盖全局和用户级别的配置‌。

`.npmrc` 文件位于项目的根目录(即`node_modules`和`package.json`的兄弟),作为npm运行时的配置文件。registry为npm包注册源地址,legacy-peer-deps忽略相同modules的引入。
> npm包注册源地址
> registry=http://registry.npm.taobao.org
> 忽略项目中引入的各个modules之间的相同modules,但不同版本的问题并继续安装
> legacy-peer-deps=true

## 2、Env环境变量

可以在项目根目录中放置下列文件来指定环境变量,其中.env和.env.local在所有环境都会被载入的,.env.local会被git忽略。.env.development开发环境下的配置文件,.env.production生产环境下的配置文件。
> .env                // 在所有的环境中被载入
> .env.local          // 在所有的环境中被载入，但会被 git 忽略
> .env.[mode]         // 只在指定的模式中被载入
> .env.[mode].local   // 只在指定的模式中被载入，但会被 git 忽略

优先级关系如下，推荐使用.env.local
> .env.development.local>.env.local>.env.development>.env // 开发环境
> .env.production.local>.env.local>.env.production>.env // 生产环境

## 3、Git钩子

定制化的脚本程序，实现的功能与相应git动作相关。项目中用到的提交工作流钩子包括`pre-commit`、`commit-msg`。更多git钩子参考官网：Git 钩子。
> pre-commit // 钩子在键入提交信息前运行
> commit-msg // 用来在提交通过前验证项目状态或提交信息。

若想绕过hooks检查，可通过下方命令实现：
> git commit -m 'xxx' --no-verify

 项目在pre-commit钩子中采用lint-staged，校验文件格式。在commit-msg钩子中采用commitlint检测git提交的message 是否符合规范。

## 4、yorkie+lint-staged

安装依赖
>npm install yorkie
>npm install lint-staged

yorkie是fork至husky库并做了微调，使仓库配置git hooks动作更容易。一方面，更好地支持 monorepo库，另一方面，更改在 package.json中hooks配置位置。
```json
// package.json
// before 
{
    "scripts": {
       "commit-msg": "commitlint -e -V",
       "pre-commit": "lint-staged && vue-tsc --noEmit"
    }
}
// after
{
    "gitHooks": {
        "commit-msg": "commitlint -e -V",
        "pre-commit": "lint-staged && vue-tsc --noEmit"
     },
}
```
lint-staged：只校验提交git暂存区文件代码格式，而不是去校验所有的文件格式，可提高校验效率
```json
// package.json
"lint-staged": {
    "*.{vue,ts,tsx,jsx}": "eslint --fix"
 },
```
## 5、Commitizen 

commitizen是一个帮助撰写规范commit message的工具，辅助填写提交信息，在pre-commit钩子中发挥作用。如下安装依赖：
>npm install commitizen -D

cz-conventional-changelog适配器用来初始化项目，终端操作提示都是英文的。因此，项目中采用cz-customizable适配器，对外设定了一份配置文件
>npx commitizen init cz-customizable --save-dev --save-exact --force

这行命令做了两件事：  
第一：安装cz-customizable到开发依赖（devDependencies）
```json
"devDependencies": {
  ...
  "cz-customizable": "^6.3.0",
  ...
},
```
第二：修改`package.json`中的`config.commitizen`字段
```json
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  }
}
```
在项目根目录下创建`.cz-config.js`文件，在项目中修改为中文如下
```js
module.exports = {
  // type 类型（定义之后，可通过上下键选择）
  types: [
    { value: 'feat', name: 'feat:     新增功能' },
    { value: 'fix', name: 'fix:      修复 bug' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式（不影响功能，例如空格、分号等格式修正）' },
    { value: 'refactor', name: 'refactor: 代码重构（不包括 bug 修复、功能新增）' },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     添加、修改测试用例' },
    { value: 'build', name: 'build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）' },
    { value: 'ci', name: 'ci:       修改 CI 配置、脚本' },
    { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）' },
    { value: 'revert', name: 'revert:   回滚 commit' }
  ],

  // scope 类型（定义之后，可通过上下键选择）
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-ui', '对 element-ui 的调整'],
    ['styles', '样式相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
    // 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
    ['custom', '以上都不是？我要自定义']
  ].map(([value, description]) => {
    return {
      value,
      name: `${value.padEnd(30)} (${description})`
    }
  }),

  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  // allowCustomScopes: true,

  // allowTicketNumber: false,
  // isTicketNumberRequired: false,
  // ticketNumberPrefix: 'TICKET-',
  // ticketNumberRegExp: '\\d{1,5}',


  // 针对每一个 type 去定义对应的 scopes，例如 fix
  /*
  scopeOverrides: {
    fix: [
      { name: 'merge' },
      { name: 'style' },
      { name: 'e2eTest' },
      { name: 'unitTest' }
    ]
  },
  */

  // 交互提示信息
  messages: {
    type: '确保本次提交遵循 Angular 规范！\n选择你要提交的类型：',
    scope: '\n选择一个 scope（可选）：',
    // 选择 scope: custom 时会出下面的提示
    customScope: '请输入自定义的 scope：',
    subject: '填写简短精炼的变更描述：\n',
    body:
      '填写更加详细的变更描述（可选）。使用 "|" 换行：\n',
    breaking: '列举非兼容性重大的变更（可选）：\n',
    footer: '列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\n',
    confirmCommit: '确认提交？'
  },

  // 设置只有 type 选择了 feat 或 fix，才询问 breaking message
  allowBreakingChanges: ['feat', 'fix'],

  // 跳过要询问的步骤
  // skipQuestions: ['body', 'footer'],

  // subject 限制长度
  subjectLimit: 100
  breaklineChar: '|', // 支持 body 和 footer
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true,
}
```
以前提交代码都是 git commit -m "xxx" ，现在可以用git cz，按照终端操作提示，逐步填入信息，就能自动生成规范的 commit message。
如果执行git cz报错如下，原因是安装commitizen出现问题（npm ci commitizen -D），更改安装命令npm install commitizen -g，git cz便可成功。 参考：相关文章

## 6、Commitlint 

当运行`git commmit -m 'xxx'`时，commitlint作为用来检查`xxx`是否满足固定格式的工具，即用于校验提交信息，在commit-msg钩子中发挥作用。参考：相关文章，如下安装依赖：
> npm install --save-dev @commitlint/config-conventional @commitlint/cli

在项目的根目录创建`commitlint.config.js`文件，用于配置commitlint校验规则，配置文件的写法和eslint的配置文件写法比较类似。commitlint推荐使用config-conventional配置去写commit。
> module.exports = { extends: ['@commitlint/config-conventional'] };

commitlint验证如下，即不符合规范的提交信息提交失败，符合规范的提交信息成功提交到仓库。报错情况：git commit -m "包安装"  
成功情况： git commit -m "feat: 包安装"