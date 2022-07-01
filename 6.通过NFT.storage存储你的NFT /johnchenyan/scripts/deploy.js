// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async  function main() {
  const CookingNFT = await ethers.getContractFactory("CookingNFT");
  const cookingNFT = await CookingNFT.deploy();
  await cookingNFT.deployed();

  console.log("CookingNFT deployed to:", cookingNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
