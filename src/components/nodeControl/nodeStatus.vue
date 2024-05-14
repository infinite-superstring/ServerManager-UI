<script>
import bytesUtil from "@/scripts/utils/bytesUtil";

export default {
  name: "NodeStatus",
  computed: {
    bytesUtil() {
      return bytesUtil
    }
  },
  props: {
    status_data: {
      type: Object,
      required: true
    },
    base_info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {
  }
}
</script>

<template>
  <div class="status-echarts-container">
    <div class="echarts-cpu">
      <v-tooltip location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="status_data.cpu_usage" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> {{ status_data.cpu_usage }} %
            </template>
          </v-progress-circular>
        </template>
      </v-tooltip>
      <div class="chart-subtitle">CPU占用率</div>
    </div>
    <div class="echarts-memory">
      <v-tooltip :text="'总量：'+ bytesUtil.formatBytes(base_info.node_memory_total) +' 已用：'+ bytesUtil.formatBytes(status_data.memory) +' 可用：'+bytesUtil.formatBytes(base_info.node_memory_total - status_data.memory)" location="top">
        <template v-slot:activator="{ props }">
          <v-progress-circular v-bind="props" :model-value="status_data.memory_used" :rotate="360" :size="100" :width="15" color="primary">
            <template v-slot:default> {{ status_data.memory_used }} %
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
