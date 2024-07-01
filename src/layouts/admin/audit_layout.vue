<script>
import operationLog from "@/components/tables/auditPage/operationLog.vue";
import systemLog from "@/components/tables/auditPage/systemLog.vue";
import accessLog from "@/components/tables/auditPage/accessLog.vue";
import fileChangeLog from "@/components/tables/auditPage/fileChangeLog.vue";
import UserSessionLog from "@/components/tables/auditPage/userSessionLog.vue";
import NodeSessionLog from "@/components/tables/auditPage/nodeSessionLog.vue";
import TerminalCommandAudit from "@/components/tables/auditPage/terminalCommandAudit.vue";

export default {
  name: "audit_layout",
  components: {TerminalCommandAudit, NodeSessionLog, UserSessionLog, fileChangeLog, accessLog, systemLog, operationLog},
  data: () => {
    return {
      tab: null
    }
  }
}
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
    >
      <v-tab value="operation_log">操作日志</v-tab>
      <v-tab value="System_log">系统日志</v-tab>
      <v-tab value="Access_log">访问日志</v-tab>
      <v-tab value="File_change_log">文件修改日志</v-tab>
      <v-tab value="User_Session_log">用户会话日志</v-tab>
      <v-tab value="Node_Session_log">节点会话日志</v-tab>
      <v-tab value="Terminal_Command_audit">终端命令审计</v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="operation_log">
          <operation-log/>
        </v-window-item>
        <v-window-item value="System_log">
          <system-log/>
        </v-window-item>
        <v-window-item value="Access_log">
          <access-log/>
        </v-window-item>
        <v-window-item value="File_change_log">
          <file-change-log/>
        </v-window-item>
        <v-window-item value="User_Session_log">
          <user-session-log/>
        </v-window-item>
        <v-window-item value="Node_Session_log">
          <node-session-log/>
        </v-window-item>
        <v-window-item value="Terminal_Command_audit">
          <terminal-command-audit/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
