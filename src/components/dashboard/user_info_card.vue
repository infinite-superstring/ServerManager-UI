<script>
import axios from "axios";
import {getInfoApi} from "@/scripts/apis/users";

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
      getInfoApi().then(res => {
        const data = res.data.data
        this.username = data.userName
        this.group = data.group
      })
    },
  }
}
</script>

<template>
  <div class="user_info">
    <v-avatar
      color="surface-variant"
      size="80"
      :title="$t('dashboard.user_info.avatar')"
      :image="'/api/userInfo/getAvatar'"
    />
    <div>
      <p class="username" :title="$t('dashboard.user_info.user_name')">
        {{ username }}
      </p>
      <p class="user_group" :title="$t('dashboard.user_info.group')">
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
