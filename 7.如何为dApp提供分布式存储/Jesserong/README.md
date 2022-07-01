# Dwetransfer Dapp

#### 功能描述

1. 用户可以在 Dwetransfer Dapp 中通过填写邮箱，密码和自己的Web3Storage的API token来注册一个帐号，然后进行登录，实现了每个用户只使用自己的Web3Storage的API token。

2. 登录成功后，用户可填写接收的邮箱，和选择需要上传的文件，然后点击“Send via IPFS”按钮即可把文件上传到Web3Storage，并把文件的IPFS地址以邮件的形式发送到接收的邮箱。

3. 点击“See Send List”按钮即可进入已发送文件的列表页，点击‘Get More’可加载下一页，可以查看所有已发送的文件，也可以对文件进行删除（删除接口需要在Web3Storage后台申请）。

4. 点击“Logout”即可退出登录。

#### 网站地址 

https://sparkling-truth-1029.on.fleek.co

测试帐号: jesse@qq.com   密码: jesse123456 

#### 可以优化的想法

目前注册的帐号是保存到中心化的数据库，用户的密码和api token可能存在泄漏的风险，后期可通过编写智能合约，把用户的api token保存到区块链。
