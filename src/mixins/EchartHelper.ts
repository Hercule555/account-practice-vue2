import Vue from 'vue'
import Component from 'vue-class-component'
import { EChartOption } from 'echarts'
import dayjs from 'dayjs';
import _ from 'lodash'

@Component
export class EchartHelper extends Vue {
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  
  get keyValueList() {
    const today = new Date();
    const arry = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.recordList, { createdAt: dateString })
      arry.push({
        key: dateString,
        value: found ? found.amount : 0
      });
    }
    arry.sort((a,b) => {
      if(a.key > b.key) {
        return 1
      } else if(a.key < b.key) {
        return -1
      } else {
        return 0
      }
    })
    return arry
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key)
    const values = this.keyValueList.map(item => item.value)

    return {
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: function (value:string) {
             return value.substring(5)
          }
        }
      },
      yAxis: {
        type: "value",
        show: false,
      },
      tooltip: {
        show: true,
      },
      legend: {
        // data: [ 'x']

      },
      series: [
        {
          data: values,
          type: "line",
          // name: 'x',
          symbol: 'circle',
          itemStyle: {

          },
          symbolSize: 15,
        },
      ],
      grid: {
        left: 25,
        right: 25,
        bottom: 30,
        top: 45,
      },
    }
  }

}
export default EchartHelper