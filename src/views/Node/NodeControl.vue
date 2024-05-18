<script>
import Node_control_layout from "@/layouts/Node/node_control_layout.vue";

export default {
  name: "NodeControl",
  components: {Node_control_layout}
}
</script>

<template>
  <v-card class="pageMain-card">
    <v-card-title>
      <v-btn variant="text" @click="$router.go(-1)">
        <v-icon icon="mdi:mdi-arrow-left"></v-icon>
      </v-btn>
      节点控制
    </v-card-title>
    <v-card-text>
      <node_control_layout></node_control_layout>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card-title {
  display: flex;
  align-items: center;
}
</style>
