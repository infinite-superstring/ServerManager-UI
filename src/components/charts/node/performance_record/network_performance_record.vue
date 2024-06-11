<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';
import format from "@/scripts/utils/format";

let chart

export default {
  name: "network_performance_record",
  props: {
    datasets: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  mounted() {
    Chart.register(Colors);
    this.createChart()
  },
  methods: {
    createChart() {
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
            legend: {
              display: false,
            },
          }
        },
        data: {
          labels: this.labels,
          plugins: {
            colors: {
              enabled: false
            }
          },
          datasets: this.datasets
        }
      })
    },
    updateChart() {
      if (chart) {
        chart.data.labels = this.labels;
        chart.data.datasets = this.datasets;
        chart.update();
      }
    }
  },
  watch: {
    datasets: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  }
}
</script>

<template>
  <div class="chart-container">
    <canvas ref="chart"></canvas>
  </div>
</template>

<style scoped>

</style>
