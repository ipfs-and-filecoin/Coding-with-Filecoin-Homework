// mint
const {ethers, network} = require("hardhat");

const addr = "0x3EEdBD22944dE49b5E799e173A832Fb5153b8333"
async function main() {
    const [owner] = await ethers.getSigners();

    const vip = await ethers.getContractAt("Vip",addr,owner)

    const tx = await vip.safeMint("0x90416C718De638f7C1387e2980C870BCBD98062E","ipfs://bafkreiccjuirxer2ajctcjsj762vhgrfhm7kkm7sq6wuun63oirwlq4f2m")
    console.log("tx:",tx)
}

main()
.then(()=> process.exit(0))
.catch(error=>{
    console.error(error);
    process.exit(1);
});