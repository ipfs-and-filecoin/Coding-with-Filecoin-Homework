import { HttpJsonRpcConnector, LotusClient, LightWalletProvider } from "filecoin.js";
import BigNumber from "bignumber.js";

const glifNodeUrl = "https://dev.node.glif.io/calibrationapi/lotus/rpc/v0";

const glifNodeConnection = new HttpJsonRpcConnector({url:glifNodeUrl});
const glifClient  = new LotusClient(glifNodeConnection);

// Create LightWallet
async function createLightWallet() {
    try {
        const lWallet = new LightWalletProvider(glifClient, () => {return 'testPws'}, 'test');
        const mnemonic = await lWallet.createLightWallet('testPws');
        console.log("mnemonic : ", mnemonic);

        const encryptedWallet = lWallet.keystore.serialize();
        console.log(encryptedWallet);
        console.log(await lWallet.getDefaultAddress());
    }catch (error) {
        console.log(error);
    }
}

// createLightWallet();

// The mnemonic is "snack dumb reward vivid weird deal else sponsor crush range armed power"
// The address is "t1o5doelpvfaquee24kehegyckq2h3qr2lkqsgyti"
// Send 1 fil bafy2bzacebjt4uamnbrud3ukpb6vpvpifpsc6yjgzmqedxtexasodtkg3q3je

// make transaction

//

const mnemonic = "snack dumb reward vivid weird deal else sponsor crush range armed power";


async function sendFromLightWallet(mnemonic){
    const lWallet = new LightWalletProvider(glifClient, () => {return 'testPws'}, 'test');
    await lWallet.recoverLightWallet(mnemonic,'testPws');
    console.log(await lWallet.getDefaultAddress());
    console.log(await lWallet.getBalance(await lWallet.getDefaultAddress()));

    const msg = await lWallet.createMessage({
        From: await lWallet.getDefaultAddress(),
        To : 't1ngvcv7lwflk3jic6b2hr2epjyrbtmrhmikwhlyy',
        Value : new BigNumber(10**17),
    });

    const signedMsg = await lWallet.signMessage(msg);
    const msgCid = await lWallet.sendSignedMessage(signedMsg);

    console.log(msgCid);
}

sendFromLightWallet(mnemonic);
// After Recovery the Address is also t1o5doelpvfaquee24kehegyckq2h3qr2lkqsgyti
// The transaction hash is bafy2bzacebcu3o4mtnvhqs27fswydtkikevkwlbisamzvfcukju4tdihrrero