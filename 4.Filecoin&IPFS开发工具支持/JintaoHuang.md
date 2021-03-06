## 1. 为什么更推荐结合使用IPFS以及Filecoin为项目提供去中心化存储？

IPFS分布式存储系统可以存储数据且快速的检索读取，但是没有保障性，数据能够长久保存依赖于存储该数据的节点，如果节点下线或删除数据，就存在数据丢失风险。
Filecoin通过生态内的惩罚奖励机制，使得存储提供商能够有效的保存数据：存储提供商每日提交时空证明来告知全网有切实保存数据，其他节点使用零知识证明技术验证证明的真实性，
如果证明失败，存储提供将收到惩罚。
结合两者，能够发挥两者优势，IPFS热存，Filecoin冷存，实现一个更加可靠、更加安全的分布式存储体系。

## 2. 如何在IPFS上访问存储的文件或者数据？举例说明你能想到的办法

使用官方ipfs网关
使用其他第三方ipfs网关
使用原生支持IPFS的浏览器

## 3. 有几种方式运行IPFS节点？分别是什么？

三种：
ipfs CLI  ：ipfs命令行
ipfs Desktop : 桌面客户端
ipfs Cluster  : ipfs集群

## 4. 为什么目前使用Filecoin以及IPFS提供存储服务的工具可以提供免费服务？

主要是两方面：
（1）推广Filecoin+IPFS的分布式存储模式，让大众更加接收这种存储方式
（2）提高Filecoin真实数据存储比例，实现Filecoin数据存储的实际价值

## 5. 对比 “使用存储服务的工具”  VS “使用Filecoin节点直接进行存储”的各种不同点？

（1）使用存储服务工具是将数据存储在服务商的节点环境下，自己使用Filecoin节点则自行保存数据
（2）工具存储自然使用门槛较低，直接使用节点则需要一定的软件能力
（3）使用工具无需关心链上gasfee，只需支付服务使用费，而自行部署节点则需要考虑FIL支付交易gasFee的问题
（4）使用工具存储则无法自定义冗余度，自行部署节点存储则可任意制定备份数
