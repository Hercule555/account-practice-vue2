<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource" :key="item.value"
      @click="select(item)"
      :class="liClass(item)"
      class="tabs-item"
    >
      {{ item.text }}
    </li>
  </ul>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: item.value === this.value,
    };
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  &-item {
    width: 50%;
    font-size: 24px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>