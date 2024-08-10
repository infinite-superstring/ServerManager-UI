<script>
import QR_Code from "@/scripts/utils/QR_Code";
import message from "@/scripts/utils/message";
import initUser from "@/scripts/utils/initUser";
import OTP_CheckAndBind from "@/scripts/apis/OTP_CheckAndBind";

export default {
  name: "force_bind__verify_otp",
  props: {
    qrcode: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      code: null,
      error: false
    }
  },
  methods: {
    submit() {
      if (!this.code || this.code.length !== 6) {
        return message.showError(this, "令牌未填写完整")
      }
      this.error = false
      return new OTP_CheckAndBind.bind().verifyOTP_Code(this.code).catch(() => {
        this.error = true
        this.code = null
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      QR_Code.showQR_Code(this.$refs.qr_show_img, this.qrcode)
    })
  }
}
</script>

<template>
  <v-card-text class="text-center mx-auto align-center">
    <canvas ref="qr_show_img"></canvas>
    <div class="text-body-2">
      请扫描上方的二维码并输入动态令牌
    </div>
    <v-sheet color="surface">
      <v-otp-input
        v-model="code"
        type="password"
        variant="solo"
        :error="error"
      />
    </v-sheet>
  </v-card-text>
</template>

<style scoped>

</style>
