<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<style lang="scss" scoped>
  .wrapper {
    height: 400px;
  }
</style>
 
<script lang="ts">
import Vue from "vue";
import echarts, { EChartOption } from 'echarts'
import { Component,Prop } from "vue-property-decorator";

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption
  mounted() {
   if(this.options === undefined) {
     return console.error('options 为空')
   }
   const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
   chart.setOption(this.options)
  }
}
</script>