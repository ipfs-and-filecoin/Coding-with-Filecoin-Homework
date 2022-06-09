const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vip", function () {
  it("Can mint with sufficient funds", async function () {
    const Vip = await ethers.getContractFactory("Vip");
    const vip = await Vip.deploy();
    await vip.deployed();

    const user = await ethers.getSigner();

    const tx = await vip.connect(user).safeMint(user.address,"ipfs://bafkreihzojvee7sgfdsqcrm7oocectx2tvpe2sdfoxmpwnthaj4zwpc6y4");
    await tx.wait();

    expect(await vip.balanceOf(user.address)).to.be.equal(1);
  });
});
