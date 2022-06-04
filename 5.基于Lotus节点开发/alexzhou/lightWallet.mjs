import {HttpJsonRpcConnector, LotusClient, LightWalletProvider, MnemonicWalletProvider} from "filecoin.js";
import BigNumber from "bignumber.js";

const nodeUrl = "https://dev.node.glif.io/calibrationapi/lotus/rpc/v0";
const connector = new HttpJsonRpcConnector({url:nodeUrl});
const lotusClient = new LotusClient(connector);

/**
 * create new light wallet
 */
async function newLightWallet(password) {
    try {
        const lightWallet = new LightWalletProvider(lotusClient, ()=>{return password}, "test");
        let mnemonic = await lightWallet.createLightWallet(password);
        console.log("mnemonic: ", mnemonic);

        let encryptWallet = lightWallet.keystore.serialize();
        console.log(encryptWallet);

        const lightWalletAddress = await lightWallet.getDefaultAddress();
        console.log("Light Wallet Address: ", lightWalletAddress);
    } catch (e) {
        console.log(e);
    }
}

/**
 * transfer FIL between light wallets
 */
async function sendFromLightWallet(mnemonic, password, toAddress, amount) {
    try {
        // recover light wallet and get from wallet address
        const lightWallet = new LightWalletProvider(lotusClient, ()=>{return password}, "test");
        await lightWallet.recoverLightWallet(mnemonic, password);
        const lightWalletAddress = await lightWallet.getDefaultAddress();
        console.log("from wallet address is: ", lightWalletAddress);

        // create a FIL transfer message
        const message = await lightWallet.createMessage({
            From: lightWalletAddress,
            To: toAddress,
            Value: amount
        });

        // sign and send the message
        const signedMessage = await lightWallet.signMessage(message);
        const messageCid = await lightWallet.sendSignedMessage(signedMessage);
        console.log(messageCid);
    } catch (e) {
        console.log(e);
    }
}

function calculateFILBalance(amount) {
    return new BigNumber(amount * Math.pow(10, 18));
}

// homework
// If you want to get the mnemonic and password, please contract me, brishenzhou@qq.com
// messageid: bafy2bzacecqkmhi4khpq2iuvn3mbb34ptqnxv2riz2jmwfhbjpwevartane3a
const mnemonic = "XXX";
const password = "XXX";
const toAddress = "t1d746skawojyfh2xnxwpiwya5gidhwtvezih66si";
sendFromLightWallet(mnemonic, password, toAddress, calculateFILBalance(10));


