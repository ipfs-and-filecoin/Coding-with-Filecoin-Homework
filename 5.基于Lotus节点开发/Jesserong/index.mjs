import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

const localNodeUrl   = "http://127.0.0.1:1234/rpc/v0";
const localConnector = new HttpJsonRpcConnector({url:localNodeUrl});

//Version of Local node
const lotusClient = new LotusClient(localConnector);
const version     = await lotusClient.common.version();
console.log(version);

//Get chain head
const chainHead  = await lotusClient.chain.getHead();
console.log(chainHead);

//Get all messages from chain height
const tipSet = await lotusClient.chain.getTipSetByHeight(1009293);
const messages = await lotusClient.chain.getBlockMessages(tipSet.Cids[0]);

console.log(messages);

//Get FIL balance for a wallet
const walletBalance = await lotusClient.wallet.balance("t1pojy6adicywd6d4zksxx3kmmy67vumcv5yba3uq");
console.log(walletBalance);