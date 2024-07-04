<script>
import axios from "@/scripts/utils/axios";
import QR_Code from "@/scripts/utils/QR_Code";
import message from "@/scripts/utils/message";

export default {
  name: "init_user_bind_OTP",
  props: ['qrcode'],
  mounted() {
    this.$nextTick(() => {
      QR_Code.showQR_Code(this.$refs.qr_show_img, this.qrcode)
    })
  },
  data() {
    return {
      input_code: "",
      error: false
    }
  },
  methods: {
    submit() {
      if (this.input_code.length !== 6) {
        return message.showError(this, "令牌未填写完整")
      }
      this.error = false
      return axios.get('/api/initUser/checkOTP_Code', {
        params: {
          code: this.input_code
        }
      }).catch(() => {
        this.error = true
        this.input_code = null
      })
    }
  }
}
</script>

<template>
  <v-card title="绑定OTP令牌" flat>
    <v-card-text class="text-center mx-auto align-center">
      <canvas ref="qr_show_img"></canvas>
      <div class="text-body-2">
        请扫描上方的二维码并输入动态密码
      </div>
      <v-sheet color="surface">
        <v-otp-input
          v-model="input_code"
          type="password"
          variant="solo"
          :error="error"
        ></v-otp-input>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
