<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';
import Zoom from "chartjs-plugin-zoom";
import format from "@/scripts/utils/format"
import chartUtils from "@/scripts/utils/chartUtils";

let chart
let labels = []
let datasets = []

export default {
  name: "diskIO_Watch",
  props: {
    usage_data: {
      type: Object,
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
      label: "write",
      data: [],
      fill: false,
      tension: 0.4
    })
    datasets.push({
      label: "read",
      data: [],
      fill: false,
      tension: 0.4
    })
    Chart.register(Colors, Zoom);
    chart = new Chart(this.$refs.chart, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            ticks: {
              callback: function (value) {
                return format.formatBytes(value)
              }
            }
          },
        },
        plugins: {
          tooltip: {
            intersect: false,
            callbacks: {
              label: function (context) {
                return context.dataset.label + ": " + format.formatBytes(context.parsed.y)
              }
            }
          },
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
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
      for (let i = 0; i < datasets.length; i++) {
        console.log()
        switch (datasets[i].label) {
          case 'write':
            datasets[i].data.push(this.usage_data['write'])
            break
          case 'read':
            datasets[i].data.push(this.usage_data['read'])
            break
        }
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
  <div class="chart-container">
    <canvas id="disk_io_chart" ref="chart" width="100%"></canvas>
  </div>
</template>

<style scoped>

</style>
