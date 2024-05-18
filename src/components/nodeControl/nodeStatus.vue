<script>
import format from "@/scripts/utils/format";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";

export default {
  name: "NodeStatus",
  components: {NodeOfflineOverlay},
  computed: {
    format() {
      return format
    },
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
    return {}
  },
  created() {

  },
  mounted() {
  },
  methods: {
    usage_color(usage) {
      if (usage < 30) return 'green'
      else if (usage > 30 && usage < 70) return "secondary"
      else if (usage > 70) return 'red'
    }
  }
}
</script>

<template>
  <div class="node-status">
    <node-offline-overlay :flag="base_info.node_name && !base_info.node_online"/>
    <div class="status-container" v-if="base_info.node_online">
      <div class="cpu">
        <v-tooltip location="top" max-width="250px">
          <v-chip v-for="(value, cpu_index) in status_data.cpu_core" :key="cpu_index" :color="usage_color(value)">
            {{ cpu_index }} : {{ value }}%
          </v-chip>
          <template v-slot:activator="{ props }">
            <v-progress-circular
              v-bind="props"
              :model-value="status_data.cpu_usage"
              :rotate="360"
              :size="100"
              :width="15"
              color="primary">
              <template v-slot:default>
                {{ status_data.cpu_usage }} %
              </template>
            </v-progress-circular>
          </template>
        </v-tooltip>
        <div class="chart-subtitle">CPU占用率</div>
      </div>
      <div class="memory">
        <v-tooltip location="top">
          <p>总量：{{ format.formatBytes(base_info.node_system_info.memory_total) }}</p>
          <p>已用：{{ format.formatBytes(status_data.memory) }}</p>
          <p>可用：{{ format.formatBytes(base_info.node_system_info.memory_total - status_data.memory) }}</p>
          <v-divider/>
          <p>交换空间已用：{{ format.formatBytes(status_data.swap) }}</p>
          <template v-slot:activator="{ props }">
            <v-progress-circular
              v-bind="props"
              :model-value="status_data.memory_used"
              :rotate="360"
              :size="100"
              :width="15"
              :color="usage_color(status_data.memory_used)">
              <template v-slot:default>
                {{ status_data.memory_used }} %
              </template>
            </v-progress-circular>
          </template>
        </v-tooltip>
        <div class="chart-subtitle">内存占用率</div>
      </div>
      <div class="loadavg">
        <v-tooltip location="top">
          <p>1分钟平均负载：{{ status_data.loadavg.one_minute }}</p>
          <p>5分钟平均负载：{{ status_data.loadavg.five_minute }}</p>
          <p>15分钟平均负载：{{ status_data.loadavg.fifteen_minute }}</p>
          <template v-slot:activator="{ props }">
            <v-progress-circular
              v-bind="props"
              :model-value="(status_data.loadavg.one_minute / base_info.node_system_info.processor_count) * 100"
              :rotate="360"
              :size="100"
              :width="15"
              :color="usage_color((status_data.loadavg.one_minute / base_info.node_system_info.processor_count) * 100)">
              <template v-slot:default>
                {{
                  format.formatPercentage((status_data.loadavg.one_minute / base_info.node_system_info.processor_count) * 100)
                }} %
              </template>
            </v-progress-circular>
          </template>
        </v-tooltip>
        <div class="chart-subtitle">负载</div>
      </div>
      <!--      <div class="disk">-->
      <!--        <v-tooltip location="top">-->
      <!--          <p>可用：</p>-->
      <!--          <p>已用：</p>-->
      <!--          <template v-slot:activator="{ props }">-->
      <!--            <v-progress-circular-->
      <!--              v-bind="props"-->
      <!--              :model-value="35"-->
      <!--              :rotate="360"-->
      <!--              :size="100"-->
      <!--              :width="15"-->
      <!--              color="primary">-->
      <!--              <template v-slot:default> 35 %-->
      <!--              </template>-->
      <!--            </v-progress-circular>-->
      <!--          </template>-->
      <!--        </v-tooltip>-->
      <!--        <div class="chart-subtitle">磁盘使用率</div>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<style scoped>
.node-status {
  min-height: 150px;
}

.status-container {
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
