<script>

import base_settings from "@/components/settings/base";
import node_settings from "@/components/settings/node";
import message_settings from "@/components/settings/message";
import message from "@/scripts/utils/message.js"
import axios from "axios";
import Security_Settings from "@/components/settings/security.vue";
import WebStatusSettings from "@/components/settings/WebStatusSettings.vue";
import Terminal_audit from "@/components/settings/terminal_audit.vue";

export default {
  name: "setting_layout",
  components: {Terminal_audit, WebStatusSettings, Security_Settings, node_settings, message_settings, base_settings},
  data: () => {
    return {
      openWindow: "Base_Settings",
      settings: null,
    }
  },
  created() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      /**
       * 获取设置数据
       */
      axios.get('/api/admin/settings/getSettings').then(res => {
        this.settings = res.data
      }).catch(err => {
        console.error(err)
      })
    },
    save() {
      /**
       * 保存设置信息
       */
      axios.post('/api/admin/settings/editSettings', this.settings).then(() => {
        message.showSuccess(this, "设置已保存")
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.message)
      })
    }
  }
}
</script>

<template>
  <div class="workspace">
    <v-window v-model="openWindow" v-if="settings">
      <v-window-item value="Base_Settings">
        <base_settings :setting_data="settings"/>
      </v-window-item>
      <v-window-item value="Security_Settings">
        <Security_Settings :setting_data="settings"/>
      </v-window-item>
      <v-window-item value="Terminal_Audit_Settings">
        <terminal_audit :setting_data="settings"/>
      </v-window-item>
      <v-window-item value="Node_Settings">
        <node_settings :setting_data="settings"/>
      </v-window-item>
      <v-window-item value="Web_Status_Settings">
        <WebStatusSettings :setting_data="settings"/>
      </v-window-item>
      <v-window-item value="Message_Settings">
        <message_settings :setting_data="settings"/>
      </v-window-item>

    </v-window>
    <div class="actionButton">
      <v-btn @click="save()" color="green">保存设置</v-btn>
    </div>
  </div>
  <v-list>
    <v-list-subheader>设置项</v-list-subheader>
    <v-list-item
      color="primary"
      value="Base_Settings"
      @click="openWindow = 'Base_Settings'">
      基础设置
    </v-list-item>
    <v-list-item
      color="primary"
      value="Security_Settings"
      @click="openWindow = 'Security_Settings'">
      安全性设置
    </v-list-item>
    <v-list-item
      color="primary"
      value="Terminal_Audit_Settings"
      @click="openWindow = 'Terminal_Audit_Settings'">
      终端审计设置
    </v-list-item>
    <v-list-item
      color="primary"
      value="Node_Settings"
      @click="openWindow = 'Node_Settings'">
      节点全局设置
    </v-list-item>
    <v-list-item
      color="primary"
      value="Web_Status_Settings"
      @click="openWindow = 'Web_Status_Settings'">
      网站监控设置
    </v-list-item>
    <v-list-item
      color="primary"
      value="Message_Settings"
      @click="openWindow = 'Message_Settings'">
      消息设置
    </v-list-item>

  </v-list>
</template>

<style scoped>
.v-main {
  padding: 15px;
}

.workspace {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.workspace .v-window {
  padding: 15px 35px 0 15px;
}

.workspace .actionButton {
  padding: 15px 0 15px 15px
}

.workspace .actionButton .v-btn {
  margin-right: 15px;
}

.v-list {
  width: 30%;
  min-width: 150px;
  height: min-content;
  border: rgba(0, 0, 0, 0.3) solid 0.3px;
  border-radius: 10px;
  margin-right: 15px;
  margin-top: 15px;
}

.v-list .v-list-item {
  white-space: nowrap
}
</style>
