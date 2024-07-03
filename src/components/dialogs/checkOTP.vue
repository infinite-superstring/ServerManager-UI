<script>
import axios from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";

export default {
  name: "checkOTP",
  data() {
    return {
      otp: null,
      flag: true,
    }
  },
  props: ['close', 'confirm'],
  watch: {
    otp(val) {
      if (val.length === 6) {
        axios.get('/api/auth/OTP/verify/checkOTP', {
          params: {
            code: val
          }
        }).then(() => {
          this.confirm(val)
        }).catch(() => {
          this.otp = ""
        })
      }
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="flag"
    @close="close()"
  >
    <v-sheet
      class="py-8 px-6 mx-auto ma-4 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h3 class="text-h5">操作验证</h3>

      <div class="text-subtitle-2 font-weight-light mb-3">请输入您的OTP手机令牌</div>

      <v-otp-input
        v-model="otp"
        class="mb-8"
        divider="•"
        length="6"
        variant="outlined"
      ></v-otp-input>
    </v-sheet>
  </v-dialog>

</template>

<style scoped>

</style>
