### 开放式问答：

1. IPFS与HTTP相比最大的区别和优势有哪些？ 
    区别：分布式去中心化；优势：用户驱动的服务、更自由、保护隐私、不依赖信任。
2. IPFS是如何做到内容路由和亢内容重复的？
    内容路由：IPFS 每个节点具有唯一标识、加密通讯、利用附近节点的服务、给临近节点提供服务、被发现、转发和路由的功能。用 CID 替换 URL。  
    亢内容重复：IPFS 上同样内容的数据都有同样的 CID，如果内容有任何的改动会生成心的 CID。
3. 为什么网上流行这么一个说法“如果你的NFT不再IPFS上，那么你的NFT也不在你手上？” 这是提到了IPFS的那个特性？
    IPFS的抗内容重复特性，可以确保 NFT 文件被用户所拥有。
4. Filecoin的存储交易有哪些步骤？ Filecoin可以永久保存文件吗？ 将来哪个技术会让Filecoin的交易变得更加方便？
    存储交易步骤：
       1. 用户发布一个有时间区间的存储交易
       2. 存储商生成一个复制证明证明用户数据被接收完好无损
       3. 存储区间中，存储商需要时不时的提供随机部分数据的时空证明
       4. 在存储交易快结束的时候，用户可以延长交易或者让它自动过期，用户也可以用检索市场把数据取出来。
    Filecoin可以永久保存，当存储交易快结束的时候，用户可以延长交易。
    任何存储交易可以被任何人无限次延续的技术让Filecoin的交易变得更加方便。
5. 为何Filecoin+ 现在免费给客户提供存储？它的初衷是什么？
    是为了激励大众在分布式网络上存储有意义的数据。
