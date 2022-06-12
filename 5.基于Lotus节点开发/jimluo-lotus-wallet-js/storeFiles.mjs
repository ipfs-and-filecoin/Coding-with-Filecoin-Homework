import { HttpJsonRpcConnector, LotusClient, LotusWalletProvider } from "filecoin.js";
import { config } from "./config.mjs"

// lotus auth create-token --perm admin
const conn = new HttpJsonRpcConnector({ url: config.url, token: config.adminToken });
const client = new LotusClient(conn);
const wallet = new LotusWalletProvider(client);

// const fileImport = "/mnt/d/repos/blockchain/lotus-wallet-js/storeFiles.mjs";
// const minerAddr = 't01105';


async function storeFile() {
    try {
        const importResult = await client.client.import({
            Path: config.fileImport, IsCAR: false,
        });

        const queryoffer = await client.client.minerQueryOffer(config.minerAddr, importResult.Root);

        const cidImport = importResult.Root["/"];
        const cidQuery = queryoffer.Root["/"];
        if (cidImport === cidQuery) {
            const cidDeal = await client.client.startDeal({
                Data: {
                    TransferType: 'graphsync',
                    Root: importResult.Root,
                },
                Miner: config.minerAddr,
                Wallet: await wallet.getDefaultAddress(),
                EpochPrice: '200000000',
                MinBlocksDuration: 518400,
            });
            return [cidImport, cidQuery, cidDeal["/"]];
        }
        else {
            await client.client.removeImport(importResult.ImportID);
            return [-1, -1, -1]
        }
    } catch (error) {
        console.log(error);
    }
}

const cids = await storeFile();
console.log("storeFile cid import", cids[0]);
console.log("storeFile cid query", cids[1]);
console.log("storeFile cid deal", cids[2]);
// console.log
// ❯ node storeFiles.mjs
// storeFile cid import bafk2bzacedu5u4ocfvoszkupiofrxhwipebqcifmjpj4rufwyvvajt2horbwk
// storeFile cid query bafk2bzacedu5u4ocfvoszkupiofrxhwipebqcifmjpj4rufwyvvajt2horbwk
// storeFile cid deal bafyreigwk4welb5dnwk4gmprkrm4wpq543wrdksdo6ovilqiyeojrbhe34

// ❯ lotus client list-asks
// .. getting miner list
// * Found 97 miners with power
// .. querying asks
// * Queried 48 asks, got 8 responses
// t031337: min:256 B max:32 GiB price:0 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:418.0445ms protos:
// t01105: min:256 B max:32 GiB price:0.0000000002 FIL/GiB/Epoch verifiedPrice:0.00000000002 FIL/GiB/Epoch ping:1.0610494s protos:
// t022105: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:269.7903ms protos:
// t036982: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:375.4213ms protos:
// t036937: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:566.0914ms protos:
// t031765: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:562.1653ms protos:
// t036188: min:256 B max:32 GiB price:0.0000000005 FIL/GiB/Epoch verifiedPrice:0.00000000005 FIL/GiB/Epoch ping:264.4886ms protos:
// t034332: min:256 B max:32 GiB price:0.000000002 FIL/GiB/Epoch verifiedPrice:0 FIL/GiB/Epoch ping:298.8278ms protos: