// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  const CodingNFT = await ethers.getContractFactory("CodingNFT");
  const codingNFT = await CodingNFT.deploy();
  await codingNFT.deployed();

  //0x05b9FEAd5d7E4A60e8Cf8C82604949106311eb28
  console.log("CodingNFT deployed to:", codingNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
