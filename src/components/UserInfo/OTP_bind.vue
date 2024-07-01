<script>
import CheckUserEmail from "@/components/dialogs/userInfo/checkUserEmail.vue";
import message from "@/scripts/utils/message";
import axios from "@/scripts/utils/axios";

export default {
  name: "OTP_bind",
  components: {CheckUserEmail},
  data() {
    return {
      flag: false,
      code_len: null
    }
  },
  created() {
  },
  methods: {
    bindOTP() {
      axios.get("api/auth/OTP/sendEmailCode").then(res => {
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
    }
  }
}
</script>

<template>
  <v-card title="OTP手机令牌">
    <v-card-text>
      <v-container>
        <span><v-icon icon="mdi:mdi-alert" size="32px" color="error"></v-icon> 未绑定OTP手机令牌</span>
        <v-btn color="primary" size="small" @click="bindOTP">去绑定</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
  <div>
    <check-user-email :flag="flag" :input-len="code_len"/>
  </div>
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
