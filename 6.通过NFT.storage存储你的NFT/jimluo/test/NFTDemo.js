const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config({ debug: true })

async function deployNFTDemo() {
    const Demo = await ethers.getContractFactory("NFTDemo");
    const demo = await Demo.deploy();
    await demo.deployed();

    return demo;
}

describe("NFTDemo", function () {
    const price = ethers.utils.parseEther("0.001", "ether");

    it("Can mint with sufficient funds", async function () {
        // arrange
        const NFTDemo = await deployNFTDemo();
        const signer = await ethers.getSigner();

        // act
        const tx = await NFTDemo.connect(signer).mint(process.env.TOKEN_URI, { value: price });
        await tx.wait();

        const id = await NFTDemo.getTokenCount();

        // assert
        expect(id).to.be.equal(1);
    });

    it("Cannot mint with insufficient funds", async function () {
        // arrange
        const NFTDemo = await deployNFTDemo();
        const signer = await ethers.getSigner();

        // assert
        expect(NFTDemo.connect(signer).mint(process.env.TOKEN_URI)).to.be.reverted;
    });
});
