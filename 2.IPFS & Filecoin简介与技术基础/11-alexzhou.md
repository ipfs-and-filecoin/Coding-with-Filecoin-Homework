# IPFS与HTTP相比最大的区别和优势有哪些？

IPFS相比HTTP最大的区别是IPFS通过内容本身定位而不是依赖内容的位置定位，采用内容ID（CID）来取代网络地址（URL）。

IPFS相比HTTP的优势有：

1. 高效率。通过LIBP2P+DHT技术，可以很快地根据文件的CID内容来查找到该文件。
2. 健壮性。遵循“离线第一”原则，采用分布式存储，局部不惧与主网断离。
3. 低成本。不需要将同一份数据拷贝多份放在不同的中心服务器上。
3. 安全性。IPFS上同样内容的数据有着同样的CID，一旦内容有任何改动，就会重新生成新的CID，保证了内容的可验证和无法篡改。

# IPFS是如何做到内容路由和亢内容重复的？

IPFS通过DHT（Distributed Hash Table，分布式哈希表）技术，让每个节点保存一部分的PID（节点ID）和CID（内容ID），通过相互发现来实现内容路由。

IPFS通过对文件进行加密哈希功能，生成一个统一规格的哈希值（CID），同样内容的数据会生成同样的CID。然后通过Merkle-DAG的PIPLD格式来将CID进行排列。当有新的同样文件需要加入的时候，我们不需要去复制这个文件，因为同样内容的数据都有同样的CID，从而实现亢内容重复，节省存储空间。

# 为什么网上流行这么一个说法“如果你的NFT不再IPFS上，那么你的NFT也不在你手上？” 这是提到了IPFS的那个特性？

- 分布式特性。
- 防篡改特性。

由于以太坊上数据存储成本过高，在没有IPFS的时候，传统的常规做法是将NFT数据存储在某个中心化服务器上，然后再通过URL来对数据进行链接。

但这种做法存在着很大的风险，一旦该中心化服务器发生故障（或离线或数据丢失或被篡改），那么该NFT也将改变或消失，从而失去NFT本身唯一标志性的特点。

# Filecoin的存储交易有哪些步骤？ Filecoin可以永久保存文件吗？ 将来哪个技术会让Filecoin的交易变得更加方便？

Filecoin存储交易的步骤有：

1. 用户通过智能合约发布一个有时间区间的存储交易，Filecoin协议把文件转化为MerkelDAG。
2. 存储商生成第一个PoRep（复制证明）来证明用户数据被接受完好无误，这个PoRep会被发布到Filecoin区块链上。
3. 存储区间中，存储商得时不时的提供部分数据的PoST（时空证明）发表到区块链上。只有当PoST及时提供了，存储商才能分期得到FIL的奖励，反之则会被惩罚。
4. 再存储交易快结束的时候，用户可以延长交易或者让它自动过期。

Filecoin可以通过上一层的系统（比如智能合约）来实现永久保存文件，任何存储交易都可以被任何人无限次通过智能合约来延期。

未来，FVM（Filecoin Virtual Machine，Filecoin虚拟机）技术将会使得Filecoind的交易变得更加方便。

# 为何Filecoin+ 现在免费给客户提供存储？它的初衷是什么？

Filecoin Plus的初衷是为了激励大众在分布式网络上存储更有意义的数据，比如：Shoah大屠杀幸存者的证言、ZARR全球气候数据、美国大选数据、Gainforest存储卫星成像数据等这些跟人类的历史和未来发展有帮助的数据。

免费是为了降低使用门槛，推动Filecoin的不断壮大，真正成为对人类发展有用的工具。
