1.尽管 IPFS 网络已经达到相当大的规模，为什么我们还要构造 Filecoin 这样一个网络？

IPFS网络可以提供存储，但没有激励难以商业化，也很难保证网络的稳定运行；在IPFS网络中每个人都可以提供存储，缺乏用户信任机制；而在传统的中心化存储中能提供信任机制，让用户
能放心把数据存储上去，但随着数据量的快速增长，中心化存储逐渐满足不了需求，中心化网络也缺乏安全性，缺乏激励机制，缺乏奖励与惩罚，中心化存储并不能以文明以岁月。但Filecoin网络可以通过经济模型和证明机制来实现存储市场，实现一个去中心化存储的商业化；Filecoin是运用了区块链技术，构建了一个分布式p2p的鲁棒网络，
节约了资源，并且证明存储是有效的；还使用了证明机制，防止被攻击；还有内置的经济模型，使网络更加稳定的发展。

2.为什么 Filecoin 要引入 tipset 机制？

Filecoin的网络与其他区块链网络不同，Filecoin引入了tipset机制。Filecoin中一个高度上可以存在多个block，其中的多个block都是可以获取收益的；由同一组高度相同，且父块（tipset）相同的Block组成一个tipset。Filecoin中对于全网的快照，使用一个tipsetstate来
表示，可认为是网络所有信息最后构造成的树的树根；只有当节点所使用的协议完全一致，才能保证节点之间最后的 “全局状态” 是一致。

3.Filecoin 在复制证明的过程中引入了哪些参数和过程来防止女巫攻击，生成攻击和外包攻击？

Filecoin 的复制证明发生在第一次向网络中证明自己存储有效性时，存储提供商需要向网络中证明自己确实存储了客户的数据。允许证明者P说服用户（即验证者V）某些数据已被复制到其自己独特的专用物理存储中，即复制证明可以证明存储提供商确实存储了客户的数据。在密封preCommit phase1阶段中引入树根，身份ID，扇区，随机数，算法的版本号等参数进行hash计算出随机量replica_id；引入树根（commD）是为了将元数据加入到计算replica_id中；引入身份ID（minerID）是为了使存储的每一份数据都是跟存储提供商绑定的，防止外包攻击；加入扇区参数（SectorID）可以确保每一份数据都是独立的，能防止女巫攻击；代入随机数可以限制算法开始的时间，同时一个算法的版本号可以区分每一组算法；replica_id的所有元信息都可以公开验证的，由于生成replica_id的复杂性，这部分工作是不可加速的，是一个比较缓慢的过程，保证了复制的工作量，防止了生成攻击；在replica_id生成后就进入密封preCommit phase2阶段中的进行hash计算，
产出SealedCid，然后通过零知识证明，然后就证明完成了。Filecoin就是通过这一过程来防止女巫攻击，生成攻击和外包攻击的。

4.Filecoin 是怎么使存储服务商提供稳定的服务的？

Filecoin制定了一套奖励和惩罚机制来使存储服务商提供稳定的服务的。
奖励机制：
  1.对于为用户存储数据的存储提供商节点，其可以在网络中参加领导人选举，获取网络给予的创建区块奖励。
  2.对于为用户存储数据的存储提供商节点，其还可以获取由用户提供的存储费用。
  3.对于为用户提供检索数据服务的检索提供商节点，其可以获取用户提供的检索费用。
  4.对于网络中非法行为的监督节点，这类节点向网络中提交举报，成功举报之后可以获取对应的举报金。
惩罚机制：
  1.未能按时提交windowpost的存储提供商，网络会按照错误扇区的比例罚没一定的费用。
  2.对于未能按照扇区声明的生命周期完成服务，而提前终止扇区的存储提供商，网络会罚没一定的费用。
  3.对于违反EC共识，提交错误windowpost的存储提供商，网络会罚没一定的费用。

5.Filecoin 为什么要各种语言/架构实现的版本？这给整个网络带来了哪些好处？

因为Filecoin是去中心化的，上线后很难及时调整和操控，运用各种语言/架构实现可大大减低风险，吸引更多的开发人员加入来对软件进行不同层面的优化，探索不同的软件架构来满足不同的应用场景。
