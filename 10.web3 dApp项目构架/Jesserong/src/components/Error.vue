<template>
  <div class="error">
      <b-alert variant="danger" show>
        Failed to upload/download to IPFS via Web3.Storage. Make sure you have selected a file to upload.
      </b-alert>

      <b-button
        @click="$emit('update-error', false)"
        variant="danger"
      >
        Dismiss
      </b-button>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage'
}
</script>

<style >
</style>
