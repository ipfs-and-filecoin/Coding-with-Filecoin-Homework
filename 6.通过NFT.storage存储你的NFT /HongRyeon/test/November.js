const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("November", function () {
  const price = ethers.utils.parseEther("0.001", "ether")
  it("Can mint with sufficient funds", async function () {
    // arrange
    const NovemberNFT = await ethers.getContractFactory("November");
    const novemberNFT = await NovemberNFT.deploy();
    await novemberNFT.deployed();

    const user = await ethers.getSigner();

    // act
    const tx = await novemberNFT.connect(user).mint({ value: price });
    await tx.wait();
    
    // assert
    expect(await novemberNFT.balanceOf(user.address)).to.be.equal(1);
  });

  it("Cannot mint with insufficient funds", async function () {
    const NovemberNFT = await ethers.getContractFactory("November");
    const novemberNFT = await NovemberNFT.deploy();
    await novemberNFT.deployed();

    const user = await ethers.getSigner();
    
    await expect(
      novemberNFT.connect(user).mint()
    ).to.be.reverted;
  })
});
