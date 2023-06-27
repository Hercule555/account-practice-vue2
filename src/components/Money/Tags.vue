<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        @click="toggle(tag)"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import oldStore from "@/store/index2";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  tagList = oldStore.fetchTags();
  selectedTags: string[] = [];
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    //  this.$emit('update:value', this.selectedTags)
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("不能输入为空");
    }
    oldStore.createTag(name);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  font-size: 14px;
  padding: 16px;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      $h: 24px;
      height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 16px;
      margin-top: 4px;
      font-size: 14px;
      background-color: $bg;

      &.selected {
        background: darken($color: $bg, $amount: 30%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>