import {HttpJsonRpcConnector, LotusClient} from "filecoin.js";

// init lotus client
const nodeUrl = "http://127.0.0.1:1234/rpc/v0";
const connector = new HttpJsonRpcConnector({url:nodeUrl});
const lotusClient = new LotusClient(connector);

// expose all lotus APIs
const version = await lotusClient.common.version();
console.log(version);

// query the current block head
const chainHead = await lotusClient.chain.getHead();
console.log(chainHead);

// query all messages in a block
const height = 781267;
const tipSet = await lotusClient.chain.getTipSetByHeight(height);
const messages = await lotusClient.chain.getBlockMessages(tipSet.Cids[0]);
console.log(messages);

// query wallet balance
const walletAddress = "t16rxskyo4wd7kqitur3g7fwytyu6bidcpnyy6qmq";
const balance = await lotusClient.wallet.balance(walletAddress);
console.log(balance);
