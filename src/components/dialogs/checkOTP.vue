<script>
export default {
  name: "checkOTP",
  data() {
    return {
      otp: null
    }
  },
  watch: {
    otp(val) {
      if (val.length === 6) {
        console.log('ok')
      }
    }
  }
}
</script>

<template>
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
<!--    <div class="text-caption">-->
<!--      <v-btn-->
<!--        color="primary"-->
<!--        size="x-small"-->
<!--        text="Send New Code"-->
<!--        variant="text"-->
<!--        @click="otp = ''"-->
<!--      ></v-btn>-->
<!--    </div>-->
  </v-sheet>
</template>

<style scoped>

</style>
