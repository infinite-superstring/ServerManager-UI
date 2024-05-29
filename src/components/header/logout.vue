<script>
import axios from "axios";
import message from "@/scripts/utils/message";
import {useUserStore} from "@/store/userInfo";

export default {
  name: "logoutBtn",
  methods: {
    logout() {
      useUserStore().logout().then(() => {
        message.showSuccess(this, "账号已登出")
        this.$router.push({name: "login"})
      })
      // axios.get("/api/auth/logout").then(res=>{
      //   let data = res.data
      //   switch (data.status) {
      //     case 1:
      //       message.showSuccess(this, data.msg)
      //       this.$router.push({name: "login"})
      //       break;
      //     case 0:
      //       message.showError(this, data.msg)
      //       break
      //   }
      // }).catch(err=>{
      //   console.error(err)
      //   message.showApiErrorMsg(this, err.message)
      // })
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
