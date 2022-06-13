import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

const lotusNodeUrl = "http://10.7.2.12:9234/rpc/v0";
const lotusConnector = new HttpJsonRpcConnector({url:lotusNodeUrl});

const lotusClient = new LotusClient(lotusConnector);

// 查看lotus版本
// const version = await lotusClient.common.version();
// console.log(version);

// 获取chain head
// const chainHead = await lotusClient.chain.getHead();
// console.log(chainHead);

// 获取某高度的所有消息
// const tipset = await lotusClient.chain.getTipSetByHeight(983593);
// const messages = await lotusClient.chain.getBlockMessages(tipset.Cids[0]);
// console.log(messages);

// 获取钱包地址余额
const balance = await lotusClient.wallet.balance("t1vl4hbbsdyl2ox6worvix3vbtrww5yk2z2ofpopa");
console.log(balance);