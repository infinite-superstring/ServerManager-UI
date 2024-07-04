<script>
export default {
  name: "Security_Settings",
  props: {
    setting_data: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      password_level: [
        {
          level: 1,
          info: "Level 1 无限制(仅限制长度 6-16位)"
        },
        {
          level: 2,
          info: "Level 2 弱密码(限制数字+英文 6-16位)"
        },
        {
          level: 3,
          info: "Level 3 中密码(限制数字+英文大小写 8-20位)"
        },
        {
          level: 4,
          info: "Level 4 强密码(限制数字+英文大小写+特殊符号 8-20位)"
        }
      ]
    }
  }
}
</script>

<template>
  <p class="text-h5 setting_subtitle">安全性设置</p>
  <div>
    <div class="text-caption">
      密码安全等级设置
    </div>
    <v-select
      v-model.number="setting_data.security.password_level"
      :items="password_level"
      item-title='info'
      item-value='level'
    ></v-select>
  </div>
  <v-checkbox
    v-model="setting_data.security.force_otp_bind"
    label="强制绑定OTP令牌"
  ></v-checkbox>
  <div>
    <div class="text-caption">
      消息验证码重发时间(秒)
    </div>
    <v-text-field type="number" v-model.number="setting_data.security.auth_code_resend_interval"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      消息验证码超时时间(分)
    </div>
    <v-text-field type="number" v-model.number="setting_data.security.auth_code_timeout"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      消息验证码长度
    </div>
    <v-text-field type="number" v-model.number="setting_data.security.auth_code_length"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      登录失败次数限制
    </div>
    <v-text-field type="number" v-model.number="setting_data.security.login_error_count"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      限制登陆时长(分钟)
    </div>
    <v-text-field type="number" v-model.number="setting_data.security.login_expiry"></v-text-field>
  </div>
</template>

<style scoped>

</style>
