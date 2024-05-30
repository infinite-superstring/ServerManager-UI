<script>
import audit_layout from "@/layouts/admin/audit_layout.vue";
export default {
  name: "Audit_Page",
  components: {audit_layout},
}
</script>

<template>
  <v-card title="审计与日志" class="pageMain-card">
    <v-card-text>
      <audit_layout></audit_layout>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
