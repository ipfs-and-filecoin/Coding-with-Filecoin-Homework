import { HttpJsonRpcConnector, LotusClient, LotusWalletProvider } from "filecoin.js";


// Node Connect
const localNodeUrl = "http://192.168.11.49:1234/rpc/v0";
const adminAuthToken = "eyahbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.tyuW6_c4NRer2K-7fVCMbVFHpGN41pA_ggpN1oX9rl0";
const httpConnector = new HttpJsonRpcConnector({ url: localNodeUrl, token: adminAuthToken });
const lotusClient = new LotusClient(httpConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);


// Store file deal
async function queryAsk() {
    try {
        const miner = "t035925"
        const peerID = "12D3KooWFGSuLt3vjVFtJwJfkinosRhPH7vKi62aLWPPfgQyk7of"
        const queryAsks = await lotusClient.client.queryAsk({ miner: miner, peerId: peerID })
        console.log("query asks: ", queryAsks)
    } catch (error) {
        console.log(error)
    }
}
queryAsk()