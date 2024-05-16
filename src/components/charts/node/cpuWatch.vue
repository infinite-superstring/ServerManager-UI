<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';
import Zoom from "chartjs-plugin-zoom";
import chartUtils from "@/scripts/utils/chartUtils";
// import * as echarts from 'echarts';
// import echarts_styles from "@/scripts/option/echarts_styles"

let chart
let labels = []
let datasets = []

export default {
  name: "cpuWatch",
  props: {
    cpu_usage: {
      type: Number,
      required: true,
    },
    cpu_core_usage_data: {
      type: Object,
      required: true
    },
    update_time: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // labels: [],
      // tags: [],
      // datasets: {},
      // series: []
    }
  },
  mounted() {
    // let series = []
    // this.labels.push(this.update_time)
    // chart = echarts.init(document.getElementById('cpu_chart'))
    // chart.setOption(echarts_styles.getNodeStatusEChartsConfig())
    // for (const cpu_index in this.cpu_core_usage_data) {
    //   this.tags.push(cpu_index)
    //   this.datasets[cpu_index] = [this.cpu_core_usage_data[cpu_index]]
    //   series.push({
    //     name: cpu_index,
    //     type: 'line',
    //     symbol: 'none',
    //     sampling: 'lttb',
    //     data: this.datasets[cpu_index]
    //   })
    // }
    // chart.setOption({
    //
    //   legend: {
    //     data: this.tags,
    //   },
    //   xAxis: {
    //     type: 'category',
    //     boundaryGap: false,
    //     data: this.labels
    //   },
    //   series: series
    // })
    // chart.resize({width: 'auto', height: 400});
    labels.push(this.update_time)
    datasets.push({
      label: "CPU",
      data: [this.cpu_usage],
      fill: false,
      tension: 0.1
    })
    for (const cpu_index in this.cpu_core_usage_data) {
      datasets.push({
        label: cpu_index,
        data: [this.cpu_core_usage_data[cpu_index]],
        fill: false,
        tension: 0.1
      })
    }
    Chart.register(Colors, Zoom);
    chart = new Chart(this.$refs.cpu_chart, {
      type: 'line',
      options: {
        // responsive: true,
        interaction: {
          mode: 'index',
          intersect: true,
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
            }
          },
          y: {
            min: 0,
            max: 100,
          }
        }
      },
      data: {
        labels: labels,
        plugins: {
          colors: {
            enabled: false
          },
        },
        datasets: datasets
      }
    })
    chartUtils.hideDatasets(chart, 0)
  },
  methods: {
    updateUsageData() {
      /**
       * 更新使用率数据
       */
      labels.push(this.update_time)
      datasets[0].data.push(this.cpu_usage)
      for (const cpu_index in this.cpu_core_usage_data) {
        for (let i = 1; i < datasets.length; i++) {
          if (datasets[i].label === cpu_index) {
            datasets[i].data.push(this.cpu_core_usage_data[cpu_index])
            break
          }
        }
      }
    }
  },
  watch: {
    update_time(val) {
      // if (!chart) {
      //   return
      // }
      // let temp = []
      // this.labels.push(this.update_time)
      // for (const cpu_index in val) {
      //   this.datasets[cpu_index].push(val[cpu_index])
      //   temp.push({
      //     name: cpu_index,
      //     type: 'line',
      //     symbol: 'none',
      //     sampling: 'lttb',
      //     data: this.datasets[cpu_index]
      //   })
      // }
      // chart.setOption({
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     max: 100,
      //     data: this.labels
      //   },
      //   series: temp
      // })
      this.updateUsageData()
      chart.update()
    }
  }
}
</script>

<template>
  <canvas id="cpu_chart" ref="cpu_chart" width="100%"></canvas>
</template>

<style scoped>
</style>
