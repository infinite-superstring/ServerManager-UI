<script>
export default {
  name: "OTP_bind"
}
</script>

<template>
  <v-card title="OTP手机令牌">
    <v-card-text>
      <v-container>
        <span><v-icon icon="mdi:mdi-alert" size="32px" color="error"></v-icon> 未绑定OTP手机令牌</span>
        <v-btn color="primary" size="small">去绑定</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<style scoped>
  .v-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
