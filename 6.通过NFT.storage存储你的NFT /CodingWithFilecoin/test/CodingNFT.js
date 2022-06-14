const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CodingNFT", function () {
  const price = ethers.utils.parseEther("0.001", "ether");

  it("Can mint with sufficient funds", async function () {
    // arrange
    const CodingNFT = await ethers.getContractFactory("CodingNFT");
    const codingNFT = await CodingNFT.deploy();
    await codingNFT.deployed();

    const user = await ethers.getSigner();

    // act
    const tx = await codingNFT.connect(user).mint({value: price});
    await tx.wait();

    // assert
    expect(await codingNFT.balanceOf(user.address)).to.be.equal(1);
  });

  it("Cannot mint with insufficient funds", async function () {
    // arrange
    const CodingNFT = await ethers.getContractFactory("CodingNFT");
    const codingNFT = await CodingNFT.deploy();
    await codingNFT.deployed();

    const user = await ethers.getSigner();

    // assert
    await expect(
      codingNFT.connect(user).mint()
    ).to.be.reverted;
  });
});
