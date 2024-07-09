<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';

let chart
export default {
  name: "general_chart",
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
              display: false
            },
            y: {
              min: 0,
            }
          },
          plugins: {
            tooltip: {
              enabled: false,
              intersect: false,
              // callbacks: {
              //   label: function (context) {
              //     console.log(Date.now())
              //     const current_minute = Math.floor(Date.now() / 60)
              //     console.log(current_minute)
              //     console.log(context)
              //     console.log(current_minute - context.label)
              //     return current_minute - context.label
              //   }
              // }
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
  <v-sheet :height="150" width="100%">
    <div class="chart-container">
      <canvas ref="chart"></canvas>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>
