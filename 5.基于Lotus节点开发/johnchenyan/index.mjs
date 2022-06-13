import { HttpJsonRpcConnector, LotusClient } from "filecoin.js";

const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";
const localConnector = new HttpJsonRpcConnector({url:localNodeUrl});

const lotusClient = new LotusClient(localConnector)

const version = await lotusClient.common.version();

console.log(version)