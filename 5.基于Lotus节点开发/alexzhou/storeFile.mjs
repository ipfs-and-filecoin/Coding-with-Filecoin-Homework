import {HttpJsonRpcConnector, LotusClient, LotusWalletProvider} from "filecoin.js";
import BigNumber from "bignumber.js";

const nodeUrl = "http://127.0.0.1:1234/rpc/v0";
const adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.7RKE6e-qRIRRSynjSlsM7SaTv-5WGdVvrPHoRL_jqME";
const connector = new HttpJsonRpcConnector({url:nodeUrl, token:adminAuthToken});
const lotusClient = new LotusClient(connector);
const lotusWallet = new LotusWalletProvider(lotusClient);

async function importFile(filePath) {
    try {
        const result = await lotusClient.client.import({
            Path: filePath,
            IsCAR: false,
        });
        console.log(result.Root);
        return result;
    } catch (e) {
        console.log(e);
    }
    return null;
}

async function storeFile(miner, filePath, walletAddress, price) {
    try {
        const importResult = await lotusClient.client.import({
            Path: filePath,
            IsCAR: false,
        });
        console.log(importResult.Root);

        const queryOffer = await lotusClient.client.minerQueryOffer(miner, importResult.Root);
        console.log("Query Offer is ", queryOffer);

        const isActive = importResult.Root["/"] === queryOffer.Root["/"];
        console.log("Provider is active: ", isActive);

        if (isActive) {
           // store deal
           const dealCid = await lotusClient.client.startDeal({
               Data: {
                   TransferType: "graphsync",
                   Root: importResult.Root,
               },
               Miner: miner,
               Wallet: walletAddress,
               EpochPrice: price,
               MinBlocksDuration: 604800,
           });
           console.log("DealCID is: ", dealCid);
        } else {
           await lotusClient.client.removeImport(importResult.ImportID);
        }
    } catch(e) {
        console.log(e);
    }
}

// import local file
const filePath = "/data/books/Feng-Jun-Qi.pdf";
const miner = "t031765";
const walletAddress = await lotusWallet.getDefaultAddress();
const price = 0.001 * Math.pow(10, 18);

storeFile(miner, filePath, walletAddress, price);
