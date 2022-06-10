<template>
  <div id="wrapper">
      Hash
      <input id="get-balance" type="button" value="Test Me!!!" @click="handleGetBalance"/><br/>
  </div>
</template>

<script>
import { storeFile } from '@/utils/index';

export default {
  created() {
    // console.log('a=', a);
  },
  methods: {
    handleGetBalance() {
      // getBalance();
      // this.$log.info(storeFile);
      storeFile();
    },
  },
};
</script>

<style>

</style>