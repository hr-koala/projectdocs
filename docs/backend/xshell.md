# Xshell安装及与服务器建立连接过程
Xshell是Windows下一款功能非常强大的安全终端模拟软件，支持Telnet、Rlogin、SSH、SFTP、Serial 等协议，可以非常方便的对linux主机进行远程管理。

Xshell下载地址：`https://www.netsarang.com/products/xsh_overview.html` 下载后按照提示进行安装即可（注意安装时授权选择“Free for Home/School”）

通过Xshell与服务器建立连接的方法：
1) 建立新连接。安装好Xshell后，运行，点击菜单栏中的“文件”-->“新建”，打开新建会话窗口，左侧菜单栏点击“连接”，在右侧中填入会话名称及主机ip地址（服务器的IP地址），点击“确定”，建立一个新连接。

2) 登录服务器。在列表中选中刚刚添加的会话，点击“连接”，在新弹出的窗口中，输入正确的用户名和密码，即可成功登录。现在开始我们可以对服务器进行操作了。

3) 设置高亮主题及字号大小（此步可跳过）。点击“文件”-->“属性”，或者使用快捷键Alt+P, 打开属性设置窗口，左侧菜单栏中点击“外观”，在右侧可设置字体、字号、配色方案、光标样式等个性化信息。

4) 默认设置中Backspace键不是退格删除字符，我们还要对Backspace键序列进行修改。点击左侧菜单中的“键盘”一项，在右侧将Backspace键序列设置为“ASCII 127”，这样就避免按下Backspace键却打出乱码的问题。