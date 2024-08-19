<template>
  <div class="chart-container" id="main">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import Chart from "chart.js/auto";
import chartUtils from "@/scripts/utils/chartUtils";

const chartRef = ref()
let chartEl = null

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: {}
  },
  onLineCount: {
    type: Number,
    required: true,
    default: 0
  }
})

onMounted(() => {
  chartEl = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          borderColor: '#FFC107', // 线条颜色
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          fill: true, // 是否填充区域
          tension: 0.1, // 曲线张力
          pointRadius: 0,
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          // display: false
        }
      },
      plugins: {
        tooltip: {
          intersect: false,
          callbacks: {
            label: function (c) {
              return c.raw + '台节点告警中'
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
  chartEl.data.labels.push(val.time)
  chartEl.data.datasets[0].data.push(val.data)
  chartUtils.delOldDataAndLabel(chartEl.data.datasets, chartEl.data.labels, 10)
  chartEl.update()
})

watch(() => props.onLineCount, v => {
  chartEl.options.scales.y.max = v
})
</script>


<style scoped>

</style>
