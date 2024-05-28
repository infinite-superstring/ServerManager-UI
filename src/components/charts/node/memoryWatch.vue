<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';
import Zoom from "chartjs-plugin-zoom";
import format from "@/scripts/utils/format"
import calculate from "@/scripts/utils/calculate";
import chartUtils from "@/scripts/utils/chartUtils";

let chart
let labels = []
let datasets = []
let cache = []
export default {
  name: "memoryWatch",
  props: {
    usage: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    update_time: {
      type: String,
      required: true
    }
  },
  mounted() {
    labels.push(this.update_time)
    datasets.push({
      label: "内存使用率",
      data: [],
      fill: false,
      tension: 0.4
    })
    cache.push(this.usage)
    Chart.register(Colors, Zoom);
    chart = new Chart(this.$refs.chart, {
      type: 'line',
      options: {
        responsive: true,
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
          },
        },
        plugins: {
          tooltip: {
            intersect: false,
            callbacks: {
              label: function (context) {
                return `${context.dataset.label}: ${context.parsed.y}%(${format.formatBytes(cache[context.dataIndex])})`
              }
            }
          },
          legend: {
            display: false,
          },
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
  },
  unmounted() {
    chart.destroy()
    datasets = []
    labels = []
  },
  methods: {
    updateUsageData() {
      /**
       * 更新使用率数据
       */
      labels.push(this.update_time)
      cache.push(this.usage)
      datasets[0].data.push(calculate.calculate_percentage(this.usage, this.max))
      if (datasets[0].data.length > 50) {
        cache.pop
        datasets[0].data.pop()
        labels.pop()
      }
    }
  },
  watch: {
    update_time(val) {
      this.updateUsageData()
      const data = chartUtils.delOldDataAndLabel(datasets, labels, 30)
      datasets = data.datasets
      labels = data.labels
      chart.update()
    }
  }
}
</script>

<template>
  <canvas id="disk_io_chart" ref="chart" width="100%"></canvas>
</template>

<style scoped>

</style>
