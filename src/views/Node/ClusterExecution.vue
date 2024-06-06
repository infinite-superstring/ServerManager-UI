<script>
export default {
  name: "ClusterExecution"
}
</script>

<template>
  <v-card title="集群命令" class="pageMain-card">
    <v-card-text>
      <v-select label="选择节点组"></v-select>
      <v-textarea label="Shell"></v-textarea>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
