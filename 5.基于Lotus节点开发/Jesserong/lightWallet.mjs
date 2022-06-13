import { HttpJsonRpcConnector, LightWalletProvider , LotusClient } from "filecoin.js"; 
import BigNumber from 'bignumber.js';

const glifNodeUrl = "https://dev.node.glif.io/calibrationapi/lotus/rpc/v0";
const glifNodeConnection = new HttpJsonRpcConnector({url:glifNodeUrl});
const glifClient = new LotusClient(glifNodeConnection);

//创建一个轻钱包
async function createLightWallet() {
	try {
		const lightWallet = new LightWalletProvider(glifClient,() => {return "testPwd"},'test');
		const mnemonic    = await lightWallet.createLightWallet("testPwd");
		console.log("mnemonic: ",mnemonic);

		const encryptedWallet = lightWallet.keystore.serialize();
		console.log(encryptedWallet);

		const address = await lightWallet.getDefaultAddress();
		console.log(address);
	} catch (error) {
		console.log(error);
	}
}

//使用该钱包转账
async function sendFromLightWallet() {
	try {
		const mnemonic    = "fiscal hybrid sail enrich lady solution salt endless endless dignity cliff process";
		const lightWallet = new LightWalletProvider(glifClient,() => {return "testPwd"},'test');
		await lightWallet.recoverLightWallet(mnemonic,'testPwd');

		const address = await lightWallet.getDefaultAddress();
		console.log(address);
		//创建转账交易
		const message = await lightWallet.createMessage({
			From:address,
			To:"t1d746skawojyfh2xnxwpiwya5gidhwtvezih66si",
			Value:new BigNumber(1000000000000000000)
		});

		//签名交易 & 发送
		const signedMessage = await lightWallet.signMessage(message);
		const msgCid        = await lightWallet.sendSignedMessage(signedMessage);

		//bafy2bzacecor4lw6nupk7iemwjxnmeucfperej63nghycdlz7hujfg7rkd3ba
		console.log(msgCid);

	} catch (error) {
		console.log(error);
	}
}

sendFromLightWallet();