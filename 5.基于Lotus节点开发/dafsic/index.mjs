import { HttpJsonRpcConnector,LotusClient, LotusWalletProvider } from "filecoin.js";

const localNode = "http://127.0.0.1:1234/rpc/v0";
const adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.bx_w-e-Y8cvgYnwo-twsH9HpIsXUmSweJSG7Wu0mqkE";
const localConnector = new HttpJsonRpcConnector({url:localNode,token:adminAuthToken});
const lotusClient = new LotusClient(localConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);

// 导入文件
async function loadFile(path) {
    return lotusClient.client.import({
        Path: path,
        IsCAR: false,
    });
}

// 存储提供商询价
async function priceAsk(sp,cid,) {
    return lotusClient.client.minerQueryOffer(sp,cid);
}

// 交易
async function makeDeal(root,miner){
    const wallet = await lotusWallet.getDefaultAddress();
    console.log("wallet: ",wallet);

    return lotusClient.client.startDeal({
        Data:{
            TransferType:'graphsync',
            Root: root,
        },
        Miner:miner,
        Wallet: wallet,
        EpochPrice:500000000,  // 0.0000000005 FIL/GiB/Epoch  * 1e18
        MinBlocksDuration: 180*2880, // 180天
    });

}

// 主函数
async function main(miner) {
    try {
        const data = await loadFile("/root/wjhyg.pdf");

        console.log("data: ",data)

        // TODO: 判断文件是否导入成功

        const offer = await priceAsk(miner, data.Root);

        if(data.Root["/"] !== offer.Root["/"]) {
            console.log("error: Provider is not active");
            return;
        }

        console.log("offer: ", offer);
        
        // TODO: 获得sp的价格

        const deal = await makeDeal(data.Root, miner);

        console.log("deal: ",deal);

    } catch (error) {
        console.log("error: ", error)
    }
}

main('t031765')