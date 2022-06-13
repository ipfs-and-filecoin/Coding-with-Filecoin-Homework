// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const {ethers} = require("hardhat");

async function main() {
  console.log(process.env.RPC_URL);
  // console.log(await ethers.getContractFactory("YoungNFT"));

  const YoungNFT = await ethers.getContractFactory("YoungNFT");
  console.log("Get YoungNFT Factory");
  const youngNFT = await YoungNFT.deploy("YoungNFT","YBABC");
  console.log("Deploying");
  await youngNFT.deployed();
  console.log("YoungNFT deployed to:", youngNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("damn");
    console.error(error);
    process.exit(1);
  });
