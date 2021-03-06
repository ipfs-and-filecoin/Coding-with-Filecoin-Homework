# 1. IPFS与HTTP相比最大的区别和优势有哪些？ 
* （1）分布式存储、去中心化
   内容的分布式存储能够提高数据存储的安全性，避免单一服务宕机导致的数据访问失败，同时IPFS的数据存储具有不可篡改的特性，利用CID便可对内容真实进行校验。
* （2）抗DDos攻击
   IPFS不用与HTTP下的中心服务框架，IPFS的网络访问不依赖任意一个节点，所以天然具有抵抗DDos攻击的能力。
* （3）IPLD数据模型，增加了存储利用率
   在IPFS分布式存储下，所有的文件都遵从IPLD协议规定的底层数据结构模型，更加科学的文件版本管理使得对存储空间的利用率更高。
* （4）更快的访问速度
   HTTP架构下，用户访问速度取决于网络带宽及服务器性能等，所以经常出现访问速度过慢、延迟高的情况，在IPFS网络架构下，会优先访问临近节点来获取资源，在热门资源的获取时会大大提高网络访问速度。
   
# 2. IPFS是如何做到内容路由和亢内容重复的？
IPFS采用了DHT分布式哈希表的技术，让每个节点保存一部分的网络资源对节点的映射关系，当用户使用CID在IPFS网络获取文件资源时，会向网络的各个节点依次发送询问需求，当节点在本地哈希表中没有找到
该资源文件，那么节点将会将请求发送给下一个节点，这样直到找到资源映射并返回给询问节点。
同时IPFS使用bittorent的数据版本控制协议，通过IPLD的数据模型，将数据拆分为256k大小的数据模块，使用MerkelDAG的有向无环图结构，是的每个相同的数据文件具有相同的CID，也就是根HASH，那么在
文件的部分内容发生改变的时候，那么只需要修改MerkelDAG中的部分子树的hash值，这样就不需要拷贝整个文件，从而实现亢内容重复。
IPFS的主动内容冗余可以对相同数据，也就是相同CID的数据多次存储来进行实现。

# 3. 为什么网上流行这么一个说法“如果你的NFT不再IPFS上，那么你的NFT也不在你手上？” 这是提到了IPFS的那个特性？
IPFS作为目前最大的可信分布式存储网络，是很多项目的分布式存储基础设施。目前NFT必须依赖区块链进行存储，而目前大多数区块链无法进行大量数据的链上存储，所以NFT的上链必须依赖一个可以进行大量数
据可信存储的设施，IPFS则完美的符合这个要求。具体实现方式就是在区块链智能合约中保存NFT数据得CID，而具体的NFT数据（比如3D模型数据）则保存在IPFS上，这样就保证了完整的NFT数据去中心化、可信
任的保存。
为什么不可以是区块链上保存数据哈希，然后链下保存实体数据呢？因为链下保存没办法达到一个可信的持久性，而且中心化的存储服务器存储，即使做了数据备份，也没办法做到完全数据公开，和绝对的防止数据
丢失，而IPFS则可以满足上面所有要求，IPFS分布式、去中心化、不可篡改的存储特性才真正是NFT的标准存储基础设施。

# 4. Filecoin的存储交易有哪些步骤？ Filecoin可以永久保存文件吗？ 将来哪个技术会让Filecoin的交易变得更加方便？
Filecoin存储交易的步骤：
* （1）存储用户通过链上智能合约发起一个存储deal，约定用户支付一定的FIL用来支付存储提供商，用于保存给定的数据一定的期限。
* （2）Filecoin协议会将用户要存储的文件生成MerkelDAG
* （3）存储提供商接受交易deal后，会生产存储文件的第一个复制证明（PoRep），证明存储提供商已经完整无误的接收并文件，并会将PoRep发布到Filecoin链上。
* （4）存储的期限当中，存储提供商会每天提交时空证明（PoPost）到链上，以证明存储提供商有切实的保存好用户的数据，全网节点参与验证PoPost。
* （5）存储期限到期时，用户可以选择支付并延期存储，或者让存储的内容自动过期。

Filecoin目前并不能永久的保存文件，目前的分布式存储网络也没有真正能够实现永久保存的技术，但是Filecoin网络可以存储文件的生命周期进行延期，来延长文件的存储时间，未来参与Filecoin生态的存储
商越来越多，存储所要支付的代价会越来越低，存储的期限将不会是很大的障碍。

将来FVM技术引入将为Filecoin的网络带来新的活力，FVM也就是Filecoin网络智能合约运行虚拟机环境，能够让Filecoin在拥有分布式存储能力的同时具有分布式计算的能力，用户能够将既定好的业务逻辑
发布到链上，通过网络中的节点共同执行和验证得到执行结果，实现一个能够使用链上数据的可信任执行环境，将对未来的业务场景创造无限的可能。


# 5. 为何Filecoin+ 现在免费给客户提供存储？它的初衷是什么？
Filcoin Plus目前免费为客户提供存储，是为了推动Filecoin网络存储真实数据，创建Filecoin+的初衷就是让更多的存储提供商参与到真实数据存储的过程中来，它将在全球平均分布一套公证人系统，来保障3
存储数据的真实性，通过增加存储提供商的奖励来激励所有存储提供商参与真实数据存储。
所有这一切都是为了让Filecoin网络走向真实价值存储的道路。
