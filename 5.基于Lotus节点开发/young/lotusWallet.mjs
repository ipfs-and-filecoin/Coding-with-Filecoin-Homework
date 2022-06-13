import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from "filecoin.js";
import BigNumber from "bignumber.js";

const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";;
const signAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIl19.5wQmi53TB420_zkjnqCCYzFPsGLgJ5WTS8y18DTeX48";
const httpConnector = new HttpJsonRpcConnector({url:localNodeUrl,token:signAuthToken});
const lotusClient = new LotusClient(httpConnector);

const lotusWallet = new LotusWalletProvider(lotusClient);

// create Wallet
async function createWallet(){
    try{
        const account = await lotusWallet.newAddress();
        return account
    } catch (error){
        console.log(error);
    }
}

const newWalletAddr = await createWallet();
console.log("new Wallet Address : ", newWalletAddr);

// make transaction
async function transferFil(toAddr,fromAddr,amount){
    try{
        const res = await lotusWallet.sendMessage(
            {
                From : fromAddr,
                To : toAddr,
                Value : amount,
            }
        )
        return res.CID;
    } catch (error){
        console.log(error);
    }
}

const toAddr = newWalletAddr;
const fromAddr = await lotusWallet.getDefaultAddress();
console.log("The default Address : "+ fromAddr); 
const txCID = await transferFil(
    toAddr,
    fromAddr,
    new BigNumber(10**16),
    );

console.log("Transaction CID is ",txCID['/']);

// query balance
async function getWalletBalance(addr){
    try{
        const balance = await lotusWallet.getBalance(addr)
        return balance;
    } catch (error){
        console.log(error);
    }
}

const balance = await getWalletBalance(fromAddr);
console.log(balance);
