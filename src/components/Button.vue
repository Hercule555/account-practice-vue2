<template>
  <button class="button" @click="$emit('click', $event)" >
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  background: rgb(98, 98, 241);
  color: white;
  border-radius: 4px;
  border: none;
  font-size: 17px;
  padding: 10px 15px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>