<style type="text/css">
  .inputAmount {
    width: 100%;
    height: 38px;
    margin-top: 14px;
    padding-left: 11px;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
</style>
<template>
  <div id="FileUploader">
    <b-form-file
      v-model="files"
      v-if="address!==null"
      :state="Boolean(files)"
      placeholder="Choose a file or drop it here..."
      :multiple="true"
    ></b-form-file>

    <input v-if="address!==null" class="inputAmount" @input="print($event.target.value)" type='text' placeholder="Please enter how much ether is required"  />

    <br />
    <br />

    <b-button-group v-if="sending===false">
      <b-button
        v-if="address===null"
        variant="secondary"
        @click="requestAccount()"
      > 
        Connect My Wallet
      </b-button>


      <b-button
        v-if="address!==null"
        variant="primary"
        @click="uploadFile(files)"
      > 
        Upload via IPFS
      </b-button>
      
    </b-button-group>

    <br />
    <br />

    <b-button-group>
      <b-button
        v-if="address!==null"
        variant="success"
        @click="ownerWithdraw()"
      > 
        Owner Withdraw
      </b-button>
      
    </b-button-group>

    <p v-if="address!==null && sending===false">Connected wallet: {{ address[0] }}</p>

    <div v-if="sending===true">
      <b-spinner label="Spinning"></b-spinner>
      <b-card-text>Sending to IPFS</b-card-text>
    </div>

  </div>
</template>

<script>
  import { Web3Storage } from 'web3.storage';
  import Dwetransfer from '../../artifacts/contracts/Dwetransfer.sol/Dwetransfer.json'
  import { BigNumber, ethers } from "ethers";
  const VUE_APP_WEB3STORAGE_API_TOKEN = process.env.VUE_APP_WEB3STORAGE_API_TOKEN;

  export default {
    name: "FileUploader",
    data() {
      return {
        files: null,
        sending: false,
        address: null,
        fileId: null,
        amount:0
      }
    },
    methods: {
      print(e) {
        this.amount = e;
      },

      ownerWithdraw() {
        window.location.href = "/#/?isOwnerWithdraw=1";
        window.location.reload();
      },

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

      async uploadFile(files) {
        console.log(files);
        
        if(!this.amount) {
          alert('Please enter the correct amount.');
          return;
        }

        const client = new Web3Storage({ token: VUE_APP_WEB3STORAGE_API_TOKEN });

        //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractAddress = "0xA593E482c888b41EC5db83B78b1920D2e21A222A";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        try {
          const contract = new ethers.Contract(contractAddress, Dwetransfer.abi, signer)
          const amount = ethers.utils.parseEther(this.amount.toString());
          const options = {value: amount};
          let rootCid = "";

          
          try {
              this.sending = true;
              rootCid = await client.put(files);
              console.log("Successfully sent to IPFS");
              console.log("rootCid :" + [rootCid]);
          } catch(err) {
            this.sending = false;
            this.$emit('update-error', true);
            console.log(err);
            console.log("Failed to send file... ");
          }

          let tx = await contract.uploadFile(rootCid,options);
          let rc = await tx.wait();
          let BigNumberFileIdHex = rc.events[0].args["fileId"]._hex;
          this.fileId = BigNumber.from(BigNumberFileIdHex).toNumber();
          console.log(tx);
          console.log("rc:");
          console.log(rc);
          console.log(rc.events[0].args["fileId"]._hex);
          console.log("fileId");
          console.log(this.fileId);

          this.sending = false;
          this.$emit('update-fileid', this.fileId);
          this.$emit('update-cids', [rootCid]);
          console.log("contract executed successfully!")
          console.log("https://localhost:8080/download/" + this.fileId);
          
            
        } catch {
            this.$emit('update-error', true);
            console.log("Failed to execute contract!");
        }
      } 
    }
  }
</script>