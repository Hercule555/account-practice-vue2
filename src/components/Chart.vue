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
import echarts, { EChartOption, ECharts } from 'echarts'
import { Component,Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import _ from 'lodash'

@Component
export default class Chart extends Vue {
  @Prop() options?: EChartOption
  chart?: ECharts
  mounted() {
   if(this.options === undefined) {
     return console.error('options 为空')
   }
   this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
   this.chart.setOption(this.options)
  }
  @Watch('options') 
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue)
  }
  
}
</script>