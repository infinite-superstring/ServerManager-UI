<script>
export default {
  name: "Security_Settings",
  props: {
    setting_data: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <p class="text-h5 setting_subtitle">安全性设置</p>
  <div>
    <div class="text-caption">
      消息验证码重发时间(秒)
    </div>
    <v-text-field type="number" v-model="setting_data.security.auth_code_resend_interval"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      消息验证码超时时间(分)
    </div>
    <v-text-field type="number" v-model="setting_data.security.auth_code_timeout"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      消息验证码长度
    </div>
    <v-text-field type="number" v-model="setting_data.security.auth_code_length"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      登录失败次数限制
    </div>
    <v-text-field type="number" v-model="setting_data.security.login_error_count"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      限制登陆时长(分钟)
    </div>
    <v-text-field type="number" v-model="setting_data.security.login_expiry"></v-text-field>
  </div>
</template>

<style scoped>

</style>
