import { HttpJsonRpcConnector, LotusWalletProvider , LotusClient } from "filecoin.js"; 
import BigNumber from 'bignumber.js';

//Node connect
const localNodeUrl   = "http://127.0.0.1:1234/rpc/v0";
//lotus auth create-token --perm sign
const signAuthToken  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.7vMxgi7UazLneoxHs1x9tucjglwq1sG7dRYFgXynOjc";
const httpConnector  = new HttpJsonRpcConnector({url:localNodeUrl,token:signAuthToken});
const lotusClient    = new LotusClient(httpConnector);
const lotusWallet    = new LotusWalletProvider(lotusClient);

//创建钱包地址
async function newWallet() {
	try {
		const account = await lotusWallet.newAddress();
		console.log(account);
	} catch (error) {
		console.log(error);
	}
}

//构建转账交易
async function transferFIL() {
	try {
		const fromAddr = await lotusWallet.getDefaultAddress();
		const toAddr   = "t1mj5bmkkhpz64qc7tnfdtyvjwqntdfs6bn4dfhmq";
		
		const result   = await lotusWallet.sendMessage({
			From:fromAddr,
			To:toAddr,
			Value:new BigNumber(50000000000000000000)
		});
		console.log("message CID:",result.CID);

	} catch (error) {
		console.log(error);
	}
}
walletBalance();
//查询钱包余额
async function walletBalance() {
	try {
		const balance = await lotusWallet.getBalance("t1mj5bmkkhpz64qc7tnfdtyvjwqntdfs6bn4dfhmq");
		
		console.log(balance);

	} catch (error) {
		console.log(error);
	}
}
