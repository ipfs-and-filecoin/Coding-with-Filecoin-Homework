// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  // 部署合约
  const JintaoNFT = await ethers.getContractFactory("JintaoNFT");
  const jintaoNFT = await JintaoNFT.deploy();
  await jintaoNFT.deployed();

  console.log("JintaoNFT deployed to:", jintaoNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
