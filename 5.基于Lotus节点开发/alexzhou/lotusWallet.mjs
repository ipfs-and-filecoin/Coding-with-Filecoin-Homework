import {HttpJsonRpcConnector, LotusClient, LotusWalletProvider} from "filecoin.js";
import BigNumber from "bignumber.js";

// init lotus client & lotus wallet
const nodeUrl = "http://127.0.0.1:1234/rpc/v0";
const signAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.0jFieo5Oppy93JZdBL72ffgE79LjavjRDk9DcgUcOPM";
const connector = new HttpJsonRpcConnector({url:nodeUrl, token:signAuthToken});
const lotusClient = new LotusClient(connector);
const lotusWallet = new LotusWalletProvider(lotusClient);

/**
 * create new wallet
 */
async function newWallet() {
    try {
        const walletAddress = await lotusWallet.newAddress();
        const success = await lotusWallet.hasAddress(walletAddress);
        if (success) {
            console.log("new wallet address: ", walletAddress);
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * transfer FIL between wallets
 */
async function transferFIL(fromAddress, toAddress, amount) {
    try {
        const result = await lotusWallet.sendMessage({
            From: fromAddress,
            To: toAddress,
            Value: amount,
        });
        console.log("Message Result: ", result);
    } catch (e) {
        console.log(e);
    }
}

/**
 * get all wallet balance
 */
async function walletBalances() {
    try {
        const walletAddresses = await lotusWallet.getAddresses();
        walletAddresses.forEach(async(walletAddress) => {
            try {
                const balance = await lotusWallet.getBalance(walletAddress);
                console.log(walletAddress + "'s balance is " + balance);
            } catch(e) {
                console.log(e);
            }
        });
    } catch (e) {
        console.log(e);
    }
}

async function walletBalance(walletAddress) {
    try {
        try {
            const balance = await lotusWallet.getBalance(walletAddress);
            console.log(walletAddress + "'s balance is " + balance);
        } catch(e) {
            console.log(e);
        }
    } catch(e) {
        console.log(e);
    }
}

function calculateFILBalance(amount) {
    return new BigNumber(amount * Math.pow(10, 18));
}

// transfer FIL
const fromAddress = await lotusWallet.getDefaultAddress();
const toAddress = "t1ozh37mtqlpgxjixyepd2qafo6xokdqwxzn2he7y";
const amount = calculateFILBalance(60);
transferFIL(fromAddress, toAddress, amount);

