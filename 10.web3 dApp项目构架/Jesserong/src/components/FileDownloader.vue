<template>
  <div id="FileDownloader">
    <div  v-if="paid === false">
        <p> Pay some ether to download file #{{ downloadFileId }} </p>
        <b-button-group>
        <b-button
            v-if="address===null"
            variant="secondary"
            @click="requestAccount()"
        > 
            Connect wallet
        </b-button>

        <b-button
            v-if="address!==null"
            variant="primary"
            @click="downloadfile()"
        > 
            Make payment
        </b-button>
        </b-button-group>

        <p v-if="address!==null">Connected wallet {{ address[0] }}</p>
    </div>

    <div v-if="paid === true && cid !== null">
        <b-alert show variant="info">Payment verified, download file from IPFS from below link:</b-alert>
        <ul> 
        <li><a :href="'https://'+cid+'.ipfs.dweb.link'">https://{{ cid }}.ipfs.dweb.link</a></li>
        </ul>
    </div>

  </div>
</template>

<script>
  import Dwetransfer from '../../artifacts/contracts/Dwetransfer.sol/Dwetransfer.json'
  import { BigNumber, ethers } from "ethers";

  export default {
    name: "FileDownloader",
    props: {
        downloadFileId: String
    },
    data() {
      return {
        address: null,
        paid: false,
        cid: null
      }
    },
    methods: {

      async requestAccount() {
        var currentAccount = null;

        if(window.ethereum) {
          console.log("Metamask detected");
        } else {
          console.log("Metamask not detected...");
        }

        currentAccount = await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.address = currentAccount;
        
        console.log("Current Account :" + currentAccount);
      },

      async downloadfile() {
        //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractAddress = "0xA593E482c888b41EC5db83B78b1920D2e21A222A";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        try {
          const contract = new ethers.Contract(contractAddress, Dwetransfer.abi, signer);
            
          const file = await contract.files(BigNumber.from(this.downloadFileId));
          console.log(file.amount._hex);
          const amount = BigNumber.from(file.amount._hex);
          console.log(amount);
          const options = {value: amount};
          let tx = await contract.downloadFile(BigNumber.from(this.downloadFileId), options);
          let rc = await tx.wait();
          this.cid = rc.events[0].args["cid"]
          console.log("Contract executed successfully!")
          this.paid = true;
        } catch {
            this.$emit('update-error', true);
            console.log("Failed to execute contract!");
        }
      } 
    }
  }
</script>