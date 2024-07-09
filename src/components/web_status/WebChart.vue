<template>
  <canvas id="chart" ref="chartRef"></canvas>
</template>

<script setup>
import {Colors} from 'chart.js';
import 'chartjs-adapter-moment';
import {onMounted, ref, watch} from "vue";
import Chart from "chart.js/auto";
import chartUtils from "@/scripts/utils/chartUtils";

const chartRef = ref(null)
let delayChart = null
const props = defineProps({
  time: {
    required: true,
    default: []
  },
  data: {
    required: true,
    default: []
  }
})
onMounted(() => {
  Chart.register(Colors)
  delayChart = new Chart(chartRef.value, {
    type: 'line', // 图表类型
    data: {
      labels: [], // X 轴标签
      datasets: [{
        data: [], // 数据数组
        borderColor: 'rgba(75, 192, 192, 1)', // 线条颜色
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // 填充颜色
        fill: true, // 是否填充区域
        tension: 0.1 // 曲线张力
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: false,
          title: {
            display: false,
            text: 'Date'
          },
          ticks: {
            maxTicksLimit: 5
          }
        },
        y: {
          display: false,
          title: {
            display: false,
            text: '延迟'
          },
          beginAtZero: true
        }
      },
      plugins: {
        tooltip: {
          intersect: false,
          callbacks: {
            label: function (context) {
              return "延迟: " + context.parsed.y + "ms"
            }
          }
        },
        legend: {
          display: false
        }
      }
    }
  });
})

watch(() => props.time, (val) => {
  if (Array.isArray(val)) {
    delayChart.data.labels = []
    delayChart.data.labels = [...val]
  } else {
    delayChart.data.labels.push(val)
    chartUtils.delOldDataAndLabel(delayChart.data.datasets, delayChart.data.labels, 20)
  }
  delayChart.update()
}, {
  deep: true
})
/**
 * 监听数据
 */
watch(() => props.data, (val) => {
  if (Array.isArray(val)) {
    delayChart.data.datasets[0].data = []
    delayChart.data.datasets[0].data = [...val]
  } else {
    delayChart.data.datasets[0].data.push(val)
    chartUtils.delOldDataAndLabel(delayChart.data.datasets, delayChart.data.labels, 20)
  }
  delayChart.update()
}, {
  deep: true
})

/**
 * 初始化数据
 */
const loadData = () => {
  if (Array.isArray(props.time)) {
    delayChart.data.labels = []
    delayChart.data.labels = [...props.time]
  } else {
    delayChart.data.labels.push(props.time)
    chartUtils.delOldDataAndLabel(delayChart.data.datasets, delayChart.data.labels, 20)
  }
  if (Array.isArray(props.data)) {
    delayChart.data.datasets[0].data = []
    delayChart.data.datasets[0].data = [...props.data]
  } else {
    delayChart.data.datasets[0].data.push(props.data)
    chartUtils.delOldDataAndLabel(delayChart.data.datasets, delayChart.data.labels, 20)
  }
}

onMounted(() => {
  loadData()
  delayChart.update()
})

</script>


<style scoped>
#chart {
  height: 50%;
  max-height: 120px;
}
</style>
