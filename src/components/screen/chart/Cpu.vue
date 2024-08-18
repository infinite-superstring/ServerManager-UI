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
