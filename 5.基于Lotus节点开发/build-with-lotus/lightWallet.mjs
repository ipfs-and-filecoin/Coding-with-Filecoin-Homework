import { HttpJsonRpcConnector, LightWalletProvider, LotusClient } from "filecoin.js"
import BigNumber from "bignumber.js"

// Node connect
const glifNodeUrl = "https://calibration.node.glif.io"
const glifNodeConnection = new HttpJsonRpcConnector({ url: glifNodeUrl })
const glifClient = new LotusClient(glifNodeConnection)

// Create light wallet
async function createLightWallet() {
    try {
        const lightWallet = new LightWalletProvider(glifClient, () => { return 'testPwd' }, 'test')
        const mnemonic = await lightWallet.createLightWallet('testPwd')
        console.log("mnemonic", mnemonic)
        const encryptedWallet = lightWallet.keystore.serialize();
        console.log("encryptedWallet: ", encryptedWallet)
        console.log("lightWallet by default address: ", await lightWallet.getDefaultAddress())
    } catch (error) {
        console.log(error)
    }
}

// createLightWallet()

// Transaction by light wallet
async function sendFromLightWallet() {
    try {
        const mnemonic = "appear treat coffee stand prison need cattle filter famous machine raven wonder"
        const lightWallet = new LightWalletProvider(glifClient, () => { return 'testPwd' }, 'test');
        await lightWallet.recoverLightWallet(mnemonic, 'testPwd');

        // tranfer
        const message = await lightWallet.createMessage({
            From: await lightWallet.getDefaultAddress(),
            To: "t1iuhonnn63aup7ejng7tlc7nhadnwulhl6v3ohha",
            Value: new BigNumber(4000000000000000000),
        })

        // sign & send
        const signMessage = await lightWallet.signMessage(message)
        const msgCID = await lightWallet.sendSignedMessage(signMessage)
        console.log("message CID: ", msgCID)
    } catch (error) {
        console.log(error)
    }
}
sendFromLightWallet()