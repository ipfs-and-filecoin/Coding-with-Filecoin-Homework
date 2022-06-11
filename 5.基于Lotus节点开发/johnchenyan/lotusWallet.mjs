import { HttpJsonRpcConnector,  LotusWalletProvider, LotusClient} from "filecoin.js";
import BigNumber from "bignumber.js"

//node connect
const localNodeUrl = "http://127.0.0.1:1234/rpc/v0"
const signAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.PJL5IgYqruI6fdIwKr7ffLN9WLeUyhNCacBE33XcV-U"
const httpConnect = new HttpJsonRpcConnector({url:localNodeUrl, token:signAuthToken})
const lotusClient = new LotusClient(httpConnect);
const lotusWallet = new LotusWalletProvider(lotusClient);

//创建钱包地址
async function newWallet(){
    try{
        const account = await lotusWallet.newAddress();
        console.log(account)
    } catch (error) {
        console.log(error);
    }
}

//构建转账交易
async function newWallet(){
    try{
        const fromAdd = await lotusWallet.getDefaultAddress();
        const toAdd = "t1wjuvbivg55hhnjzj5wycleqqqg5mwuj5ximhcey";

        const msgResult = await lotusWallet.sendMessage({
            From: fromAdd,
            To: toAdd,
            value: new BigNumber(5000000000000000000)
        });
        //console.log("message Cid: ", msgResult.CID);
        
    } catch (error) {
        console.log(error);
    }
}

//查询钱包余额
async function newWallet(){
    try{
        const balance = await lotusWallet.getBalance("t1wjuvbivg55hhnjzj5wycleqqqg5mwuj5ximhcey");
        console.log(balance);
    } catch (error) {
        console.log(error);
    }
}