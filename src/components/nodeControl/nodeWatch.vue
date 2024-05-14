<script>
import CpuWatch from "@/components/charts/node/cpuWatch.vue";

export default {
  name: "nodeWatch",
  components: {CpuWatch},
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
      text="交换空间"
      value="swap"
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
  <v-window v-model="tab">
    <v-window-item value="cpu">
      <cpu-watch/>
    </v-window-item>
    <v-window-item value="memory">
    </v-window-item>
    <v-window-item value="swap">
    </v-window-item>
    <v-window-item value="disk_io">
    </v-window-item>
    <v-window-item value="network">
    </v-window-item>
  </v-window>

</template>

<style scoped>
  .v-tabs {
    margin-bottom: 15px;
  }
</style>
