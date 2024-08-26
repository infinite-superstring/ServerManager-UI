<script>
import {check_user_permission} from "@/scripts/utils/permission";

export default {
  name: "header_sidebar",
  props: {
    display: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'update'],
  data() {
    return {
      open: [],
      temp: []
    }
  },
  computed: {
    permission() {
      return permission
    }
  },
  methods: {
    close_list_group() {
      if (this.display) {
        this.temp = this.open
        this.open = []
      } else {
        this.open = this.temp
        this.temp = []
      }
    },
    check_user_permission() {
      return check_user_permission
    }
  },
  watch: {
    display(val) {
      this.close_list_group()
    }
  }
}
</script>

<template>
  <v-navigation-drawer
    class="sidebar"
    :width="330"
    :rail="display"
    disable-route-watcher
    disable-resize-watcher
    permanent
    color="#FAFAFA"
  >
    <v-list
      density="compact"
      nav
      active-color="#039BE5"
      v-model:opened="open"
    >
      <v-list-item
        :to="{name: 'dashboard'}"
        :title="$t('sidebar.dashboard')"
        prepend-icon="mdi:mdi-view-dashboard"
      />
      <v-list-item
        :to="{name: 'screen'}"
        :title="$t('sidebar.screen')"
        prepend-icon="mdi:mdi-cast-variant"
        v-if="check_user_permission('viewDataScreen')"
      />
      <v-divider/>
      <v-list-item
        :subtitle="$t('sidebar.operations.title')"
        v-if="!display && check_user_permission([
           'editNode',
           'viewAllNode',
           'editNodeGroup',
           'clusterExecuteCommand',
           'clusterTask',
           'editWebStatus',
           'viewWebStatus'
        ])"
      />
      <v-list-group value="Node Manager">
        <template v-slot:activator="{ props }">
          <v-list-item
            class="list_group_title"
            v-bind="props"
            :title="$t('sidebar.operations.node_manage.title')"
            prepend-icon="mdi:mdi-server-network"
            v-if="check_user_permission([
              'editNode',
              'viewAllNode',
              'editNodeGroup',
              'clusterExecuteCommand',
              'clusterTask'
            ])"
          />
        </template>
        <v-list-item
          class="list_group_item"
          :to="{name: 'nodeList'}"
          :title="$t('sidebar.operations.node_manage.node_list')"
          density="compact"
          prepend-icon="mdi:mdi-dns-outline"
          v-if="check_user_permission([
            'editNode',
            'viewAllNode',
            'editNodeGroup'
          ])"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'nodeGroupEdit'}"
          :title="$t('sidebar.operations.node_manage.group_edit')"
          density="compact"
          prepend-icon="mdi:mdi-group"
          v-if="check_user_permission('editNodeGroup')"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterExecution'}"
          :title="$t('sidebar.operations.node_manage.group_execution')"
          density="compact"
          prepend-icon="mdi:mdi-console">
        </v-list-item>
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterTask'}"
          :title="$t('sidebar.operations.node_manage.group_task')"
          density="compact"
          prepend-icon="mdi:mdi-timeline-outline"
          v-if="check_user_permission('clusterTask')"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterFileSend'}"
          :title="$t('sidebar.operations.node_manage.group_file_send')"
          density="compact"
          prepend-icon="mdi:mdi-file-send-outline"
          v-if="check_user_permission('clusterFileSend')"
        />
      </v-list-group>
      <v-list-item
        :to="{name:'webStatus'}"
        :title="$t('sidebar.operations.web_status')"
        prepend-icon="mdi:mdi-web-check"
        v-if="check_user_permission('viewWebStatus')"
      />
      <v-divider/>
      <v-list-item
        :subtitle="$t('sidebar.manage.title')"
        v-if="!display && check_user_permission([
          'manageUser',
          'managePermissionGroup',
          'viewAudit',
          'changeSettings'
        ])"
      />
      <v-list-item
        :to="{name: 'userManagement'}"
        :title="$t('sidebar.manage.user_manage')"
        prepend-icon="mdi:mdi-account-details-outline"
        v-if="check_user_permission('manageUser')"
      />
      <v-list-item
        :to="{name: 'permissionManagement'}"
        :title="$t('sidebar.manage.permission_manage')"
        prepend-icon="mdi:mdi-account-cog-outline"
        v-if="check_user_permission('managePermissionGroup')"
      />
      <v-list-item
        :to="{name: 'audit'}"
        :title="$t('sidebar.manage.audit_and_log')"
        prepend-icon="mdi:mdi-chart-timeline"
        v-if="check_user_permission([
          'viewAudit',
          'clusterTask',
          'viewWebStatus'
        ])"
      />
      <v-list-item
        :to="{name: 'settings'}"
        :title="$t('sidebar.manage.system_setting')"
        prepend-icon="mdi:mdi-cogs"
        v-if="check_user_permission('changeSettings')"
      />
      <v-divider/>
      <v-list-item
        :subtitle="$t('sidebar.others.title')"
        v-if="!display"
      />
      <v-list-item
        :to="{name: 'duty'}"
        :title="$t('sidebar.others.duty_record')"
        prepend-icon="mdi:mdi-calendar-clock"
        v-if="check_user_permission('viewDuty')"
      />
      <v-list-item
        :to="{name: 'patrol'}"
        :title="$t('sidebar.others.patrol_record')"
        prepend-icon="mdi-application-edit-outline"
        v-if="check_user_permission('viewPatrol')"
      />
      <v-list-item
        :to="{name: 'about'}"
        :title="$t('sidebar.others.about_system')"
        prepend-icon="mdi:mdi-copyright"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
