# 「2」IPFS & Filecoin简介与技术基础 - 课后作业
### 开放式问答：

1. IPFS与HTTP相比最大的区别和优势有哪些？ 
        
        - 基于内容寻址而不是URL网络地址，同样内容具有同样的CID
        - 去中心化，防止单点故障，数据进行分布式存储，具有较强的容错、恢复能力


2. IPFS是如何做到内容路由和亢内容重复的？

        - IPFS基于DHT实现了内容路由，每个节点都有标识，存储分布式哈希表（内容发现表和节点路由表），通过相互发现，最终实现内容路由。
        - 对文件哈希，相同内容的文件具有相同的CID。所以内容重复就可以避免。
        - 为了数据亢余，数据交易可以重复多次，让存储商存储信息。

3. 为什么网上流行这么一个说法“如果你的NFT不再IPFS上，那么你的NFT也不在你手上？” 这是提到了IPFS的那个特性？

        - 如果NFT采用中心化存储，一旦受到攻击或者崩溃，NFT也就随之消失。IPFS属于分布式存储，使得数据能够抵御底层网络故障，实现数据永久化安全存储。
        - 如果NFT内容不变，IPFS存储CID也不会发生变化。这使得其链接可以长时间保持稳定。


4. Filecoin的存储交易有哪些步骤？ Filecoin可以永久保存文件吗？ 将来哪个技术会让Filecoin的交易变得更加方便？

        - 存储交易步骤： 
            1. 用户通过智能合约发布存储交易，由Filecoin将文件转化为DAG。
            2. 存储商生成复制证明，证明数据被正确接收。将PoRep证明发布到Filecoin区块链上。
            3. 存储时随机提供时空证明（PoST）发布到区块链上。
            4. 用户可以选择延长交易或使其自动过期
        - 需要支付激励以使得内容持久存储在IPFS网络中。但任何人都可以延续交易以使得数据持续存储。
        - FVM技术可以对Filecoin的交易带来益处。


5. 为何Filecoin+ 现在免费给客户提供存储？它的初衷是什么？

        - 激励大众在分布式网络上存储更有意义的数据
        - 初衷在于确保永久保存对人类来说最为重要的证据，如美国大选、科技数据等等。 
