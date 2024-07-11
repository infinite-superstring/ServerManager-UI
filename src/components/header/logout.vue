<script>
import message from "@/scripts/utils/message";

export default {
  name: "logoutBtn",
  methods: {
    logout() {
      this.$user.logout().then(() => {
        message.showSuccess(this, "账号已登出")
        this.$router.push({name: "login"})
      })
    }
  }
}
</script>

<template>
  <v-btn @click="logout()">
    <template v-slot:prepend>
      <v-icon icon="mdi:mdi-logout"></v-icon>
    </template>
    登出
  </v-btn>
</template>

<style scoped>

</style>
