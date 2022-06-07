import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";

const connector = new HttpJsonRpcConnector({url: localNodeUrl});

const lotusClient = new LotusClient(connector);


const version = await lotusClient.common.version();
console.log(version);

const chainHead = await lotusClient.chain.getHead();
console.log(chainHead);

const height = chainHead.Height;
console.log(height);

const tipSet = await lotusClient.chain.getTipSetByHeight(height);
console.log(tipSet);

const cid = tipSet.Cids[0];
console.log(cid);

const messages = await lotusClient.chain.getBlockMessages(cid);
console.log(messages);

const walletBalance = await lotusClient.wallet.balance("t1xtzcl55f6ct7lrzdrddofun5wpikyto6nj53q5i");
console.log(walletBalance);

