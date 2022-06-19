import { HttpJsonRpcConnector, LightWalletProvider, LotusClient } from "filecoin.js"
import BigNumber from "bignumber.js";
import { config } from "./config.mjs"

// export NODE_OPTIONS=--openssl-legacy-provider  # for new nodejs version
const glifNodeConnection = new HttpJsonRpcConnector({ url: config.glifNodeUrl });
const glifClient = new LotusClient(glifNodeConnection);

async function createLightwallet() {
    try {
        const lightWallet = new LightWalletProvider(glifClient, () => { return config.glifPwd }, 'test');
        const mnemonic = await lightWallet.createLightWallet(config.glifPwd);
        const from = await lightWallet.getDefaultAddress();
        // const to = await lightWallet.newAddress();
        return { wallet: lightWallet, mnem: mnemonic, from: from };//, to: to};
        // const encryptedWallet = lightWallet.keystore.serialize();
    } catch (error) {
        console.log(error);
    }
}

async function sendFromLightWallet(mnemonic, from, to, value) {
    try {
        const wallet = new LightWalletProvider(glifClient, () => { return config.glifPwd }, 'test');
        await wallet.recoverLightWallet(mnemonic, config.glifPwd);
        const message = await wallet.createMessage({
            From: from, To: to, Value: value
        });
        const signedMessage = await wallet.signMessage(message);
        const msgCid = await wallet.sendSignedMessage(signedMessage);
        return msgCid;
    } catch (error) {
        console.log(error);
    }
}


const wallet = await createLightwallet();
console.log("1. create wallet mnemonic:", wallet.mnem);
console.log("2. create wallet from/to:", wallet.from);//, wallet.to);

const fromAccount = "t1efti56cnu4vbugmwir3ge4kvcpvwasksdivf7qq"
const toAccount = "t1d746skawojyfh2xnxwpiwya5gidhwtvezih66si"

const cid = await sendFromLightWallet("water intact ten act lizard toe capable once inspire peace napkin bullet",
    fromAccount, toAccount, new BigNumber(10000000000000000000));
// const cid = await sendFromLightWallet(wallet.mnem, 
//    wallet.from, wallet.to, new BigNumber(10000000000000000000));
console.log("3. transaction  cid:", cid);
// console.log
// ❯ node lightWallet.mjs
// 1. create wallet mnemonic: second path expire polar term stadium wink celery clarify effort obscure release
// 2. create wallet from/to: t1sfnhgry7dnsrds2ww6qci2gt22naj4rktgdyqaa3. transaction  cid: {
//     '/': 'bafy2bzacea3mypsc5c6u532ntdw2eqhtfwwkn7m3whxfh3mjeqbav3uo3mtim'
//   }