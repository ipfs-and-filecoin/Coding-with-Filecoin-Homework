

import { HttpJsonRpcConnector, LotusWalletProvider, LotusClient } from "filecoin.js"
import BigNumber from "bignumber.js";
import { config } from "./config.mjs"

const conn = new HttpJsonRpcConnector({ url: config.url, token: config.token });
const client = new LotusClient(conn);
const wallet = new LotusWalletProvider(client);

async function getWalletAccountFromTo() {
    try {
        const from =  await wallet.getDefaultAddress();
        const to = await wallet.newAddress(); 
        return {from: from, to: to};
    } catch (error) {
        console.log(error);
    }
}

async function transferFiL(from, to, value) {
    try {
        const msgResult = await wallet.sendMessage({
            From: from, To: to, value: value,
        });
        return msgResult;
    } catch (error) {
        console.log(error);
    }
}


async function queryBalance(account) {
    try {
        const balance = await wallet.getBalance(account);
        return balance;
    } catch (error) {
        console.log(error);
    }
}

const account = await getWalletAccountFromTo();
console.log("1. my wallet default/new(from/to): ", account.from, account.to);

const result = await transferFiL(account.from, account.to, new BigNumber(10000000000000000000))
console.log("2. transfer FIL message CID:", result.CID);

const fromBalance = await queryBalance(account.from);
const toBalance = await queryBalance(account.to);
console.log("3. account from balance:", account.from, fromBalance);
console.log("4. account to balance:", account.to, toBalance);

// console.log
// ❯ node lightWallet.mjs
// 1. my wallet default/new(from/to):  t1t66l2theuii4cmvbo4serwbr6fgrrye6xgqljfy t1xdztipm53zpdxxw76gpewwzedco76ucbtqbt6da
// 2. transfer FIL message CID: {
//   '/': 'bafy2bzacebxuc7mwlxsejelup4eljmeaz7ow4deubhl37awlm3szrwtvewnrg'
// }
// 3. account from balance: t1t66l2theuii4cmvbo4serwbr6fgrrye6xgqljfy 449999998619530296754
// 4. account to balance: t1xdztipm53zpdxxw76gpewwzedco76ucbtqbt6da 0