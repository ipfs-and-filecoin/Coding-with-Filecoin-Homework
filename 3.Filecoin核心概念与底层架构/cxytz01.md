# 「3」Filecoin核心概念与底层架构 - 课后作业

### 1. 尽管 IPFS 网络已经达到相当大的规模，为什么我们还要构造 Filecoin 这样一个网络？
一. IPFS and Filecoin -- https://docs.filecoin.io/about-filecoin/ipfs-and-filecoin/

Filecoin and IPFS are complementary protocols for storing and sharing data in the distributed web. 

IPFS alone does not include a built-in mechanism to incentivize the storage of data for *other* people. This is the challenge Filecoin aims to solve. Filecoin is built on IPFS to create a distributed storage marketplace for long-term storage. Nodes with a large storage capacity can rent their storage to users and get paid for it.

The Filecoin network ensures that data is safely stored. However, the processes of storing, verifying, and unsealing (referred to as sealing, proving, and retrieving, respectively) are computationally expensive and can take time. This is especially relevant for the retrieval of data, which should happen as fast as possible. For this reason, Filecoin enables an additional retrieval market where dedicated nodes can help quickly deliver content from the network for payment by keeping unsealed, cached copies. This delivery mechanism may make use of IPFS but is still in design.

Filecoin aims to add longer-term persistence to safely store large batches of data, while IPFS optimizes for the quick retrieval and distribution of content.

Filecoin builds on the content addressing of IPFS to add longer term data persistence using cryptoeconomic incentives. With Filecoin:
 * Clients make storage deals with storage providers to store data. The network verifies that the storage providers are correctly storing the data. Small payments are made on a regular basis for the duration of the storage deal.
 * Storage providers that do not honor the storage deal are penalized.
 * Content retrieval might be offered by storage providers directly, or by specialized retrieval storage providers. The user requesting the data pays for this service.
 * Filecoin excels at storing large amounts of data for long periods of time.

二. Why Filecoin? -- https://docs.filecoin.io/about-filecoin/why-filecoin/

a) Verifiable storage -- Filecoin has built-in processes to check the history of files and verify that they have been stored correctly over time. Every storage provider proves that they are maintaining their files in every 24-hour window.

b) Open market -- In Filecoin, file storage and retrieval deals are negotiated in open markets.Anybody can join the Filecoin network without needing permission.

c) Competitive prices -- Prices for storage and retrieval are determinded by supply and demand, not corporate pricing departments. Filecoin makes reliable storage available at hyper-competitive prices.

d) Reliable storage -- Beacuse storage is paid for, Filecoin provides a viable economic reason for files to stay available over time.

e) Reputation, not marketing -- In Filecoin, storage providers prove their reliability through theri track record published on the blockchain, not through marketing claims published by the providers themselves.

f) choice of tradeoffs -- Users get to choose their own tradeoffs between cost, redundancy, and speed. Users are not limited to a set group of data centers offered by their provider but can choose to store their files on any storage provider participating in Filecoin.

g) censorship resistance -- Filecoin resists censorship because no central provider can be coerced into deleting files or withholding service. The network is made up of many different computers run by many different people and organizations.

h) useful blockchain -- In Filecoin, storage providers are rewarded for providing storage, not for performing wasteful computations. Filecoin secures its blockchain using proof of file replication and proof of storage over time. 

i) provides storage to other blockchains -- Filecoin’s blockchain is designed to store large files, whereas other blockchains can typically only store tiny amounts of data, very expensively. Filecoin can provide storage to other blockchains, allowing them to store large files.

j) content addressing -- Files are referred to by the data they contain, not by fragile identifiers such as URLs. Files remain available no matter where they are hosted or who they are hosted by. 

k) content distribution network -- Retrieval providers are computers that have good network connections to lots of users who want to download files. By prefetching popular files and distributing them to nearby users, retrieval providers are rewarded for making network traffic flow smoothly, and files download quickly.

l) single protocol -- Applications implementing Filecoin can store their data on any storage provider using the same protocol. There isn’t a different API to implement for each provider. 

m) no lock-in -- Migrating to a different storage provider is made easier because they all offer the same services and APIs. Users aren’t locked into providers because they rely on a particular feature of the provider. 

n) Open source code -- The code that runs both clients and storage providers is open-source. Storage providers don’t have to develop their own software for managing their infrastructure. Everyone benefits from improvements made to Filecoin’s code.

o) Active community -- Filecoin has an active community of contributors to answer questions and help newcomers get started. 

### 2. 为什么 Filecoin 要引入 tipset 机制？
Filecoin认为对于提供了同样存储的每一个节点都应该得到同样的奖励。因此Filecoin引入了tipset机制：Filecoin中一个高度上可以存在多个block，其中的多个block都是可以获取收益的。由同一组高度相同，且父块(tipset)相同的block组成一个tipset。
### 3. Filecoin 在复制证明的过程中引入了哪些参数和过程来防止女巫攻击，生成攻击和外包攻击？
PoRep、PoSt中用到了可验证时延加密算法，目前是通过BLS12-381加密算法，多次迭代完成。在可验证时延加密算法中，需要用到零知识证明方法(zk-SNARK)。

具体细节是：
由hash(树根commD，minerID，sectorID，来自链上的随机数，algorithm version) 生成 replica_id。
a) 带入minerID使得每一份数据都是和存储提供商绑定，防止外源攻击。
b) 带入sectorID确保每一份数据都是独立的，防止了女巫攻击。
c) 使用relica_id作为Stacked Depth Robust Graphs构成元素，由于SDRG的复杂性，其生成工作是缓慢的，保证了复制发生的工作量，防止了生成攻击。

### 4. Filecoin 是怎么使存储服务商提供稳定的服务的？
Filecoin是IPFS之上的激励层，因此促使存储服务商提供稳定服务的方式依赖于激励机制的设计，即奖励和惩罚机制。

Filecoin的奖惩机制源自于PoX机制，分别有：Proof-of-Storage、Provable Data PoSsession、Proof-of-Retrievability、Proof-of-Replication、Proof-of-Space、Proof-of-Spacetime.

Filecoin系统内有几个角色和过程：challenge、prover、verifier、data、proof。网络内通过定义好的规则向prover(miner)发起挑战，prover(被挑战者如果失败则会被系统扣除质押的代币奖励，prover响应挑战成功则会获得网络释放的质押代币。

奖励机制：
1. 对于为用户存储数据的存储提供商节点，其可以在网络中参加领导人选举，获取网络给予的创建区块奖励
2. 对于为用户存储数据的存储提供商节点，其还可以获取由用户提供的存储费用。
3. 对于为用户提供检索数据服务的检索提供商节点，其可以获取用户提供的检索费用。
4. 对于网络中非法行为的监督节点，成功举报非法行为之后可以获取对应的举报金。

惩罚机制：
1. 未能按时提交windowpost的存储提供商，网络会按照错误扇区的比例罚没一定的费用。
2. 对于未能按照扇区声明的生命周期完成服务，而提前终止扇区的存储提供商，网络会罚没一定的费用。
3. 对于违反EC共识、提交错误windowpost的存储提供商，网络会罚没一定的费用。

### 5. Filecoin 为什么要各种语言/架构实现的版本？这给整个网络带来了哪些好处？
将去中心化进行到底，增加生态多样性。
a) 如果整个生态中使用不同的语言，或者相同的语言不同的架构，或者相同的语言相同的架构但不同的开发人员，将会大大降低所有节点同时发生相同bug的几率。降低整个网络因为同一个bug而导致网络瘫痪的可能性。
b) 吸引不同语言生态的开发人员加入
c) 探索不同架构来满足不同的应用场景
