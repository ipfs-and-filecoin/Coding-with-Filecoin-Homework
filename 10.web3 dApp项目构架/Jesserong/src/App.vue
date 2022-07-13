<template>
  <div id="app">
      <b-container>
        <b-card
          id="uploadcard"
          style="max-width: 30rem;"
          padding=40
        >
        <b-card-img :src="require('./assets/dwetransfer-logo.png')" />
        <b-card-title>WeTransfer in the Web 3.0</b-card-title>

        <FileUploader 
          v-if="
            error === false && 
            cids.length === 0 && 
            sending === false &&
            downloadFileId === undefined &&
            isUploaderWithdraw === undefined &&
            isOwnerWithdraw === undefined
            "
            @update-cids="updateCids" @update-fileid="updateFileId" @update-error="updateError" 
        />
        <Success
          v-if="
            cids.length !== 0
            "
            @update-cids="updateCids"
            :fileId="fileId"
        />
        <Error 
          v-if="
            error === true
            " 
            @update-error="updateError"
        />
        <FileDownloader
          v-if="
            downloadFileId !== undefined &&
            error === false
            "
          :downloadFileId="downloadFileId"
          @update-error="updateError"
        /> 

        <UploaderWithdraw 
          v-if="
            isUploaderWithdraw != '' && 
            fileId != null &&
            isOwnerWithdraw === undefined && 
            isUploaderWithdraw != undefined
          "
        />

        <OwnerWithdraw 
          v-if="
            isOwnerWithdraw != '' && 
            isUploaderWithdraw === undefined && 
            isOwnerWithdraw != undefined
          "
        />
        <br/>

        </b-card>
      </b-container>
  </div>
</template>

<script>
import FileUploader from "./components/FileUploader.vue";
import Success from "./components/Success.vue";
import Error from "./components/Error.vue";
import FileDownloader from "./components/FileDownloader.vue";
import UploaderWithdraw from "./components/UploaderWithdraw.vue";
import OwnerWithdraw from "./components/OwnerWithdraw.vue";

export default {
  name: 'App',
  mounted() {
    this.downloadFileId = this.$route.query.downloadfileid;
    this.isUploaderWithdraw = this.$route.query.isUploaderWithdraw;
    this.fileId = this.$route.query.fileId;
    this.isOwnerWithdraw = this.$route.query.isOwnerWithdraw;
  },
  components: {
    FileUploader,
    Success,
    Error,
    FileDownloader,
    UploaderWithdraw,
    OwnerWithdraw
  },
  data() {
    return {
      cids: [],
      fileId: null,
      sending: false,
      error: false,
      downloadFileId: null,
      isUploaderWithdraw:null,
      isOwnerWithdraw:null
    }
  },
  methods: {
    updateCids(c) {
      this.cids = c
    },
    updateFileId(i) {
      this.fileId = i
    },
    updateError(e) {
      this.error = e
    }
  }
}
</script>

<style>
#app {
  background-image: url('./assets/background.jpg');
  padding: 25px
}

#uploadcard {
  margin: 25px
}
</style>
