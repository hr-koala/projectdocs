/\*\*
Nginx--反向代理
Apache--PHP
IIS--ASP.NET
Tomcat--Java

services.msc
//管理员权限 cmd 安装 Apache
压缩包解压
cd D:\apache/bin
安装 Apache 服务，-n 参数是指定服务器名称
httpd -k install -n 'Apache'
卸载
httpd -k uninstall -n 'Apache'
修改 http.conf 文件： ServerRoot:'D:/Apache'
// httpd -t 测试命令
//启动服务
httpd -k start -n 'Apache'
httpd -k restart -n 'Apache'
httpd -k stop -n 'Apache'
回到浏览器中，地址栏输入：http://localhost/，回车访问，这时正常应该看到 It works!
127.0.0.1 是本地回环地址
DNS：
通过宽带运营商提供的服务器解析一个域名背后对应的 IP，这个过程叫做 DNS 寻址，帮你完成 DNS 寻址过程的 服务器叫做 DNS 服务器。
hosts 文件：
操作系统在发起对 DNS 服务器的查询请求之前，会优先检查本机的 hosts 文件。如果这个文件中包含了对当前需 要解析的域名的配置，则不再发起对 DNS 服务器的请求，直接使用 hosts 文件中的配置。
文件所在路径： Windows： C:\Windows\System32\drivers\etc\hosts macOS： /etc/hosts
过在命令行中运行： netstat -an 命令监视本机端口使用情况
配置 Apache 配置文档：http://httpd.apache.org/docs/current/
默认 Apache 的网站根目录是安装目录中的 htdocs 文件夹

搭建完整 WEB 网站： 1.搭建 WEB 服务器
2.HTTP(浏览器与服务端的通讯协议) 3.服务端开发 4.数据库操作
5.AJAX(浏览器与服务端的数据交互方式)

## \*\*/

## 什么是单体应用？什么是微服务？

linux: 命令
cd [dirName]

## mv（move file）命令用来为文件或目录改名、或将文件或目录移入其它位置。

语法
mv [options] source dest
mv [options] source... directory

## Linux tar（tape archive ）命令用于备份文件。

## tar 是用来建立，还原备份文件的工具程序，它可以加入，解开备份文件内的文件。

压缩文件 非打包

# touch a.c

# tar -czvf test.tar.gz a.c //压缩 a.c 文件为 test.tar.gz

a.c
列出压缩文件内容

# tar -tzvf test.tar.gz

-rw-r--r-- root/root 0 2010-05-24 16:51:59 a.c
解压文件

# tar -xzvf test.tar.gz

a.c

## 排除目录中的某些文件，然后进行压缩。

命令格式如下：
tar --exclude=目录名/\* 或者 文件名 -zcvf 备份文件名.tgz 目录名

# 创建一个名为 abc 的目录

mkdir abc

# 进入 abc 这个目录

cd abc

# 创建两个文件,文件名为 1.txt 2.txt

touch 1.txt 2.txt

# 切换到 abc 的父目录

cd ..

# 将文件 abc 进行压缩时，排除 1.txt，压缩后的文件名为 abc.tar

tar --exclude=abc/1.txt -zcvf abc.tgz abc

# 解压文件

tar -zxvf abc.tgz

# 删除压缩文件

rm abc.tgz

# 删除解压后的文件，并删除文件夹

rm -rf abc

## Linux touch 命令用于修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件。

ls -l 可以显示档案的时间记录。
语法
touch [-acfm][-d<日期时间>][-r<参考文件或目录>] [-t<日期时间>][--help][--version][文件或目录…]
