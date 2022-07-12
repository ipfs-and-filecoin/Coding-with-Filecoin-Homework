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
  <div>
    
    <input v-if="address!==null" class="inputAmount" @input="print($event.target.value)" type='text' placeholder="Please enter the amount to be withdrawn."  />

    <br />
    <br />

    <b-button-group>
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
        @click="withdraw()"
      > 
        Withdraw
      </b-button>
      
    </b-button-group>

    <p v-if="address!==null">Connected wallet: {{ address[0] }}</p>

  </div>
</template>

<script>
  import Dwetransfer from '../../artifacts/contracts/Dwetransfer.sol/Dwetransfer.json'
  import { ethers } from "ethers";

  export default {
    name: "OwnerWithdraw",
    data() {
      return {
        address: null,
        amount:0
      }
    },
    methods: {
      print(e) {
        this.amount = e;
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

      async withdraw() {
        if(!this.amount) {
          alert("Please enter the amount to be withdrawn.");
          return;
        }

        //const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractAddress = "0xA593E482c888b41EC5db83B78b1920D2e21A222A";
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        try {
          const contract  = new ethers.Contract(contractAddress, Dwetransfer.abi, signer)
          const amount    = ethers.utils.parseEther(this.amount.toString());
          const options   = {value: amount};
          
          
          const ownerAddress = await contract.owner_address();
          console.log(ownerAddress);
          console.log(this.address[0]);
          if(this.address[0].toLowerCase() !== ownerAddress.toLowerCase()) {
            alert("You are not owner.");
            return;
          }

          let tx = await contract.ownerWithdraw(amount,options);
          await tx.wait();
        } catch(err) {
            console.log(err);
            console.log("Failed to execute contract!");
        }
      }
    }
  }
</script>