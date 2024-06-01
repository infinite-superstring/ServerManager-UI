<script>
import Node_group_edit_layout from "@/layouts/Node/node_group_edit_layout.vue";

export default {
  name: "GroupEdit",
  components: {Node_group_edit_layout}
}
</script>

<template>
  <v-card title="群组编辑" class="pageMain-card">
    <v-card-text>
      <node_group_edit_layout/>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
