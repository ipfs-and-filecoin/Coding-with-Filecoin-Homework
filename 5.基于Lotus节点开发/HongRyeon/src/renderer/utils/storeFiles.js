import { info, error } from 'electron-log';
import { HttpJsonRpcConnector, LotusClient, LotusWalletProvider } from 'filecoin.js';
import key from '@/assets/key.json';
// import fs from 'fs';

const localNode = key.LOTUS_ENDPOINT;
const adminAuthToken = key.LOTUS_TOKEN;
const localConnector = new HttpJsonRpcConnector({ url: localNode, token: adminAuthToken });
const lotusClient = new LotusClient(localConnector);
const lotusWallet = new LotusWalletProvider(lotusClient);

async function getBalance() {
  try {
    lotusWallet.getBalance('f1ypzjatyuzbwfifk3glsaghcktskpub23udz6rkq').then((res) => {
      info(res);
    }).catch((err) => {
      error(err);
    });
  } catch (err) {
    error(err);
  }
}

async function storeFile() {
  // const filePath = '/yamato/Writing/魏书.pdf';
  // fs.stat(filePath, (err, stats) => {
  //   if (err) {
  //     info(err);
  //   } else {
  //     info(stats);
  //   }
  // });
  try {
    // 1. 导入需要保存的文件
    const importResult = await lotusClient.client.import({
      Path: '/hongryeon/魏书.pdf',
      IsCAR: false,
    });
    info(importResult.Root);

    // 2. 想存储服务提供商询价
    const spAdd = 't035577';
    // const spAdd = 't034062';
    // const queryOffer = await lotusClient.client.minerQueryOffer(spAdd, importResult.Root);
    // info(queryOffer);

    // const isValid = importResult.Root['/'] === queryOffer.Root['/'];
    info(importResult.Root['/']);
    const isValid = true;
    if (isValid) {
      // 3. 发起存储交易
      const dealCid = await lotusClient.client.startDeal({
        Data: {
          TransferType: 'graphsync',
          Root: importResult.Root,
        },
        Miner: spAdd,
        Wallet: await lotusWallet.getDefaultAddress(),
        EpochPrice: '200000000', // TODO 计算价格
        MinBlocksDuration: 518400,
      });
      info(dealCid);
    } else {
      await lotusClient.client.removeImport(importResult.ImportID);
    }
  } catch (err) {
    error(err);
  }
}

export { getBalance, storeFile };
