<script>
import axios from "axios";
import bus from 'vue3-eventbus'

export default {
  name: "userInfoCard",
  data() {
    return {
      username: "UserName",
      group: "未知",
      avatar: "/api/userInfo/getAvatar",
    }
  },
  mounted() {
    this.getUserInfo()
    bus.on('update:Avatar', () => {
      this.avatar = "/api/userInfo/getAvatar?v" + Math.random()
    })
    bus.on('update:UserInfo', () => {
      this.getUserInfo()
    })
  },
  methods: {
    getUserInfo() {
      axios.get("/api/userInfo/getInfo").then(res => {
        const data = res.data.data
        this.username = data.userName
        this.group = data.group
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<template>
  <!--  <v-btn class="userInfoCard pa-2" size="auto" @click="this.$router.push({name: 'userInfo'})">-->
  <!--    <template v-slot:prepend>-->
  <!--      <v-avatar :image="avatar"></v-avatar>-->
  <!--    </template>-->
  <!--    <span class="username">{{ username }}</span>-->
  <!--  </v-btn>-->
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn
        class="userInfoCard pa-2"
        size="auto"
        v-bind="props">
        <template v-slot:prepend>
          <v-avatar :image="avatar"></v-avatar>
        </template>
        <span class="username">{{ username }}</span>
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="this.$router.push({name: 'userInfo'})">
        <v-icon icon="mdi-account-outline"/>
        个人信息
      </v-list-item>
      <v-list-item>
        <v-icon icon="mdi-bell-outline"/>
        消息中心
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.userInfoCard {
  margin-right: 5px;

  .username {
    margin-left: 10px;
    text-transform: none
  }
}

</style>
