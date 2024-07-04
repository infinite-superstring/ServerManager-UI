<script>
export default {
  name: "init_user_bind_OTP",
  data() {
    return {
      qr_code: "otpauth://totp/LoongArch-ServerManager:admin%40admin?secret=W6WM6UX36PRHSKXYMKD2F4NQYW3D467W&issuer=LoongArch-ServerManager",
      input_code: null
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
          v-model="otp_code"
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
