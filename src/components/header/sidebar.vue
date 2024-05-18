<script>
import {useUserStore} from "@/store/userInfo";
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
      UserPermissions: useUserStore().permissions
    }
  },
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
    >
      <v-divider/>
      <v-list-item :to="{name: 'dashboard'}" title="仪表盘" prepend-icon="mdi:mdi-view-dashboard"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="运维" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'nodeList'}" title="节点列表" prepend-icon="mdi:mdi-monitor" v-if="UserPermissions.all || UserPermissions.viewDevice"></v-list-item>
      <v-list-item title="网站监控" prepend-icon="mdi:mdi-web-check" v-if="UserPermissions.all || UserPermissions.controllingDevice"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="管理" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'userManagement'}" title="用户管理" prepend-icon="mdi:mdi-account-details-outline" v-if="UserPermissions.all || UserPermissions.manageUsers"></v-list-item>
      <v-list-item :to="{name: 'permissionManagement'}" title="权限管理" prepend-icon="mdi:mdi-account-cog-outline" v-if="UserPermissions.all || UserPermissions.managePermissionGroups"></v-list-item>
      <v-list-item :to="{name: 'audit'}" title="审计与日志" prepend-icon="mdi:mdi-chart-timeline" v-if="UserPermissions.all || UserPermissions.viewAudit"></v-list-item>
      <v-list-item :to="{name: 'settings'}" title="设置" prepend-icon="mdi:mdi-cogs" v-if="UserPermissions.all || UserPermissions.changeSettings"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="浏览" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'about'}" title="关于LoongArch-Server-Manager" prepend-icon="mdi:mdi-copyright"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
