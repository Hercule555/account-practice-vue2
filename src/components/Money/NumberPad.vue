<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputConent">1</button>
      <button @click="inputConent">2</button>
      <button @click="inputConent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputConent">4</button>
      <button @click="inputConent">5</button>
      <button @click="inputConent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputConent">7</button>
      <button @click="inputConent">8</button>
      <button @click="inputConent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputConent" class="zero">0</button>
      <button @click="inputConent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number
  output= this.value.toString()
  inputConent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0) {
      if (input === ".") {
        return;
      }
    }

    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    const number = parseFloat(this.output)
    this.$emit('update:value', number );
    console.log(this.value)
    this.$emit('submit', number);
    this.output = '0'
  }
  
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    @extend %innerShadow;
    font-size: 33px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: center;
    line-height: 40px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 74px;
      font-size: 18px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        height: 74px * 2;
        float: right;
      }
      &.zero {
        width: 25% * 2;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color: $bg, $amount: 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color: $bg, $amount: 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($color: $bg, $amount: 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($color: $bg, $amount: 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($color: $bg, $amount: 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($color: $bg, $amount: 4 * 6%);
      }
    }
  }
}
</style>