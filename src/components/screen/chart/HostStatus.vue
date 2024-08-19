<template>
  <div class="chart-container" id="main">
    <canvas ref="chartRef" class="chart-canvas"></canvas>
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
    type: 'pie',
    data: {
      labels: ['正常', '告警', '离线'],
      datasets: [{
        data: [1, 1, 1],
        backgroundColor: [
          '#00B0FF',
          '#FFC107',
          '#EF5350'
        ],
        offset: 30,
        rotation: -60,
        animation: {
          animateScale: true,
          animateRotate: true
        }
      }],
    }
  })
})

watch(() => props.data, (val) => {
  console.log(val)
  console.log([...val])
  chartEl.data.datasets[0].data = [...val]
  if (val.every(item => item === 0)) {
    chartEl.data.datasets[0].data = [0, 0, 1]
  }
  chartEl.update()
})
</script>


<style scoped>
.chart-canvas {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
