<script>
import permission from "@/views/admin/Permission.vue";

export default {
  name: "header_sidebar",
  computed: {
    permission() {
      return permission
    }
  },
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
  methods: {
    close_list_group() {
      if (this.display) {
        this.temp = this.open
        this.open = []
      } else {
        this.open = this.temp
        this.temp = []
      }
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
        title="仪表盘"
        prepend-icon="mdi:mdi-view-dashboard"
      />
      <v-divider/>
      <v-list-item
        subtitle="运维"
        v-if="!display && $user.check_user_permission([
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
            title="节点管理"
            prepend-icon="mdi:mdi-server-network"
            v-if="$user.check_user_permission([
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
          title="节点列表"
          density="compact"
          prepend-icon="mdi:mdi-dns-outline"
          v-if="$user.check_user_permission([
            'editNode',
            'viewAllNode',
            'editNodeGroup'
          ])"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'nodeGroupEdit'}"
          title="集群编辑"
          density="compact"
          prepend-icon="mdi:mdi-group"
          v-if="$user.check_user_permission('editNodeGroup')"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterExecution'}"
          title="集群指令"
          density="compact"
          prepend-icon="mdi:mdi-console">
        </v-list-item>
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterTask'}"
          title="集群任务"
          density="compact"
          prepend-icon="mdi:mdi-timeline-outline"
          v-if="$user.check_user_permission('clusterTask')"
        />
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterFileSend'}"
          title="文件分发"
          density="compact"
          prepend-icon="mdi:mdi-file-send-outline"
          v-if="$user.check_user_permission('clusterFileSend')"
        />
      </v-list-group>
      <v-list-item
        :to="{name:'webStatus'}"
        title="网站监控"
        prepend-icon="mdi:mdi-web-check"
        v-if="$user.check_user_permission('viewWebStatus')"
      />
      <v-divider/>
      <v-list-item
        subtitle="管理"
        v-if="!display && $user.check_user_permission([
          'manageUser',
          'managePermissionGroup',
          'viewAudit',
          'changeSettings'
        ])"
      />
      <v-list-item
        :to="{name: 'userManagement'}"
        title="用户管理"
        prepend-icon="mdi:mdi-account-details-outline"
        v-if="$user.check_user_permission('manageUser')"
      />
      <v-list-item
        :to="{name: 'permissionManagement'}"
        title="权限管理"
        prepend-icon="mdi:mdi-account-cog-outline"
        v-if="$user.check_user_permission('managePermissionGroup')"
      />
      <v-list-item
        :to="{name: 'audit'}"
        title="审计日志"
        prepend-icon="mdi:mdi-chart-timeline"
        v-if="$user.check_user_permission([
          'viewAudit',
          'clusterTask',
          'viewWebStatus'
        ])"
      />
      <v-list-item
        :to="{name: 'settings'}"
        title="系统设置"
        prepend-icon="mdi:mdi-cogs"
        v-if="$user.check_user_permission('changeSettings')"
      />
      <v-divider/>
      <v-list-item
        subtitle="其他"
        v-if="!display"
      />
      <v-list-item
        title="值班记录"
        :to="{name: 'duty'}"
        prepend-icon="mdi:mdi-calendar-clock"
        v-if="$user.check_user_permission('viewDuty')"
      />
      <v-list-item
        :to="{name: 'patrol'}"
        title="设备巡检"
        prepend-icon="mdi-application-edit-outline"
        v-if="$user.check_user_permission('viewPatrol')"
      />
      <v-list-item
        :to="{name: 'about'}"
        title="关于系统"
        prepend-icon="mdi:mdi-copyright"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
