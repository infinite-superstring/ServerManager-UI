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
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          intersect: false,
          callbacks: {
            label: function ({raw}) {
              raw = Math.ceil(raw)
              return raw + '%'
            }
          }
        },
        legend: {
          display: false
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
