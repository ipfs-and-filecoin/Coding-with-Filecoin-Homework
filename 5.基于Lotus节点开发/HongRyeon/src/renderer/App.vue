<template>
  <div id="app">
    <div class="nav">
      <router-link to="/">LandingPage</router-link>
      <router-link to="/crypto">Crypto</router-link>
      <router-link to="/hash">Hash</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'saraqael',
    created() {
      this.$log.info('Hello, log');
    },
  };
</script>

<style lang="scss" scoped>
#app{
  display: flex;
  .nav{
    font-size: 18px;
    text-align: center;
    height: 100vh;
    width: 20vw;
    background: #f5f6f7;

    a{
      text-decoration: none;
      color: #999;
      background: none;
      outline: none;
      display: block;
      width: 20vw;
      height: 10vh;
      line-height: 10vh;
    }

    .router-link-exact-active{
      color: #333;
      background: white;
    }
  }
}
</style>
