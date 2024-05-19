<script>
import CpuWatch from "@/components/charts/node/cpuWatch.vue";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";

export default {
  name: "nodeWatch",
  components: {NodeOfflineOverlay, CpuWatch},
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
        <cpu-watch :cpu_usage="status_data.cpu_usage" :cpu_core_usage_data="status_data.cpu_core"
                   :update_time="status_data.timestamp"/>
      </v-window-item>
      <v-window-item value="memory">
      </v-window-item>
      <v-window-item value="disk_io">
      </v-window-item>
      <v-window-item value="network">
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
