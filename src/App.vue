import router from './router/index';
<template>
  <div id="app">
    <router-view />
  </div>
</template>



<style lang="scss">
@import "~@/assets/style/reset.scss";
@import "~@/assets/style/helper.scss";

body {
  line-height: 1.5;
  font-family: $font-hei;
  color: #333;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #e5e5e5;
}
#app {
  max-width: 600px;
  margin: 0 auto;
}

</style>
