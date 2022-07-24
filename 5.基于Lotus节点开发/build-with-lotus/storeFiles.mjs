import { HttpJsonRpcConnector, LotusClient, LotusWalletProvider } from "filecoin.js";


// Node Connect
const localNodeUrl = "http://192.168.11.49:1234/rpc/v0";
const adminAuthToken = "eyahbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.tyuW6_c4NRer2K-7fVCMbVFHpGN41pA_ggpN1oX9rl0";
const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: adminAuthToken });
const lotusClient = new LotusClient(httpConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);


// Store file deal
async function storeFile() {
    try {
        // 1. 导入需要保存的文件
        const importResult = await lotusClient.client.import({
            Path: "/home/xl/chanlun.pdf",
            IsCAR: false,
        })
        console.log("import result root: ", importResult.Root)

        // 2. 向存储服务提供商询价
        const spAdd = "t035925"
        const queryOffer = await lotusClient.client.minerQueryOffer(spAdd, importResult.Root);
        console.log("query offer: ", queryOffer)

        const isValid = importResult.Root["/"] === queryOffer.Root["/"];
        if (isValid) {
            // 3. 发起存储交易
            const dealCID = await lotusClient.client.startDeal({
                Data: {
                    TransferType: 'graphsync',
                    Root: importResult.Root,
                },
                Miner: spAdd,
                Wallet: await lotusWallet.getDefaultAddress(),
                EpochPrice: '500000000',
                MinBlocksDuration: 518400,
            })
            console.log("deal CID: ", dealCID)
        } else {
            await lotusClient.client.removeImport(importResult.ImportID)
        }


    } catch (error) {
        console.log(error)
    }
}

storeFile()