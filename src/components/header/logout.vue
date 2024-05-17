<script>
import axios from "axios";
import message from "@/scripts/utils/message";

export default {
  name: "logoutBtn",
  methods: {
    logout() {
      axios.get("/api/auth/logout").then(res=>{
        let data = res.data
        switch (data.status) {
          case 1:
            message.showSuccess(this, data.msg)
            this.$router.push({name: "login"})
            break;
          case 0:
            message.showError(this, data.msg)
            break
        }
      }).catch(err=>{
        console.error(err)
        message.showApiErrorMsg(this, err.message)
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
