import { HttpJsonRpcConnector,  LotusWalletProvider, LotusClient} from "filecoin.js";
import BigNumber from "bignumber.js"

//node connect
const localNodeUrl = "http://127.0.0.1:1234/rpc/v0"
const signAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.NhDgN40x_JnSZP5tm41L8vHSXF23CI_ybElthC4UJRo"
const httpConnect = new HttpJsonRpcConnector({url:localNodeUrl, token:signAuthToken})
const lotusClient = new LotusClient(httpConnect);
const lotusWallet = new LotusWalletProvider(lotusClient);

async function storeFile(){
    try {
        //1. 导入需要保存的文件
        const importResult = await lotusClient.client.import({
            Path: "./index.mjs",
            IsCAR: false
        });
        console.log(importResult.Root);
        
        //2. 想存储服务提供商询价
        const spAdd = 't031765';
        const queryOffer = await lotusClient.client.minerQueryOffer(spAdd, importResult.Root);
        console.log(queryOffer);

        const isValid = importResult.Root["/"] === queryOffer.Root["/"];

        if(isValid) {
            //3.发起存储交易
            const dealCid = await lotusClient.client.startDeal({
                Data: {
                    TransferType: 'graphsync',
                    Root: importResult.Root,
                },
                Miner: spAdd,
                Wallet: await lotusWallet.getDefaultAddress(),
                EpochPrice: '200000000',
                MinBlocksDuration: 518400,
            });
            console.log(dealCid);

        } else {
            await lotusClient.client.removeImport(importResult.ImportID);
        }

    } catch (error) {
        console.log(error);
    }
}

storeFile();