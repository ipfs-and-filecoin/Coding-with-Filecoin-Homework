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
        //ipfs://bafkreie4n6f4azto2tqnkl5ribmtmhvzchkkr6v3se5e5ucoxcu4dxfgcu
        const _tokenURI = "ipfs://bafkreie4n6f4azto2tqnkl5ribmtmhvzchkkr6v3se5e5ucoxcu4dxfgcu";
        //0xd7d3faccba91582a34f0397418311685fed5a33624ac4d6261e6557a6b3effbb
        const tx = await codingNFT.connect(user).mint(_tokenURI,{value:price});
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
        const _tokenURI = "ipfs://bafkreie4n6f4azto2tqnkl5ribmtmhvzchkkr6v3se5e5ucoxcu4dxfgcu";

        // assert
        expect(codingNFT.connect(user).mint(_tokenURI)).to.be.reverted;
    });
});
