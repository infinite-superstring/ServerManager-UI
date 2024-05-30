<script>
import GroupList from "@/layouts/admin/permission_group_layout.vue";

export default {
  name: "Permission_Page",
  components: {GroupList}
}
</script>

<template>
  <v-card title="权限管理" class="pageMain-card">
    <v-card-text>
      <group-list></group-list>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
