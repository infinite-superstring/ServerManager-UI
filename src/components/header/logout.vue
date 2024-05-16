<script>
import axios from "axios";
import message from "@/scripts/utils/message";

export default {
  name: "logoutBtn",
  methods: {
    logout() {
      axios.get("/auth/logout").then(res=>{
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
  <v-card @click="logout()" height="80%" width="100px" append-icon="mdi-logout" color="primary">
    登出
  </v-card>
</template>

<style scoped>

</style>
