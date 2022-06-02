import { HttpJsonRpcConnector, LotusClient, LotusWalletProvider } from "filecoin.js";
import BigNumber from "bignumber.js";

// Node Connect
const localNodeUrl = "http://192.168.11.49:1234/rpc/v0";
const signAuthToken = "eyahbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.bmxNyqi3rhD7WniltVkZBS4Ik7a1ahQW2AFqu41fJ9E";
const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: signAuthToken });
const lotusClient = new LotusClient(httpConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);


// Create wallet address
async function newWallet() {
    try {
        const account = await lotusWallet.newAddress();
        console.log(account);
    } catch (error) {
        console.log(error);
    }
}
// Transaction
async function transfterFIL() {
    try {
        const fromAdd = await lotusWallet.getDefaultAddress();
        const toAdd = "t1iuhonnn63aup7ejng7tlc7nhadnwulhl6v3ohha"

        const msgResult = await lotusWallet.sendMessage({
            From: fromAdd,
            To: toAdd,
            value: new BigNumber(50000000000000000000),
        })
        console.log("message CID: ", msgResult.CID);
    } catch (error) {
        console.log(error);
    }
}
// Get balance
async function walletBalance() {
    try {
        const balance = await lotusWallet.getBalance("t1iuhonnn63aup7ejng7tlc7nhadnwulhl6v3ohha");
        console.log(balance);
    }
    catch (error) {
        console.log(error);
    }

}

// newWallet();
// transfterFIL();
walletBalance();