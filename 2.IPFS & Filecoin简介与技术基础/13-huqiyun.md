开放式问答：
1.IPFS与HTTP相比最大的区别和优势有哪些？

 答：http地址路径或者域名变了就找不到了.ipfs内容寻址,通过cid能够找到对应的文件内容.点对点的http,每个节点都可以是自己的网络.去中心化.
 
2.IPFS是如何做到内容路由和亢内容重复的？

 答:分布式的hash表,每个节点上提供一部分节点信息peerId,通过广播的方式进行内容路由。 利用merkle dags 每个目录都会生成一个cid,同样的内容会生成同一个cid来去重.内容有改动,会生成新的cid.来亢内容重复
 
3.为什么网上流行这么一个说法“如果你的NFT不再IPFS上，那么你的NFT也不在你手上？” 这是提到了IPFS的那个特性？

 答：去中心化，不可篡改.
 
4.Filecoin的存储交易有哪些步骤？ Filecoin可以永久保存文件吗？ 将来哪个技术会让Filecoin的交易变得更加方便？

 答:1.用户发送deal存储数据,filecoin会将文件生成一个cid,storageProvider竞争接收deal,生成复制证明,打包上链,随机部分时空证明来检查是否真实存储. 快到期了用户可以选择延期存储 
 2.可以永久保存文件,存储交易可以被延期.  
 3.智能合约FVM.
 
5.为何Filecoin+ 现在免费给客户提供存储？它的初衷是什么？

 答：存储更多的有价值的内容.对人类有用的数据.提供10倍的激励.鼓励网络存储有意义的数据. 
