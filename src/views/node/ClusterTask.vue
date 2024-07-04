<script>
import ClusterTaskLayout from "@/layouts/Node/ClusterTaskLayout.vue";

export default {
  name: "ClusterTask",
  components: {ClusterTaskLayout}
}
</script>

<template>
  <v-card title="集群任务" class="pageMain-card">
    <v-card-text>
      <ClusterTaskLayout></ClusterTaskLayout>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
