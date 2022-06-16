# dAPP的大概功能
通过分布式存储网络上传文件，然后通过电子邮件将文件下载地址发送给指定用户。

这里引入了[SmtpJs](https://smtpjs.com/)作为邮件发送组件。使用的SMTP服务器由[elasticemail](https://elasticemail.com/)提供。

# live网站的地址
[https://round-salad-7072.on.fleek.co/](https://round-salad-7072.on.fleek.co/)

# 可以优化的想法
1. 提供更多的SMTP服务器以供用户选择。（目前的elasticemail只提供了100免费次数）
2. 支持用户可以自定义邮件内容。
