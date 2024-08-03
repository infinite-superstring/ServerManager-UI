<script>
import OTP_CheckAndBind from "@/scripts/apis/OTP_CheckAndBind";
import message from "@/scripts/utils/message";

export default {
  name: "unbind_otp",
  props: {
    flag: {
      type: Boolean,
      required: true,
    },
    inputLen: {
      type: Number,
      required: true,
    }
  },
  emits: ["close", 'success'],
  data() {
    return {
      step: 1,
      code: "",
      error: false,
    }
  },
  methods: {
    checkEmailCode() {
      this.error = false
      if (this.code.length !== this.inputLen) {
        return this.error = true
      }
      new OTP_CheckAndBind.unbind().verifyEmailCode(this.code).then(res => {
        message.showSuccess(this, res.data.msg)
        return this.$emit("success")
      })
    },
    reSendCode() {
      new OTP_CheckAndBind.unbind().sendEmailCode().then(res => {
        message.showSuccess(this, res.data.msg)
        this.code_len = res.data.data.code_len
      })
    }
  }
}
</script>

<template>
  <v-dialog
    :model-value="flag"
    @close="$emit('close')"
  >
    <v-card
      class="py-8 px-6 text-center mx-auto ma-4 align-center"
      elevation="12"
      max-width="400"
      width="100%"
    >
      <div id="step-1" v-if="step === 1">
        <h3 class="text-h6 mb-4">验证您的账户</h3>

        <div class="text-body-2">
          我们向您的邮箱发送了一条用于解绑令牌的邮件 <br>

          请将该邮件附带的验证码填写到下面的输入框中
        </div>

        <v-sheet color="surface">
          <v-otp-input
            v-model="code"
            type="password"
            variant="solo"
            :length="inputLen"
            :error="error"
          ></v-otp-input>
        </v-sheet>

        <v-btn
          class="my-4"
          color="primary"
          height="40"
          text="验证"
          variant="flat"
          width="70%"
          @click="checkEmailCode"
        ></v-btn>

        <div class="text-caption">
          没有收到验证码？ <a class="text-blue-darken-3" href="#" @click.prevent="reSendCode">重新发送</a>
        </div>
      </div>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>
