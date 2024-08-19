<script>
import UserSessionLog from "@/components/tables/auditPage/userSessionLog.vue";
import NodeSessionLog from "@/components/tables/auditPage/nodeSessionLog.vue";
import WebStatusLog from '@/components/tables/auditPage/webStatusLog.vue'
import ClusterTaskAudit from "@/components/tables/auditPage/clusterTaskAudit.vue";
import operationLog from "@/components/tables/auditPage/operationLog.vue";
import systemLog from "@/components/tables/auditPage/systemLog.vue";
import accessLog from "@/components/tables/auditPage/accessLog.vue";
import fileChangeLog from "@/components/tables/auditPage/fileChangeLog.vue";
import TerminalCommandAudit from "@/components/tables/auditPage/terminalCommandAudit.vue";

export default {
  name: "audit_layout",
  components: {
    ClusterTaskAudit,
    NodeSessionLog,
    UserSessionLog,
    WebStatusLog,
    TerminalCommandAudit,
    fileChangeLog,
    accessLog,
    systemLog,
    operationLog
  },
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
      show-arrows
    >
      <v-tab
        value="operation_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        操作日志
      </v-tab>
      <v-tab
        value="System_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        系统日志
      </v-tab>
      <v-tab
        value="Access_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        访问日志
      </v-tab>
      <v-tab
        value="File_change_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        文件修改日志
      </v-tab>
      <v-tab
        value="User_Session_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        用户会话日志
      </v-tab>
      <v-tab
        value="Node_Session_log"
        v-if="$user.check_user_permission('viewAudit')"
      >
        节点会话日志
      </v-tab>
      <v-tab
        value="web_status_log"
        v-if="$user.check_user_permission(['viewAudit', 'viewWebStatus'])"
      >
        网站监控日志
      </v-tab>
      <v-tab
        value="cluster_task_audit"
        v-if="$user.check_user_permission(['viewAudit', 'clusterTask'])"
      >
        集群任务审计
      </v-tab>
      <v-tab
        value="Terminal_Command_audit"
        v-if="$user.check_user_permission('viewAudit')"
      >
        终端命令审计
      </v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item
          value="operation_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <operation-log/>
        </v-window-item>
        <v-window-item
          value="System_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <system-log/>
        </v-window-item>
        <v-window-item
          value="Access_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <access-log/>
        </v-window-item>
        <v-window-item
          value="File_change_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <file-change-log/>
        </v-window-item>
        <v-window-item
          value="User_Session_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <user-session-log/>
        </v-window-item>
        <v-window-item
          value="Node_Session_log"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <node-session-log/>
        </v-window-item>
        <v-window-item
          value="web_status_log"
          v-if="$user.check_user_permission(['viewAudit', 'viewWebStatus'])"
        >
          <web-status-log/>
        </v-window-item>
        <v-window-item
          value="cluster_task_audit"
          v-if="$user.check_user_permission(['viewAudit', 'clusterTask'])"
        >
          <cluster-task-audit/>
        </v-window-item>
        <v-window-item
          value="Terminal_Command_audit"
          v-if="$user.check_user_permission('viewAudit')"
        >
          <terminal-command-audit/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
