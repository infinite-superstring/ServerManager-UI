<script>
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
import chartUtils from "@/scripts/utils/chartUtils";
import format from "@/scripts/utils/format";

let chart
let labels = []
let datasets = []

export default {
  name: "cpuWatch",
  props: {
    cpu_core_number: {
      type: Number,
      required: true
    },
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
  mounted() {
    console.log('生命周期->', chart)
    if (chart !== undefined) {
      chart = undefined
    }
    this.init()
  },
  unmounted() {
    chart.destroy()
    datasets = []
    labels = []
    chart = undefined
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
    },
    updateCpuCore() {
      if (!this.cpu_core_usage_data) return
      if (datasets.length > 1) return
      if (this.cpu_core_number) {
        for (let i = 1; i < this.cpu_core_number; i++) {
          datasets.push({
            hidden: true,
            label: `CPU ${i}`,
            data: [],
            fill: false,
            tension: 0.4
          })
        }
        return;
      }
      for (const cpu_index in this.cpu_core_usage_data) {
       datasets.push({
          hidden: true,
          label: cpu_index,
          data: [],
          fill: false,
          tension: 0.4
        })
      }
    },
    init() {
      datasets.push({
        label: "CPU",
        data: [],
        fill: false,
        tension: 0.4
      })
      // Chart.register(Colors);
      this.updateCpuCore()
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
              min: 0,
              max: 100,
            }
          },
          plugins: {
            tooltip: {
              intersect: false,
              callbacks: {
                label: function (context) {
                  return context.dataset.label + ": " + context.parsed.y + "%"
                }
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
      chartUtils.hideDatasets(chart, 0)
    }
  },
  watch: {
    update_time(val) {
      if (this.cpu_core_usage_data && !chart) {
        console.log('CPU 图表初始化')
        this.init()
      }
      this.updateCpuCore()
      this.updateUsageData()
      if (chart) {
        chart.update()
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <canvas id="cpu_chart" ref="chart"></canvas>
  </div>
</template>

<style scoped>

</style>
