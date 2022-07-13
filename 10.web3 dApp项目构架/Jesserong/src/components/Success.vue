<template>
  <div>
    <b-card-text>
      <b-alert show variant="info">Files have been sent to Web3.Storage & IPFS successfully</b-alert>
      <ul> 
        <li><a :href="'http://localhost:8080/#/?downloadfileid=' + fileId" target="_blank">http://localhost:8080/#/?downloadfileid={{ fileId }}</a></li>
      </ul>
      <b-button
        @click="$emit('update-cids', [])"
        variant="primary"
      >
        Go Back
      </b-button>

      <br />
      <br />

      <b-button
        @click="withdraw(fileId)"
        variant="success"
      >
        Uploader Withdraw
      </b-button>
    </b-card-text>
  </div>
</template>

<script>

export default {
  name: 'SuccessPage',
  props: {
    fileId: Number
  },
  methods:{
    withdraw(fileId) {
      window.location.href = "/#/?fileId=" + fileId + "&isUploaderWithdraw=1";
      window.location.reload();
    }
  }
}

</script>

<style >
</style>
