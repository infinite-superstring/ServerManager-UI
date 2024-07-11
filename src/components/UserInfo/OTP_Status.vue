<script>
import bind_otp from "@/components/dialogs/OTP/bind_OTP.vue";
import message from "@/scripts/utils/message";
import axios from "@/scripts/utils/axios";
import {useUserStore} from "@/store/userInfo";
import dialogs from "@/scripts/utils/dialogs";

export default {
  name: "OTP_bind",
  computed: {
    dialogs() {
      return dialogs
    }
  },
  components: {bind_otp},
  data() {
    return {
      flag: false,
      code_len: null,
      userStore: useUserStore()
    }
  },
  created() {
  },
  methods: {
    useUserStore,
    bindOTP() {
      axios.get("/api/auth/OTP/bind/sendEmailCode").then(res => {
        if (res.data.status !== 1) {
          return message.showError(res.data.msg)
        }
        this.code_len = res.data.data.code_len
        this.flag = true
        message.showSuccess(this, res.data.msg)
      }).catch(err=> {
        console.err(err)
        message.showApiErrorMsg(this, err.message)
      })
    },
    test() {
      dialogs.showVerifyOTP_Dialog().then(val=>{
        console.log(val)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<template>
  <v-card title="OTP手机令牌">
    <v-card-text>
      <v-container v-if="!userStore.enableOTP">
        <span><v-icon icon="mdi:mdi-alert" size="32px" color="error"></v-icon> 未绑定OTP手机令牌</span>
        <v-btn color="primary" size="small" @click="bindOTP">去绑定</v-btn>
      </v-container>
      <v-container v-if="userStore.enableOTP">
        <span><v-icon icon="mdi:mdi-check" size="32px" color="success"></v-icon> 已绑定OTP手机令牌</span>
      </v-container>
<!--      <v-btn color="primary" size="small" @click="test">测试</v-btn>-->
    </v-card-text>
  </v-card>
  <div>
    <bind_otp :flag="flag" :input-len="code_len" @close="flag=false" @success="userStore.enableOTP=true; flag=false"/>
  </div>
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
