<script>
export default {
  name: "message_settings",
  props: {
    setting_data: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <p class="text-h6 setting_subtitle">消息设置</p>
  <div>
    <div class="text-caption">
      发件方式
    </div>
    <v-select
      :items="[{title: '邮件', value: 'email'}, {title: '短信', value: 'SMS'}]"
      item-title="title"
      item-value="value"
      v-model="setting_data.message.message_send_type"
    ></v-select>
  </div>
  <v-divider></v-divider>
  <div class="msg_email" v-if="setting_data.message.message_send_type === 'email'">
    <p class="text-h5 setting_subtitle">邮件设置</p>
    <div>
      <div class="text-caption">
        邮件发件方法
      </div>
      <v-select
        :items="['stp']"
        v-model="setting_data.message.email_method"
      ></v-select>
    </div>
    <div>
      <div class="text-caption">
        邮件服务器地址
      </div>
      <v-text-field type="text" v-model="setting_data.message.email_host"></v-text-field>
    </div>
    <div>
      <div class="text-caption">
        使能SSL
      </div>
      <v-checkbox :value="true" v-model="setting_data.message.email_ssl" @click="setting_data.message.email_ssl = !setting_data.message.email_ssl"></v-checkbox>
    </div>
    <div>
      <div class="text-caption">
        邮件服务器端口
      </div>
      <v-text-field type="number" v-model.number="setting_data.message.email_port"></v-text-field>
    </div>
    <div>
      <div class="text-caption">
        邮件服务用户名
      </div>
      <v-text-field type="text" v-model="setting_data.message.email_username"></v-text-field>
    </div>
    <div>
      <div class="text-caption">
        邮件服务密码
      </div>
      <v-text-field type="password" v-model="setting_data.message.email_password"></v-text-field>
    </div>
    <div>
      <div class="text-caption">
        邮件发件地址
      </div>
      <v-text-field type="text" v-model="setting_data.message.email_from_address"></v-text-field>
    </div>
    <div>
      <div class="text-caption">
        邮件发件人
      </div>
      <v-text-field type="text" v-model="setting_data.message.email_from_name"></v-text-field>
    </div>
  </div>
  <div class="msg_SMS" v-if="setting_data.message.message_send_type === 'SMS'">
    短信服务暂未实现
  </div>
</template>

<style scoped>

</style>
