import { HttpJsonRpcConnector, LotusWalletProvider , LotusClient } from "filecoin.js"; 

//Node connect
const localNodeUrl   = "http://127.0.0.1:1234/rpc/v0";
//lotus auth create-token --perm admin
const adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBbGxvdyI6WyJyZWFkIiwid3JpdGUiLCJzaWduIiwiYWRtaW4iXX0.PHltWihrB-uwsRdsbEVqaYVua-HaQweK_b7VArJe2wM";
const httpConnector  = new HttpJsonRpcConnector({url:localNodeUrl,token:adminAuthToken});
const lotusClient    = new LotusClient(httpConnector);
const lotusWallet    = new LotusWalletProvider(lotusClient);

storeFile();

async function storeFile() {
	try {
		//1.导入需要保存的文件
		const importResult = await lotusClient.client.import({
			Path:"/mdata/lost+found/home/build-with-lotus/index.mjs",
			IsCAR:false,
		});
		console.log(importResult.Root);

		//2.想存储服务提供商询价
		//lotus client list-asks (查看存储服务提供商)
		const spAddr = 't022105';
		const queryOffer = await lotusClient.client.minerQueryOffer(spAddr,importResult.Root);

		console.log(queryOffer);

		const isValid = importResult.Root["/"] === queryOffer.Root["/"];
		if(isValid) {
			//3. 发起存储交易
			const dealCid = await lotusClient.client.startDeal({
				Data:{
					TransferType: 'graphsync',
					Root: importResult.Root,
				},
				Miner: spAddr,
				Wallet:await lotusWallet.getDefaultAddress(),
				EpochPrice:'200000000',
				MinBlocksDuration:518400,
			});

			//bafyreibs7nbparflpmvli3uaqtovv2niq4eyyjbsfvaxvbigwy3opt7yie
			console.log(dealCid);
		} else {
			await lotusClient.client.removeImport(importResult.ImportID);
		}

		//3.发起存储交易
	} catch (error) {
		console.log(error);
	}
}
