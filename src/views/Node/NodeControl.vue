<script>
import Node_control_layout from "@/layouts/Node/node_control_layout.vue";

export default {
  name: "NodeControl",
  components: {Node_control_layout}
}
</script>

<template>
  <v-card title="节点控制" class="pageMain-card">
    <v-card-text>
      <node_control_layout></node_control_layout>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
