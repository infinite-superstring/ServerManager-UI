<template>
  <div class="chart-container" id="main">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import Chart from "chart.js/auto";

const chartRef = ref()
let chartEl = null

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})

onMounted(() => {
  chartEl = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [
        {
          label: null,
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1,
          barThickness: 20,
        }
      ]
    },
    options: {
      scales: {
        x: {
          ticks: {
            display: true
          },
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: true,
          min: 0, // 设置Y轴最小值
          max: 100, // 根据数据调整最大值
          ticks: {
            callback: function (value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        tooltip: {
          intersect: false,
          callbacks: {
            label: function ({raw}) {
              return Math.ceil(raw) + '%';
            }
          }
        },
        legend: {
          display: false
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 20
        }
      }
    }
  })
})

watch(() => props.data, (val) => {
  chartEl.data.labels = val.map(item => item.name)
  chartEl.data.datasets[0].data = val.map(item => item.data)
  chartEl.update()
})
</script>


<style scoped>

</style>
