<script>
import QRCode from 'qrcode'
import message from "@/scripts/utils/message";
import OTP_CheckAndBind from "@/scripts/apis/OTP_CheckAndBind";

export default {
  name: "bind_otp",
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
      email_code: "",
      otp_code: "",
      error: false,
      qr_code: '',
    }
  },
  methods: {
    checkEmailCode() {
      /**
       * 检查验证码
       */
      this.error = false
      if (this.email_code.length !== this.inputLen) {
        message.showWarning(this, `请输入${this.inputLen}位验证码`)
        return this.error = true
      }
      new OTP_CheckAndBind.bind().verifyEmailCode(this.email_code).then(res=>{
        this.step = 2
        this.$nextTick(() => {
          this.showQR_Code(this.$refs.qr_show_img, res.data.data.qrcode)
        });
      })
    },
    checkOTP_Code() {
      this.error = false
      if (this.otp_code.length !== 6) {
        message.showWarning(this, "令牌长度不正确，请检查")
        return this.error = true
      }
      new OTP_CheckAndBind.bind().verifyOTP_Code(this.otp_code).then(res => {
        message.showSuccess(this, res.data.msg)
        return this.$emit("success")
      })
    },
    reSendCode() {
      /**
       * 重新发送验证码
       */
      new OTP_CheckAndBind.bind().sendEmailCode().then(res => {
        message.showSuccess(this, res.data.msg)
      })
    },
    showQR_Code(dom, url) {
      /**
       * 显示QR_Code
       */
      QRCode.toCanvas(dom, url, function (error) {
        if (error) console.error(error)
        console.log('success!');
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
          我们向您的邮箱发送了一条用于绑定令牌的邮件 <br>

          请将该邮件附带的验证码填写到下面的输入框中
        </div>

        <v-sheet color="surface">
          <v-otp-input
            v-model="email_code"
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

      <div id="step-2" v-if="step === 2">
        <canvas ref="qr_show_img"></canvas>
        <div class="text-body-2">
          请扫描上方的二维码并输入动态密码
        </div>
        <v-sheet color="surface">
          <v-otp-input
            v-model="otp_code"
            type="password"
            variant="solo"
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
          @click="checkOTP_Code"
        ></v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
