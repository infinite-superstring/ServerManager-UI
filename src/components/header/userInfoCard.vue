<script>
import axios from "axios";
import bus from 'vue3-eventbus'
import notice from '@/scripts/utils/notice'
import bus_constant from "@/scripts/constant/bus_constant";
import {getUnreadCountApi} from "@/scripts/apis/message";
import format from "@/scripts/utils/format";

export default {
  name: "userInfoCard",
  computed: {
    format() {
      return format
    }
  },
  data() {
    return {
      ws: null,
      reconnecting: false, // ws 是否正在重连
      avatar: "/api/userInfo/getAvatar?v" + Math.random(),
      unread: 0,
    }
  },
  mounted() {
    this.getUnread()
    bus.on(bus_constant.UPDATE_AVATAR, () => {
      this.avatar = "/api/userInfo/getAvatar?v" + Math.random()
    })
    bus.on(bus_constant.UPDATE_USER_INFO, () => {
      this.$user.getUserInfo()
    })
    /*已读所有消息事件 清空未读消息数量*/
    // bus.on('update:Unread', () => {
    //   this.unread = 0
    // })

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
    toMessage() {
      bus.emit(bus_constant.TO_MESSAGE)
      this.$router.push({name: 'message'})
    },
    /**
     * 获取未读消息数量
     */
    getUnread() {
      getUnreadCountApi().then(res => {
        this.unread = res.data.data
      })
    },
    messageWs(event) {
      try {
        let msg = JSON.parse(event.data)
        if (msg.type === 'newMessage') {
          notice.info('您有一条新消息')
          this.unread = Number.isSafeInteger(msg.data) ? msg.data : 0
          bus.emit(bus_constant.UPDATE_MESSAGE, this.unread)
        } else if (msg.type === 'unread') {
          this.unread = Number.isSafeInteger(msg.data) ? msg.data : 0
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
          <v-badge v-if="unread" dot color="red" offset-x="-40" offset-y="-22"/>
          <v-avatar :image="avatar"></v-avatar>
        </template>
        <span class="username">{{ $user.userName }}</span>
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
        <template v-slot:append>
          <v-badge v-if="unread" :content="format.maximumNumber(unread, 1000)" class="badge" color="red" inline/>
        </template>
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
