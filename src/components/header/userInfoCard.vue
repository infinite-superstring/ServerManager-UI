<script>
import axios from "axios";

export default {
  name: "userInfoCard",
  data() {
    return {
      username: "UserName",
      group: "未知",
      avatar: "/userInfo/api/getAvatar",
      height:"80vh"
    }
  },
  created() {
    axios.get("/userInfo/api/getInfo").then(res=>{
      const data = res.data.data
      this.username = data.userName
      this.group = data.group
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<template>
  <v-card :to="{name: 'userInfo'}" :subtitle="username" :prepend-avatar="avatar" hover/>
</template>

<style >
</style>
