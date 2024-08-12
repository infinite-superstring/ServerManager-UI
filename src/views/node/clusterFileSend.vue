<script>
import Node_group_file_send_layout from "@/layouts/Node/node_group_layouts/node_group_file_send_layout.vue";

export default {
  name: "clusterFileSend",
  components: {Node_group_file_send_layout}
}
</script>

<template>
  <v-card title="集群指令" class="pageMain-card">
    <v-card-text>
      <node_group_file_send_layout/>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
