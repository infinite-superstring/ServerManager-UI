<script>
import axios from "axios";

export default {
  name: "userInfoCard",
  data() {
    return {
      username: "UserName",
      group: "未知",
      avatar: "/api/userInfo/getAvatar",
    }
  },
  created() {
    axios.get("/api/userInfo/getInfo").then(res => {
      const data = res.data.data
      this.username = data.userName
      this.group = data.group
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<template>
  <div class="userInfoCard" @click="this.$router.push({name: 'userInfo'})">
    <v-avatar :image="avatar"></v-avatar>
    <span class="username">{{ username }}</span>
  </div>
  <!--  <v-card :to="{name: 'userInfo'}" :subtitle="username" :prepend-avatar="avatar" hover/>-->
</template>

<style scoped>
.username {
  margin-left: 10px;
  margin-right: 5px;
}
</style>
