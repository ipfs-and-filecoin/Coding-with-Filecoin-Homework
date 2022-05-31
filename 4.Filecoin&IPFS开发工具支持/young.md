# 「4」Filecoin & IPFS 开发工具支持 - 课后作业

### 开放式问答：

1. 为什么更推荐结合使用IPFS以及Filecoin为项目提供去中心化存储？

    - IPFS与Web3兼容，Filecoin利用IPFS技术，继承所有内容寻址的优势，能够为诸多Web3项目提供存储。
    - Filecoin的激励奖惩制度会使得存储商提供稳定服务。
    - IPFS与Filecoin相互补充协作，IPFS提供热存储，Filecoin提供冷存储。

2. 如何在IPFS上访问存储的文件或者数据？举例说明你能想到的办法

    - 原生兼容IPFS的浏览器 Opera brave
    - IPFS Http Gateway
    - 基于本地IPFS节店直接 get/cat 获取

3. 有几种方式运行IPFS节点？分别是什么？

    - IPFS Desktop
    - IPFS CLI 
    - IPFS Cluster

4. 为什么目前使用Filecoin以及IPFS提供存储服务的工具可以提供免费服务？

    - 推广，争取用户和商业化，积累用户数量及市场份额

5. 对比 “使用存储服务的工具”  VS “使用Filecoin节点直接进行存储”的各种不同点？

    - 使用存储服务： 无需搭建本地节点，支持大多数读取服务，但更多功能式受限的
    - 使用节店： 硬件配置高，需要掌握较多IPFS知识和Filecoin原理。