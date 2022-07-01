const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CookingNFT", function () { 
  const price = ethers.utils.parseEther("0.001", "ether");

  it("Can mint with sufficient funds", async function () {
    const CookingNFT = await ethers.getContractFactory("CookingNFT");
    const cookingNFT = await CookingNFT.deploy();
    await cookingNFT.deployed();

    const user = await ethers.getSigner();
  
    const tx = await cookingNFT.connect(user).mint({value: price});
    await tx.wait();

    expect(await cookingNFT.balanceOf(user.address)).to.be.equal(1);

  });

  it("Cannot mint with sufficient funds", async function () {
    const CookingNFT = await ethers.getContractFactory("CookingNFT");
    const cookingNFT = await CookingNFT.deploy();
    await cookingNFT.deployed();

    const user = await ethers.getSigner();
  
    expect(cookingNFT.connect(user).mint({value: price})).to.be.reverted;
  });

});
