<script>
import OTP_CheckAndBind from "@/scripts/apis/OTP_CheckAndBind";
import message from "@/scripts/utils/message";
import QR_Code from "@/scripts/utils/QR_Code";
import localConfigUtils from "@/scripts/utils/localConfigUtils";

export default {
  name: "force_bind__verify_email",
  data() {
    return {
      email: null,
      code: null,
      error: false,
      interval: null
    }
  },
  created() {
    this.email = localConfigUtils.load_userinfo().email
  },
  methods: {
    get_verify_code() {
      new OTP_CheckAndBind.bind().sendEmailCode().then(res => {
        message.showSuccess(this, "发送成功，请检查您的邮箱")
        this.interval = res.data.data.interval;
        this.code_length = res.data.data.code_len;
        this.startTimeout()
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
    },
    submit() {
      this.error = false
      if (!this.code) {
        this.error = true
        message.showWarning(this, "验证码未填写")
        return false
      }
      return new OTP_CheckAndBind.bind().verifyEmailCode(this.code).catch(() => {
        this.error = true
      })
    }
  }
}
</script>

<template>
  <v-text-field
    v-model="email"
    label="邮箱"
    type="email"
    disabled
  />
  <v-row class="d-flex align-center">
    <v-col cols="max">
      <v-text-field
        v-model="code"
        label="验证码"
        hide-details
        type="number"
        :error="error"
      />
    </v-col>
    <v-col cols="4">
      <v-btn v-if="!interval" @click="get_verify_code">发送验证码</v-btn>
      <v-btn v-else disabled>冷却中（{{ interval }}s）</v-btn>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
