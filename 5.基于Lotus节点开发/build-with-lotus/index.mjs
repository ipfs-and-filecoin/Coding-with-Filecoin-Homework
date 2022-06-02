import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

const localNodeUrl = "http://192.168.11.49:1234/rpc/v0";
const localConnector = new HttpJsonRpcConnector({ url: localNodeUrl });
const lotusClient = new LotusClient(localConnector);


// Version of Local node
const version = await lotusClient.common.version();
console.log(version);

// Get chain head
const chainHead = await lotusClient.chain.getHead();
console.log(chainHead);

// Get all message for chain height
const tipSet = await lotusClient.chain.getTipSetByHeight(1002483);
const message = await lotusClient.chain.getBlockMessages(tipSet.Cids[0]);
console.log(message);

// Get FIL balance for a wallet
const balance = await lotusClient.wallet.balance("f1vzlf3fphli2x67zijjwsxe5ujz5itveqv2qd34i");
console.log(balance);

