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
### 3. Filecoin 在复制证明的过程中引入了哪些参数和过程来防止女巫攻击，生成攻击和外包攻击？
### 4. Filecoin 是怎么使存储服务商提供稳定的服务的？
### 5. Filecoin 为什么要各种语言/架构实现的版本？这给整个网络带来了哪些好处？
