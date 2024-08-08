<script>
import Cluster_run_layout from "@/layouts/Node/cluster_run_layout.vue";
import("@xterm/xterm/css/xterm.css")


export default {
  name: "ClusterExecution",
  components: {Cluster_run_layout}
}
</script>

<template>
  <v-card title="集群指令" class="pageMain-card">
    <v-card-text>
      <cluster_run_layout/>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
