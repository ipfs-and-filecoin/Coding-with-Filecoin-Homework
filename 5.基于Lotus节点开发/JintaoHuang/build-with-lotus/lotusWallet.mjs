import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from "filecoin.js";
import BigNumber from "bignumber.js"

const lotusNodeUrl = "http://10.7.2.12:9234/rpc/v0";
const signApiToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.gu_UDEZrmy5CEu77rq9FWwbmDf2eYs95BjnnlUckhis";
const httpConnect = new HttpJsonRpcConnector({url:lotusNodeUrl, token:signApiToken});

// 初始化client对象
const lotusClent = new LotusClient(httpConnect);

// 初始化wallet连接对象
const lotusWallet = new LotusWalletProvider(lotusClent);

// createWalletAddress();
// 创建一个新的钱包地址
async function createWalletAddress() {
    try {
        const address = await lotusWallet.newAddress("bls");
        console.log(address);
    } 
    catch(error) {
        console.log(error);
    }
}

// transferBalance();
// 创建一个转账交易
async function transferBalance() {
    try {
        const from = await lotusWallet.getDefaultAddress();
        const to = "t1vl4hbbsdyl2ox6worvix3vbtrww5yk2z2ofpopa";

        const retResult = await lotusWallet.sendMessage({
            From: from,
            To: to,
            value: new BigNumber(150000000000000000000)
        });
        console.log("message CID: ", retResult.CID);
    } 
    catch(error) {
        console.log(error);
    }
}

getAddressBalance();
// 查询钱包地址余额
async function getAddressBalance() {
    try {
        const address = await lotusWallet.getDefaultAddress();
        const addressBalance = await lotusWallet.getBalance(address);
        console.log("Address : ", address);

        const bigBalance = new BigNumber(addressBalance);
        const balance = bigBalance * Math.pow(10, -18);
        console.log("Balance : " + balance + " FIL");
    } 
    catch(error) {
        console.log(error);
    }
}