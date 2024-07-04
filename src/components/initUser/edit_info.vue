<script>
import axios from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";
import validate from "@/scripts/utils/validate";

export default {
  name: "init_user_info",
  data() {
    return {
      email: null,
      password1: null,
      password2: null,
      verify_code: null,
      interval: null
    }
  },
  methods: {
    get_verify_code() {
      if (!validate.validateEmail(this.email)) {return  message.showError(this, "电子邮箱格式不正确，请检查后重试")}
      axios.get("/api/initUser/sendEmailVerifyCode", {
        params: {
          email: this.email,
        }
      }).then(res => {
        this.interval = res.data.data.interval;
        this.startTimeout()
      })
    },
    submit() {
      if (!validate.validateEmail(this.email)) {return  message.showError(this, "电子邮箱格式不正确，请检查后重试")}
      if (!this.password1 || !this.password2) { return message.showError(this, "两次密码均不能为空") }
      if (this.password1 !== this.password2) return message.showError(this, "两次输入的密码不一致")
      if (!this.verify_code) {return message.showError(this, "未输入验证码")}
      return axios.post("/api/initUser/saveUserInfo", {
        email: this.email,
        password: this.password1,
        verify_code: this.verify_code,
      })
    },
    startTimeout() {
      setTimeout(() => {
          this.interval = this.interval - 1
          if (this.interval > 1) {
            this.startTimeout()
          } else {
            this.interval = null
          }
        }, 1000)
    }
  }
}
</script>

<template>
  <v-card title="初始化用户" flat>
    <v-card-text>
      <v-text-field v-model="email" label="邮箱" type="email"></v-text-field>
      <v-text-field v-model="password1" label="密码" type="password"></v-text-field>
      <v-text-field v-model="password2" label="确认密码" type="password"></v-text-field>
      <v-row class="d-flex align-center">
        <v-col cols="max">
          <v-text-field
            v-model="verify_code"
            label="验证码"
            hide-details
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn v-if="!interval" @click="get_verify_code">发送验证码</v-btn>
          <v-btn v-else disabled>冷却中（{{ interval }}s）</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
