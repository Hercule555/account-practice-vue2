<template>
  <div class="nav-wrapper">
    <div class="content">sta</div >
    <Nav />
  </div>
</template>

<script  lang="ts">
import Component from "vue-class-component";

export default {
  name: "Statistics",
};
</script>

<style lang="scss" scoped>
 .nav-wrapper {
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex-grow: 1;
}
</style>