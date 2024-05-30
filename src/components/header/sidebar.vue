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
  created() {
    this.UserStore = useUserStore()
  },
  data() {
    return {
      UserStore: null
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
    base-color="#FAFAFA"
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
      <v-list-item :to="{name: 'nodeList'}" title="节点列表" prepend-icon="mdi:mdi-monitor"></v-list-item>
      <v-list-item title="网站监控" prepend-icon="mdi:mdi-web-check"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="管理" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'userManagement'}" title="用户管理" prepend-icon="mdi:mdi-account-details-outline" v-if="UserStore.check_user_permission('manageUser')"></v-list-item>
      <v-list-item :to="{name: 'permissionManagement'}" title="权限管理" prepend-icon="mdi:mdi-account-cog-outline" v-if="UserStore.check_user_permission('managePermissionGroup')"></v-list-item>
      <v-list-item :to="{name: 'audit'}" title="审计与日志" prepend-icon="mdi:mdi-chart-timeline" v-if="UserStore.check_user_permission('viewAudit')"></v-list-item>
      <v-list-item :to="{name: 'settings'}" title="设置" prepend-icon="mdi:mdi-cogs" v-if="UserStore.check_user_permission('changeSettings')"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="浏览" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'about'}" title="关于" prepend-icon="mdi:mdi-copyright"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
