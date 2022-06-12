import { HttpJsonRpcConnector, LotusClient } from "filecoin.js"
import { config } from "./config.mjs"

const conn = new HttpJsonRpcConnector({ url: config.url })
const client = new LotusClient(conn);
const version = await client.common.version();
console.log("1. filecoin-lotus version:", version);

const chain = client.chain;
const head = await chain.getHead();
const height = head.Blocks[0].Height;
console.log("2. filecoin-lotus chain head CID and hight:", head.Cids[0], height);

const tipset = await chain.getTipSetByHeight(height);// sometime not work, wait 
const messages = await chain.getBlockMessages(tipset.Cids[0]);
console.log("3. filecoin-lotus chain head block info:", messages);

const walletBalance = await client.wallet.balance("t1t66l2theuii4cmvbo4serwbr6fgrrye6xgqljfy");
console.log("4. filecoin-lotus my wallet balance:", walletBalance);
// console.log
// ❯ node index.mjs
// 1. filecoin-lotus version: {
//     Version: '1.15.3+calibnet+git.a7e8f5aa1',
//     APIVersion: 66816,
//     BlockDelay: 30
//   }
//   2. filecoin-lotus chain head CID and hight: {
//     '/': 'bafy2bzaceasuxlg7ljfiepck3qwlsmi22ciieaaytjrq4zx353qaahdwypnlg'
//   } 1032345
//   3. filecoin-lotus chain head block info: {
//     BlsMessages: [],
//     SecpkMessages: [ { Message: [Object], Signature: [Object], CID: [Object] } ],
//     Cids: [
//       {
//         '/': 'bafy2bzacedl2g27d7gspxa6rnbyqm7i6dns7q2m3wgk2j2cea3f7kkttojgo4'
//       }
//     ]
//   }
//   4. filecoin-lotus my wallet balance: 449999998619530296754