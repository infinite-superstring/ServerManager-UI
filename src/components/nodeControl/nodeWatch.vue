<script>
import CpuWatch from "@/components/charts/node/watch/cpuWatch.vue";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";
import disk_io_watch from "@/components/charts/node/watch/diskIO_Watch.vue";
import MemoryWatch from "@/components/charts/node/watch/memoryWatch.vue";
import Network_watch from "@/components/charts/node/watch/networkWatch.vue";

export default {
  name: "nodeWatch",
  components: {Network_watch, MemoryWatch, disk_io_watch, NodeOfflineOverlay, CpuWatch},
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
      tab: null
    }
  }
}
</script>

<template>
  <v-tabs
    v-model="tab"
  >
    <v-tab
      text="CPU"
      value="cpu"
    ></v-tab>
    <v-tab
      text="内存"
      value="memory"
    ></v-tab>
    <v-tab
      text="磁盘IO"
      value="disk_io"
    ></v-tab>
    <v-tab
      text="网络吞吐"
      value="network"
    ></v-tab>
  </v-tabs>
  <v-sheet :height="300" width="100%">
    <node-offline-overlay :flag="base_info.node_name && !base_info.node_online"/>
    <v-window v-model="tab" v-if="base_info.node_online">
      <v-window-item value="cpu">
        <cpu-watch
          :cpu_core_number="base_info?.node_system_info?.core_count"
          :cpu_usage="status_data.cpu_usage"
          :cpu_core_usage_data="status_data.cpu_core"
          :update_time="status_data.timestamp"
        />
      </v-window-item>
      <v-window-item value="memory">
        <memory-watch
          :update_time="status_data.timestamp"
          :max="base_info.node_system_info.memory_total"
          :usage="status_data.memory"
        />
      </v-window-item>
      <v-window-item value="disk_io">
        <disk_io_watch
          :usage_data="status_data.disk_io"
          :update_time="status_data.timestamp"
        />
      </v-window-item>
      <v-window-item value="network">
        <network_watch
          :update_time="status_data.timestamp"
          :usage_data="status_data.network_io"
        />
      </v-window-item>
    </v-window>
  </v-sheet>
</template>

<style scoped>
.v-tabs {
  margin-bottom: 15px;
}
.v-window, .v-window .v-window-item {
  width: 100%;
  height: 100%;
}
</style>
