import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from "filecoin.js";
import BigNumber from "bignumber.js";

const glifNodeUrl = "https://dev.node.glif.io/calibrationapi/lotus/rpc/v0";
const glifNodeConnector = new HttpJsonRpcConnector({url:glifNodeUrl});
const glifClient = new LotusClient(glifNodeConnector);

// Create a light wallet
async function createLightWallet(){
    try {
        console.log('start');
        const lightWallet = new LightWalletProvider(glifClient, ()=>{return 'testPwd'}, 'test');
        const mnemonic = await lightWallet.createLightWallet('testPwd');
        console.log("mnemonic: ", mnemonic);

        const encryptedWallet = lightWallet.keystore.serialize();
        console.log(encryptedWallet);

        console.log(await lightWallet.getDefaultAddress());
    } catch (error) {
        console.log(error);
    }
}

//createLightWallet();

// User the light wallet to send FIL
async function sendFromLightWallet(){
    try {
        const mnemonic = "nose cover equal feature announce slow until soldier rural urban edit chronic";
        const lightWallet = new LightWalletProvider(glifClient, ()=>{return 'testPwd'}, 'test');
        await lightWallet.recoverLightWallet(mnemonic, 'testPwd');
        console.log(await lightWallet.getBalance("t13ogqz7oawv3e56htj2xbocge653svv7vwizs5aq"));
        // create tx
        const message = await lightWallet.createMessage({
            From: await lightWallet.getDefaultAddress(),
            To: "t1d746skawojyfh2xnxwpiwya5gidhwtvezih66si",
            Value: new BigNumber(1000000000000000000)
        });

        // sign tx & send
        const signedMessage = await lightWallet.signMessage(message);
        const msgCid = await lightWallet.sendSignedMessage(signedMessage);
        console.log(msgCid);
    } catch (error) {
        console.log(error);
    }
}

sendFromLightWallet();