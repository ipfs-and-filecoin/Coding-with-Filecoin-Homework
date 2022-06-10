import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from "filecoin.js";
import BigNumber from "bignumber.js"

const glifNodeUrl = "https://dev.node.glif.io/calibrationapi/lotus/rpc/v0";
const glifNodeConnect = new HttpJsonRpcConnector({url:glifNodeUrl});

// 初始化glifClient对象
const glifClient = new LotusClient(glifNodeConnect);

// createLightWallet();
// Wallet Mnemonic:  entry spin blade mean express armor spray burger alcohol belt puzzle burst
// Encryped Wallet:  {"encSeed":{"encStr":"HYJYB3gniXVNWIqbuROCnupjwQmMSn2GBRVBwPy8l3L0ObLZGce3RlaeBfQdmM4bBFxzJngEWkOSEVrwl7ZipejZ7buRdPbF2KtXL0S1fp00yFxIzZr0jyYJXdmH5opa9Bs3SqYl1q6i1UZ3SLL+tLX+kbbvnnQVzGp3mfn66cCFXDlOYPThsQ==","nonce":"WM4BvRcE8bvyJTviVbziN4Snl9rzOhqJ"},"addresses":["t1bzhnc7ecxs3rjis6622ko4ynr3lamvnl2xoo27y"],"encPrivKeys":{"t1bzhnc7ecxs3rjis6622ko4ynr3lamvnl2xoo27y":{"key":"537PL2ENgE0hQVbsJ+Kj6LRxMhPKTxIhforlrAba966TttbVfq/PS7bfx7nupYsG","nonce":"leJ5l7zIFC80tWgpLiWgcPd+MnbG9uHv"}},"hdPathString":"m/44'/1'/0/0","salt":"abjgTTZ5D2IE/wWXvCJhsXmI1o8hTSykhrdcFEQiUEQ=","hdIndex":2,"version":1}
// Default Address:  t1bzhnc7ecxs3rjis6622ko4ynr3lamvnl2xoo27y
// 创建建一个轻钱包
async function createLightWallet() {
    try {
        const lightWallet = new LightWalletProvider(glifClient, ()=>{return '123456'}, 'test');
        const mnemonic = await lightWallet.createLightWallet('123456');
        console.log("Wallet Mnemonic: ", mnemonic);

        const encryptedWallet = lightWallet.keystore.serialize();
        console.log("Encryped Wallet: ", encryptedWallet);

        const defaultAddr = await lightWallet.getDefaultAddress();
        console.log("Default Address: ", defaultAddr);
    }
    catch(error) {
        console.log(error);
    }
}

sendBalanceLightWallet();
// 使用轻钱包转账
async function sendBalanceLightWallet() {
    try {
        // 使用助记词恢复轻钱包
        const mnemonic = "entry spin blade mean express armor spray burger alcohol belt puzzle burst";
        const lightWallet = new LightWalletProvider(glifClient, ()=>{return '123456'}, 'test');
        await lightWallet.recoverLightWallet(mnemonic, '123456');

        // 创建转账交易
        const message= await lightWallet.createMessage(
            {
                From: await lightWallet.getDefaultAddress(),
                To: 't1d746skawojyfh2xnxwpiwya5gidhwtvezih66si',
                value: new BigNumber(2000000000000000000)
            }
        );
        // console.log("message: ", message);
        // console.log(await lightWallet.keystore.serialize());

        // 签名交易
        const signedMsg = await lightWallet.signMessage(message);

        // 发送交易
        const msgCid = await lightWallet.sendSignedMessage(signedMsg);

        console.log("Send CID: ", msgCid);
    }
    catch(error) {
        console.log(error);
    }
}