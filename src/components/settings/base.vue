<script>
import useClipboard from "vue-clipboard3";
import message from "@/scripts/utils/message";

export default {
  name: "Base_Settings",
  props: {
    setting_data: {
      type: Object,
      required: true
    }
  },
  methods: {
    async copy_server_uuid() {
      try {
        const {toClipboard } = useClipboard()
        await toClipboard(this.setting_data.base.server_token)
        message.showSuccess(this, "复制服务端UUID成功", 1000)
      } catch (e) {
        message.showError(this, "复制失败")
        console.error(e)
      }
    }
  }
}
</script>

<template>
  <p class="text-h5 setting_subtitle">基础设置</p>
  <div>
    <div class="text-caption">
      服务器Token
    </div>
    <div class="input-group">
      <v-text-field
        type="text"
        v-model="setting_data.base.server_token"
        disabled
        density="compact"
        single-line
        hide-details
      >
      </v-text-field>
      <div class="input-group-buttons">
<!--        <v-btn icon>-->
<!--          <v-icon icon="mdi:mdi-refresh"/>-->
<!--        </v-btn>-->
        <v-btn icon @click="copy_server_uuid()">
          <v-icon icon="mdi:mdi-clipboard-text-outline"/>
        </v-btn>
      </div>
    </div>
  </div>
  <div>
    <div>
      <div class="text-caption">
        Session到期时间(分)
      </div>
      <v-text-field type="number" v-model="setting_data.base.session_expiry"></v-text-field>
    </div>
    <v-divider></v-divider>
    <p class="text-h5 setting_subtitle">日志设置</p>
    <div>
      <div class="text-caption">
        将debug输出到文件
      </div>
      <v-checkbox></v-checkbox>
    </div>
    <div>
      <div class="text-caption">
        日志保留时长(天)
      </div>
      <v-text-field type="number"></v-text-field>
    </div>
    <v-divider></v-divider>
    <p class="text-h5 setting_subtitle">审计设置</p>
    <div>
      <div class="text-caption">
        审计日志保留时长(天)
      </div>
      <v-text-field type="number"></v-text-field>
    </div>
  </div>
</template>

<style scoped>

</style>
