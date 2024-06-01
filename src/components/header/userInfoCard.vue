<script>
import axios from "axios";
import bus from 'vue3-eventbus'
import notice from '@/scripts/utils/notice'

export default {
  name: "userInfoCard",
  data() {
    return {
      ws: null,
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
    this.ws.addEventListener('open', (event) => {
      console.log('消息套接字主机连接成功')
    })
    this.ws.addEventListener('close', (event) => {
      console.error('消息套接字主机连接关闭')
    })
    this.ws.addEventListener('error', (event) => {
      console.error('消息套接字主机连接错误')
    })
    this.ws.addEventListener('message', (event) => {
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
    })
  },
  unmounted() {
    this.ws.close()
    this.ws = null
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
<!--  <v-badge v-if="unread!==0" dot color="error">-->
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
          <!--                  <template v-slot:append>-->
          <!--                    <v-badge-->
          <!--                      v-if="unread > 0"-->
          <!--                      :content="unread"-->
          <!--                      :value="unread > 0"-->
          <!--                      color="error"-->
          <!--                      overlap-->
          <!--                      dot-->
          <!--                    />-->
          <!--                  </template>-->
        </v-list-item>
      </v-list>
    </v-menu>
<!--  </v-badge>-->
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
