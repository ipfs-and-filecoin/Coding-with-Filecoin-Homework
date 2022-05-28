# 「4」Filecoin & IPFS 开发工具支持 - 课后作业

经过的前面三节课的基础知识铺垫后，本期课程讲带领开发者去了解Filecoin以及IPFS针对不同开发经验以及开发需求的开发者提供了什么样的开发工具支持。有底层的IPFS以及Filecoin节点交互，有封装了节点交互功能的SDK/library，也有同时结合了IPFS和Filecoin优势的上层存储服务工具，希望经过这节课以后，开发者对Filecoin以及IPFS的工具集有一点的了解，然后可以根据自己项目需求选取适合的工具进行深入学习和开发。

#### 1. 为什么更推荐结合使用IPFS以及Filecoin为项目提供去中心化存储？
IPFS解决了分布式存储的问题，但是缺乏经济激励机制，Filecoin可以与其形成互补。
IPFS可以提供热存储：快速、灵活的数据检索；Filecoin可以提供冷存储：永久保存、可验证。

#### 2. 如何在IPFS上访问存储的文件或者数据？举例说明你能想到的办法
在IPFS上访问存储的文件或者数据，无论何种方式都是请求数据的IPFS CID地址。可以通过以下方式请求CID地址：
  a) IPFS CLI.
  b) IPFS API.
  c) 各种IPFS SDK: go-ipfs, js-ipfs.
  d) 各种图形化工具: IPFS Desktop.
  e) 通过不支持IPFS协议的浏览器访问IPFS HTTP Gateway.
  f) 支持IPFS协议的浏览器直接访问IPFS CID地址.
#### 3. 有几种方式运行IPFS节点？分别是什么？
  a) IPFS binary CLI
  b) IPFS Desktop
  c) IPFS Cluster
  d) IPFS SDK: go-ipfs

#### 4. 为什么目前使用Filecoin以及IPFS提供存储服务的工具可以提供免费服务？
引流，构建生态。

#### 5. 对比 “使用存储服务的工具”  VS “使用Filecoin节点直接进行存储”的各种不同点？
直接使用Filecoin节点进行存储:
a) 学习开发门槛高，接触到底层的Filecoin知识，需要对Filecoin存储网络比较了解.
b) 扩展性强，适用面广，适合想做Filecoin基础设施项目的开发.

使用上层存储服务工具:
a) 使用Dapp项目的开发，开发人员更多的精力可以集中在业务层，而非存储层.
b) 工具是针对特定领域的，普适性不强。比如针对web部署的Fleek Hosting，针对通用存储的Estuary，针对web3存储的Web3.Storage，针对NTF存储的NFT.Storage.