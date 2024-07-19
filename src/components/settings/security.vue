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
  <v-select
    label="密码复杂度验证等级设置"
    hint="可根据不同的安全要求设置不同的密码复杂度验证等级"
    v-model.number="setting_data.security.password_level"
    :items="password_level"
    item-title='info'
    item-value='level'
    persistent-hint
  ></v-select>
  <v-divider/>
  <!--  <v-checkbox-->
  <!--    v-model="setting_data.security.force_otp_bind"-->
  <!--    label="强制绑定OTP令牌"-->
  <!--  ></v-checkbox>-->
  <v-text-field type="number" label="验证码重发时间(秒)" hint="到达该时间后，用户可发起重新发送验证码请求"
                persistent-hint v-model.number="setting_data.security.auth_code_resend_interval"></v-text-field>
  <v-text-field type="number" label="验证码超时时间(分)" hint="当验证码超过该时间时自动失效" persistent-hint
                v-model.number="setting_data.security.auth_code_timeout"></v-text-field>
  <v-text-field type="number" label="邮件验证码长度" hint="操作验证的验证码长度" persistent-hint
                v-model.number="setting_data.security.auth_code_length"></v-text-field>
  <v-divider/>
  <v-text-field type="number" label="登录失败次数限制" hint="用户尝试登录失败次数超过该值时，锁定客户端IP"
                persistent-hint v-model.number="setting_data.security.login_error_count"></v-text-field>
  <v-text-field type="number" label="登录限制时长(分)" hint="当用户IP被登录限制后，需要多久才能重新登录" persistent-hint
                v-model.number="setting_data.security.login_expiry"></v-text-field>
</template>

<style scoped>

</style>
