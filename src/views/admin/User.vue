<script>
import UserList from "@/layouts/admin/user_manager_layout.vue";

export default {
name: "User_Manager",
  components: {UserList},
}
</script>

<template>
  <v-card title="用户管理" class="pageMain-card">
    <v-card-text>
      <UserList></UserList>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
