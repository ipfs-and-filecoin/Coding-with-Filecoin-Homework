1. 在前端页面FileUploader.vue中添加了一个input框，uploader在上传文件时可自定义需要付多少ether；在下载页面中，downloader根据uploader自定义的价格进行付费，将付费的80%付给uploader，20%的手续费付给owner。

2. 添加了OwnerWithdraw.vue和UploaderWithdraw.vue两个取款页面。owner或uploader可调用页面的withdraw()方法实现取款。

3. 使用命令：npx hardhat run ./scripts/deploy.js --network kovan 将合约部署到testnet，然后修改文件中的contractAddress即可。

# Dwetransfer IPFS Demo App
This web application is created to demonstrate how Web3.storage can be used in a Ethereum smart contract powered Dapp. 

Check out the original non-smart contract version of this app in React.js [here](https://github.com/jenks-guo-filecoin/ipfs-filecoin-storage-demo). 

The project uses [Web3.Storage JS SDK](https://web3.storage/docs/reference/js-client-library/#examples) to interact with IPFS & persist data on Filecoin. 

This project was bootstrapped with [VueBootstrap version 3](https://bootstrap-vue.org/).

A quick demo: 
![Jul-02-2022 06-01-52](https://user-images.githubusercontent.com/100632895/176961535-55fb6647-3952-4649-bd27-76deb0a0c908.gif)

## How does it work?
The single page Vue.js application will take one or more files uploaded via a HTML form and use the client.put(files) method provided by web3.storage SDK to upload them to IPFS & filecoin. The application has a Ethereum smart contract writen in solidity, it take payment before uploading and downloading so developer & file uploader can withdraw later. 

Upon successful payment. The app will present a download link with file ID to uploader to share with downloader. The downloader, once paid, will retrieve the dweb.link powered IPFS CID link to download. 

There can be multiple uploaders and downloaders in this app. 

## Before you run

### Setup Web3.Storage API key

Signup with Web3.Storage
[Create an account](https://web3.storage/login/) with Web3.Storage by one click: 
<img width="876" alt="Screen Shot 2022-05-17 at 4 27 03 pm" src="https://user-images.githubusercontent.com/100632895/168743504-58a88b19-4da3-4425-a04a-818d50274aee.png">

[Get an API key](https://web3.storage/tokens/) from Web3.Storage: 
<img width="666" alt="Screen Shot 2022-05-17 at 4 32 09 pm" src="https://user-images.githubusercontent.com/100632895/168744279-76434209-b2fe-4b9b-b22d-426aed8a8e42.png">

Create a `.env` under `/dwetransfer` directory and populate it with your Web3.Storage as such: 

```shell
    REACT_APP_WEB3STORAGE_API_TOKEN={YOUR_API_TOKEN}
```

### Setup harhat development environment & Metamask
Navigate to `/dwetransfer` directory,  


Install ether.js & hardhat: 

`npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers`

Compile the solidity contract:

`npx hardhat compile`

You should see following as response: 

```shell
Compiled 1 Solidity file successfully
```

Start a local hardhat node: 

`npx hardhat node`

You will see a list of wallet addresses and their private keys, keep a list of these private keys, we will need to use them later. 

```shell
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========

WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.

Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d23xxxxxxxxxxxxxxxxxxxcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0xxxxxxxxxxxxxxxxxxxxxxxxx4603b6b78690d

Account #2: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
Private Key: 0x5de4111afa1a4b94908f83103ebxxxxxxxxxxxxxxxxxxxxx3fb9a804cdab365a

Account #3: 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
Private Key: 0x7c852118294e51e653712a81e0xxxxxxxxxxxxxxxxxxxxx371e15141b007a6

...

```

Now to go your Metamask browser extension, if you don't have one, install from [here](https://metamask.io/download/). 

Enable test networks by going to top right hand side account icon > Settings > Advanced > toggle on "Show test networks"

![image](https://user-images.githubusercontent.com/100632895/176964175-fff7b970-ffd5-44bf-ae73-721820635138.png)

Then switch from "Mainnet" to "Localhost 8485".

![image](https://user-images.githubusercontent.com/100632895/176964421-4523cade-5557-4a1f-bfa5-599177ef8e18.png)


Copy one or two of the private key from your hardhat node terminal, use "Import Account" function to import account 2 and account 3. 

![image](https://user-images.githubusercontent.com/100632895/176964311-b2276a24-845e-4427-bbdd-c1d388628ac4.png)

If you see Account 2 with 1000 ETH in it, then you are all set. 

Now use the script in the `./scripts/` directory to deploy your smart contract to localhost: 

`npx hardhat run ./scripts/deploy.js --network localhost`

If the deployment was successful you should see the following in the current terminal: 

```shell
Compiled 1 Solidity files successfully
Dwetransfer deployed to: 0x0165878A594ca255338adfa4d48449f69242Eb8F

```
and, the following in the hardhat node terminal: 

```shell
 Contract deployment: Dwetransfer
  Contract address:    0xe7f1725e7734ce288f8367e1bb143e90bb3f0512
  Transaction:         0x45a9dbd0a73d49465792328ae73c77a4fffa1d548fb094ac7009cca3138de8c5
  From:                0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
  Value:               0 ETH
  Gas used:            904159 of 904159
  Block #14:           0x91af8f39c7da1ae2637e4f301763f5112fc6fe2949c2986db51d183b517f62a8
```

Take a note of the deployed contract address, and put them in FileUploader.vue and FileDownloader.vue accordingly where it says: 

`const contractAddress = "xxxxxxx";`

Now you are all good to run and test the project. 

### Build and run Vue.js project
You can install project dependencies by running: 

`yarn` or `npm install`

![Screen Shot 2021-12-10 at 8 35 44 pm](https://user-images.githubusercontent.com/47976069/145551892-88ed76aa-2006-4729-90c0-467626f36258.png)

##  To run the application
Navigate to /dtransfer directory, ensure you still have the localnode running:

`npx hardhat node`

This will start a localhost ethereum node and allow your metamask and application to talk to localhost:8545 for interactions with the local chain.

`npm run serve` 

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

You will also see any lint errors in the console.

### thoughts on deployments

The frontend of the applicaiton can be deployed to IPFS via Fleek.

The smart contract can be deployed to testnet for a better experience. 

## Feature backlog
If I had more time, I would work on:  
- [ ] add "Email to:" & "Sent from:" email inputs, and integrate with an email service to send an email 
- [ ] make owner withdraw page
- [ ] make uploader withdraw page

## Development Challenges
- it was really hard to work with local hardhat development environment
- using Remix to validate the smart contract was really time saving