<script>
import axios from "axios";

export default {
  name: "user_info_card",
  data: () => {
    return {
      username: "UserName",
      group: "未知",
    }
  },
  mounted() {
    this.getUserInfo()
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
    },
  }
}
</script>

<template>
  <div class="user_info">
    <v-avatar color="surface-variant" size="80" :image="'/api/userInfo/getAvatar'"></v-avatar>
    <div>
      <p class="username">
        {{ username }}
      </p>
      <p class="user_group">
        {{ group }}
      </p>
    </div>
  </div>


</template>

<style scoped>
.user_info {
  display: flex;
  align-items: center;

  .v-avatar {
    margin-right: 25px;
  }

  div {
    .username {
      font-size: 20px;
    }

    .user_group {
      color: #707070;
    }
  }
}
</style>
