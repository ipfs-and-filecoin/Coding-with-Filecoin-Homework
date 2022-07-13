const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Dwetransfer = await ethers.getContractFactory("Dwetransfer");
    const dwetransfer = await Dwetransfer.deploy();
    await dwetransfer.deployed();

    expect(await dwetransfer.getFileId()).to.equal(0);

    const setGreetingTx = await dwetransfer.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
