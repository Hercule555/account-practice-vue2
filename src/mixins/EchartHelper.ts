import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class EchartHelper extends Vue {
  ech = {
    xAxis: {
      type: "category",
      data: [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun",
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "on", "jd"
      ],
    },
    yAxis: {
      type: "value",
      show: false,
    },
    tooltip: {
      show: true,
    },
  
    series: [
      {
        data: [
          820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290,
          1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901,
          934, 1290, 1330, 1320, 20, 5,
        ],
        type: "line",
        itemStyle: {
          borderWidth:10,
        }
      },
    ],
    grid: {
      x: 50,
      y: 25,
      x2: 30,
      y2: 45,
    },
  }

}
export default EchartHelper