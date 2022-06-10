import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from "filecoin.js";

const lotusNodeUrl = "http://10.7.2.12:9234/rpc/v0";
const adminApiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.BBF00OvGrDWhWx85mRym-1Bhi7RfJ0gtEL1rLZJHY5I";
const httpConnect = new HttpJsonRpcConnector({url:lotusNodeUrl, token:adminApiToken});

// 初始化client对象
const lotusClent = new LotusClient(httpConnect);

// 初始化wallet连接对象
const lotusWallet = new LotusWalletProvider(lotusClent);

storeFile();
// Filecoin存储文件
async function storeFile() {
    try {
        // 1. 导入要保存的文件
        const importRet = await lotusClent.client.import(
            {
                Path: "E:\\network.png",
                IsCAR: false
            }
        );
        console.log(importRet.Root);

        // 2. 向存储Miner询价 (lotus client list-asks)
        const storeMiner = 't036188';
        const queryOffer = await lotusClent.client.minerQueryOffer(storeMiner, importRet.Root);
        console.log(queryOffer);

        const isValid = importRet.Root["/"] === queryOffer.Root["/"];
        if (isValid) {
            // 3. 发起存储交易
            const dealCID= await lotusClent.client.startDeal(
                {
                    Data: {
                        TransferType: 'graphsync',
                        Root: importRet.Root
                    },
                    Miner: storeMiner,
                    Wallet: await lotusWallet.getDefaultAddress(),
                    EpochPrice: '200000000',
                    MinBlocksDuration: 518400
                }
            );
            console.log(dealCID);
        }
        else {
            await lotusClent.client.removeImport(importRet.ImportID);
        }
        
    } 
    catch(error) {
        console.log(error);
    }
}