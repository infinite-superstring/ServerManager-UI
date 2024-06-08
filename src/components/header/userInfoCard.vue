<script>
import axios from "axios";
import bus from 'vue3-eventbus'
import notice from '@/scripts/utils/notice'

export default {
  name: "userInfoCard",
  data() {
    return {
      ws: null,
      reconnecting: false, // ws 是否正在重连
      username: "UserName",
      group: "未知",
      avatar: "/api/userInfo/getAvatar",
      unread: 0,
    }
  },
  mounted() {
    this.getUserInfo()
    this.getUnread()
    bus.on('update:Avatar', () => {
      this.avatar = "/api/userInfo/getAvatar?v" + Math.random()
    })
    bus.on('update:UserInfo', () => {
      this.getUserInfo()
    })

    this.ws = new WebSocket(`ws://${location.host}/ws/message`)
    this.ws.addEventListener('open', this.openWs)
    this.ws.addEventListener('close', this.closeWs)
    this.ws.addEventListener('error', this.errorWs)
    this.ws.addEventListener('message', this.messageWs)
  },
  unmounted() {
    this.ws.close()
    this.ws = null
    this.reconnecting = true
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
    toMessage() {
      bus.emit('to:Message')
      this.$router.push({name: 'message'})
    },
    getUnread() {
      axios.get("/api/message/getUnread")
        .then(res => {
          this.unread = res.data.data
        })
    },
    messageWs(event) {
      try {
        let msg = JSON.parse(event.data)
        if (msg.type === 'newMessage') {
          notice.info('您有一条新消息')
          this.unread = Number.isSafeInteger(msg.data) ? msg.data : 0
          bus.emit('update:Message', this.unread)
        }
        if (msg.type === '') {
          notice.warning(msg.data)
        }
      } catch (e) {
        console.error(e)
      }

    },
    openWs() {
      console.log("消息套接字连接成功")
    },
    closeWs() {
      console.error("消息套接字连接关闭")
      this.ws = null
      this.resetSocket()
    },
    errorWs() {
      console.error("消息套接字连接错误")
      this.ws = null
      this.resetSocket()
    },
    resetSocket() {
      if (!this.ws && !this.reconnecting) {
        this.reconnecting = true;
        setTimeout(() => {
          this.ws = new WebSocket(`ws://${location.host}/ws/message`);
          const safeOpenWs = () => {
            this.openWs();
            this.ws.removeEventListener('open', safeOpenWs);
          };
          const safeCloseWs = () => {
            this.closeWs();
            this.ws.removeEventListener('close', safeCloseWs);
          };
          const safeErrorWs = () => {
            this.errorWs();
            this.ws.removeEventListener('error', safeErrorWs);
          };
          this.ws.addEventListener('open', safeOpenWs);
          this.ws.addEventListener('close', safeCloseWs);
          this.ws.addEventListener('error', safeErrorWs);
          this.ws.addEventListener('message', this.messageWs);
          this.reconnecting = false;
        }, 10000);
      }
    },
  }
}
</script>

<template>
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
      <v-list-item @click="toMessage">
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
