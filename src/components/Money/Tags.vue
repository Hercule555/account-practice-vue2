<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
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
import Vue from "vue";
import { mixins } from "vue-class-component";
import { TagHelper } from "@/mixins/TagHepler";
import { Component } from "vue-property-decorator";

@Component
export default class Tags extends mixins(TagHelper) {
  selectedTags: string[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTags");
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
    
  }
}
</script>

<style lang="scss" scoped>
.tags {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  font-size: 18px;
  padding: 16px;
  background: white;
  > .current {
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    > li {
      $bg: #d9d9d9;
      $h: 24px;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 16px;
      margin-top: 4px;
      font-size: 20px;
      background-color: $bg;

      &.selected {
        background: darken($color: $bg, $amount: 30%);
        color: white;
      }
    }
  }
  > .new {
    padding-top: 16px;
    margin: 0 auto;
    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
      font-size: 18px;
    }
  }
}
</style>