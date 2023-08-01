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
  
  get y() {
    const today = new Date();
    const arry = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.recordList, { createdAt: dateString })
      arry.push({
        date: dateString,
        value: found ? found.amount : 0
      });
    }
    arry.sort((a,b) => {
      if(a.date > b.date) {
        return 1
      } else if(a.date < b.date) {
        return -1
      } else {
        return 0
      }
    })
    return arry
  }

  get x() {
    const keys = this.y.map(item => item.date)
    const values = this.y.map(item => item.value)

    return {
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true
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