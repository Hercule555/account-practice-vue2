<template>
  <Layout>
    <Tabs
      class-prefix="type"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions" />
    </div>

    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{ beautify(group.title) }}
          <span>{{ type }} ￥{{ group.total }}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div class="noResult" v-else>没有相关记录</div>
  </Layout>
</template>



<script  lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Chart from "@/components/Chart.vue";
import _ from 'lodash'

const oneDay = 86400 * 1000;

@Component({
  components: { Tabs, Chart },
})
export default class Statistics extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
  mounted() {
    const div = this.$refs.chartWrapper as HTMLDivElement;
    div.scrollLeft = div.scrollWidth;
    console.log(this.groupedList)
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();

    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("， ");
  }
  
  get keyValueList() {
    const today = new Date();
    const arry = [];
    for (let i = 0; i <= 29; i++) {
      const dateString = dayjs(today).subtract(i, "day").format("YYYY-MM-DD");
      const found = _.find(this.groupedList, { title: dateString })
      arry.push({
        key: dateString,
        value: found ? found.total : 0
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

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    const { recordList } = this;
    if (recordList.length === 0) {
      return [];
    }

    const newList = clone(recordList)
      .filter((r) => r.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    result.map(
      (group) =>
        (group.total = group.items.reduce((sum, item) => sum + item.amount, 0))
    );
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  max-width: 100%;
  height: 400px;
}
::v-deep .type-tabs-item {
  background: #c4c4c4;
  color: #626161;
  &.selected {
    background: white;
    color: #333;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
%item {
  padding: 8px 16px;
  line-height: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 8px;
  color: #999;
}
.noResult {
  padding: 16px;
  margin-top: 16px;
  text-align: center;
}
.chart {
  width: 420%;
  &-wrapper {
    overflow: auto;
  }
}
</style>
