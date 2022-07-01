const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("JintaoNFT-test", function () {
  const price = ethers.utils.parseEther("0.001", "ether");
  //it.only("Can mint with sufficient funds", async function () {
  //xit("Can mint with sufficient funds", async function () {
  it("Can mint with sufficient funds", async function () {
    // 部署合约
    const JintaoNFT = await ethers.getContractFactory("JintaoNFT");
    const jintaoNFT = await JintaoNFT.deploy();
    await jintaoNFT.deployed();

    const user = await ethers.getSigner();

    // 铸造NFT
    const tx = await jintaoNFT.connect(user).mint({value: price});
    await tx.wait();

    // assert
    expect(await jintaoNFT.balanceOf(user.address)).to.be.equal(1);
  });

  it("Cannot mint with sufficient funds", async function () {
    // 部署合约
    const JintaoNFT = await ethers.getContractFactory("JintaoNFT");
    const jintaoNFT = await JintaoNFT.deploy();
    await jintaoNFT.deployed();

    const user = await ethers.getSigner();

    // 铸造NFT
    await expect(
      jintaoNFT.connect(user).mint()
    ).to.be.reverted;
  });
});
