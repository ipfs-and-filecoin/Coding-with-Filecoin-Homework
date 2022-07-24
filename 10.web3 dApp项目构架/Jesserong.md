1. 在前端页面FileUploader.vue中添加了一个input框，uploader在上传文件时可自定义需要付多少ether；在下载页面中，downloader根据uploader自定义的价格进行付费，将付费的80%付给uploader，20%作为手续费付给owner。

2. 添加了OwnerWithdraw.vue和UploaderWithdraw.vue两个取款页面。owner或uploader可调用页面的withdraw()方法实现取款。

3. 使用命令：npx hardhat run ./scripts/deploy.js --network kovan 将合约部署到testnet，然后修改文件中的contractAddress即可。