const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CodingNFT", function () {
    const price = ethers.utils.parseEther("0.001","ether");

    it("Can mint with sufficient funds", async function () {
        // arrange
        const CodingNFT = await ethers.getContractFactory("CodingNFT");
        const codingNFT = await CodingNFT.deploy();
        await codingNFT.deployed();

        const user = await ethers.getSigner();

        // act
        //0xa0c9cf8649ccacc186b69fe29518680421b63ea4323f68af921eb7266bb8a7e3
        const tx = await codingNFT.connect(user).mint({value:price});
        await tx.wait();

        const id = await codingNFT.tokenCount();

        // assert
        expect(id).to.be.equal(1);
    });

    it("Cannot mint with insufficient funds", async function () {
         // arrange
        const CodingNFT = await ethers.getContractFactory("CodingNFT");
        const codingNFT = await CodingNFT.deploy();
        await codingNFT.deployed();

        const user = await ethers.getSigner();
        
        // assert
        expect(codingNFT.connect(user).mint()).to.be.reverted;
    });
});
