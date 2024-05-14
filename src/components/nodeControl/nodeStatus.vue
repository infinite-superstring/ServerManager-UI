<script>
import * as echarts from 'echarts/core';
import {GaugeChart} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';

export default {
  name: "NodeStatus",
  data() {
    return {
      echarts: {
        cpu: null,
        memory: null,
        disk: null,
        network: null,
      },
      echarts_option: {
        // series: [
        //   {
        //     type: 'gauge',
        //     progress: {
        //       show: true,
        //       width: 15
        //     },
        //     axisTick: {
        //       show: false
        //     },
        //     splitLine: {
        //       show: false,
        //       length: 20,
        //       lineStyle: {
        //         width: 2,
        //         color: '#999'
        //       }
        //     },
        //     axisLabel: {
        //       show: false,
        //       distance: 25,
        //       color: '#999',
        //       fontSize: 16
        //     },
        //     anchor: {
        //       show: false,
        //       showAbove: true,
        //       size: 16,
        //       itemStyle: {
        //         borderWidth: 5
        //       }
        //     },
        //     title: {
        //       show: false
        //     },
        //     detail: {
        //       valueAnimation: true,
        //       fontSize: 16,
        //       offsetCenter: [0, '70%']
        //     },
        //     data: [
        //       {
        //         value: 70
        //       }
        //     ]
        //   }
        // ]
      }
    }
  },
  created() {
    echarts.use([GaugeChart, CanvasRenderer]);

  },
  mounted() {
    // this.echarts.cpu = echarts.init(this.$refs.echarts_cpu);
    // this.echarts_option && this.echarts.cpu.setOption(this.echarts_option);
    // this.echarts.memory = echarts.init(this.$refs.echarts_memory);
    // this.echarts_option && this.echarts.memory.setOption(this.echarts_option);
    // this.echarts.disk = echarts.init(this.$refs.echarts_disk_io);
    // this.echarts_option && this.echarts.disk.setOption(this.echarts_option);
    // this.echarts.network = echarts.init(this.$refs.echarts_network);
    // this.echarts_option && this.echarts.network.setOption(this.echarts_option);
    // window.addEventListener('resize', this.echarts.cpu.resize);
  }
}
</script>

<template>
  <div class="status-echarts-container">
    <div class="echarts-cpu">
      <v-tooltip text="总量：xxxx 已用：xxxx 可用：xxxxx" location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="35" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> 35 %
            </template>
          </v-progress-circular>
        </template>
      </v-tooltip>
      <div class="chart-subtitle">CPU占用率</div>
    </div>
    <div class="echarts-memory">
      <v-tooltip text="总量：xxxx 已用：xxxx 可用：xxxxx" location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="35" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> 35 %
            </template>
          </v-progress-circular>
        </template>
      </v-tooltip>
      <div class="chart-subtitle">内存占用率</div>
    </div>
    <div class="echarts-disk-io">
      <v-tooltip text="总量：xxxx 已用：xxxx 可用：xxxxx" location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="35" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> 35 %
            </template>
          </v-progress-circular>
        </template>
      </v-tooltip>
      <div class="chart-subtitle">负载</div>
    </div>
    <div class="echarts-network">
      <v-tooltip text="总量：xxxx 已用：xxxx 可用：xxxxx" location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="35" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> 35 %
            </template>
          </v-progress-circular>
        </template>
      </v-tooltip>
      <div class="chart-subtitle">磁盘使用率</div>
    </div>
  </div>
</template>

<style scoped>
.status-echarts-container {
  display: flex;
  justify-content: space-between;

  .chart {
    min-height: 130px;
    min-width: 130px;
    width: 150px;
    height: 150px;
  }

  .chart-subtitle {
    display: flex;
    justify-content: center;
    font-size: 18px;
    margin-top: 15px;
  }
}
</style>
