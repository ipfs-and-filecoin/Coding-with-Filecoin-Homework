const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YoungNFT", function () {
  const price = ethers.utils.parseEther("0.001","ether");

  it("Can mint with sufficient funds", async function () {
    // arange
    const YoungNFT = await ethers.getContractFactory("YoungNFT");
    const youngNFT = await YoungNFT.deploy("1","2");
    await youngNFT.deployed();

    await youngNFT.setPrice(price);

    const user = await ethers.getSigner();
    // act
    const tx = await youngNFT.connect(user).mint({value: price});
    await tx.wait();
    // assert

    expect(await youngNFT.balanceOf(user.address)).to.be.equal(1);

  });

  it("Cannot mint with insufficient funds", async function () {
    const YoungNFT = await ethers.getContractFactory("YoungNFT");
    const youngNFT = await YoungNFT.deploy("1","2");
    await youngNFT.deployed();

    await youngNFT.setPrice(price);

    const user = await ethers.getSigner();
        
    await  expect(
       youngNFT.connect(user).mint()
    ).to.be.reverted;

  });
});
