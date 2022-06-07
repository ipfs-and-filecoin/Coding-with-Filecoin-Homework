import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from "filecoin.js";
import BigNumber from "bignumber.js";

const localNodeUrl = "http://127.0.0.1:1234/rpc/v0";;
const adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.-7XkeXyEg2Lk5uSMBa9ZoqhcBCl8rmnIrsB4dPnSh8o";
const httpConnector = new HttpJsonRpcConnector({url:localNodeUrl,token:adminAuthToken});

const lotusClient = new LotusClient(httpConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);

async function storeFile(){
    try {
        // 1. import file
        const importResult = await lotusClient.client.import({
            Path : "/home/young/data/projects/blockchain/ipfs/build-with-lotus/young",
            IsCAR : false,
        });
        console.log(importResult.Root);
        
        // 2. query price
        const spAdd = 't035561';
        const queryOffer = await lotusClient.client.minerQueryOffer(spAdd,importResult.Root);
        console.log(queryOffer);

        const isValid = importResult.Root["/"] === queryOffer.Root["/"];

        if (isValid) {
        // 3. store tx
            const dealCid = await lotusClient.client.startDeal({
                Data: {
                    TransferType: 'graphsync',
                    Root: importResult.Root,
                },
                Wallet : await lotusWallet.getDefaultAddress(),
                Miner: spAdd,
                EpochPrice: '600000000',
                MinBlocksDuration: 518400,
            });
            console.log("DealCid",dealCid)
        }else{
            await lotusClient.client.removeImport(importResult.ImportID);
        }
    } catch (error) {
        console.log(error);
    }
}

storeFile()

// FileRoot : bafk2bzacebbmycu4q2siubkbvkxdrw2mi2llhjkrdckzm4rdvk2o5h4mro3xo
// DealCid : bafyreifvtgfc5uvnvmt3n34zfo4ppk2fb2o6aegwa4sgivemleup37a7oy