<script>
import Chart from 'chart.js/auto';
import {Colors} from 'chart.js';

export default {
  name: "cpuWatch",
  data() {
    return {}
  },
  created() {
  },
  mounted() {
    Chart.register(Colors);
    new Chart(this.$refs.cpu_chart, {
      type: 'line',
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            min: 0,
            max: 100,
          }
        }
      },
      data: {
        labels: ['2024-05-13 15:29:00', '2024-05-13 15:30:00', '2024-05-13 15:31:00', '2024-05-13 15:32:00'],
        plugins: {
          colors: {
            enabled: false
          }
        },
        datasets: [
          {
            label: 'CPU 0',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            tension: 0.4
          },
          {
            label: 'CPU 1',
            data: [24, 65, 24, 13, 54, 23, 65],
            fill: false,
            tension: 0.4
          },
          {
            label: 'CPU 2',
            data: [97, 16, 56, 76, 98, 54, 87],
            fill: false,
            tension: 0.4
          },
          {
            label: 'CPU 3',
            data: [65, 32, 32, 63, 14, 32, 54],
            fill: false,
            tension: 0.4
          }
        ]
      }
    })
  },
  methods: {}
}
</script>

<template>
  <canvas class="cpu_chart" ref="cpu_chart"></canvas>
</template>

<style scoped>

</style>
