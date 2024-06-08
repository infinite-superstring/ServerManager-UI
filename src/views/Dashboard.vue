<script>
import Dashboard_layout from "@/layouts/dashboard/dashboard_layout.vue";

export default {
  name: "Dashboard",
  components: {Dashboard_layout}
}
</script>

<template>
  <v-card title="仪表盘" class="pageMain-card">
    <v-card-text>
      <dashboard_layout/>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
