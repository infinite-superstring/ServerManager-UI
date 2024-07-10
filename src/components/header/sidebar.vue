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
      UserStore: null,
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
      <v-divider/>
      <v-list-item :to="{name: 'dashboard'}" title="仪表盘" prepend-icon="mdi:mdi-view-dashboard"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="运维" v-if="!display"></v-list-item>
      <v-list-group value="Node Manager">
        <template v-slot:activator="{ props }">
          <v-list-item
            class="list_group_title"
            v-bind="props"
            title="节点管理器"
            prepend-icon="mdi:mdi-server-network">
          </v-list-item>
        </template>
        <v-list-item
          class="list_group_item"
          :to="{name: 'nodeList'}"
          title="节点列表"
          density="compact"
          prepend-icon="mdi:mdi-dns-outline">
        </v-list-item>
        <v-list-item
          class="list_group_item"
          :to="{name: 'nodeGroupEdit'}"
          title="群组编辑"
          density="compact"
          prepend-icon="mdi:mdi-group">
        </v-list-item>
        <!--        <v-list-item-->
        <!--          class="list_group_item"-->
        <!--          :to="{name: 'clusterExecution'}"-->
        <!--          title="集群指令"-->
        <!--          density="compact"-->
        <!--          prepend-icon="mdi:mdi-console">-->
        <!--        </v-list-item>-->
        <v-list-item
          class="list_group_item"
          :to="{name: 'clusterTask'}"
          title="集群任务"
          density="compact"
          prepend-icon="mdi:mdi-timeline-outline">
        </v-list-item>
      </v-list-group>
      <v-list-item
        :to="{name:'webStatus'}"
        title="网站监控"
        prepend-icon="mdi:mdi-web-check"
        v-if="UserStore.check_user_permission('viewWebStatus')"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="管理" v-if="!display"></v-list-item>
      <v-list-item
        :to="{name: 'userManagement'}"
        title="用户管理"
        prepend-icon="mdi:mdi-account-details-outline"
        v-if="UserStore.check_user_permission('manageUser')">
      </v-list-item>
      <v-list-item
        :to="{name: 'permissionManagement'}"
        title="权限管理"
        prepend-icon="mdi:mdi-account-cog-outline"
        v-if="UserStore.check_user_permission('managePermissionGroup')">
      </v-list-item>
      <v-list-item
        :to="{name: 'audit'}"
        title="审计与日志"
        prepend-icon="mdi:mdi-chart-timeline"
        v-if="UserStore.check_user_permission('viewAudit')">
      </v-list-item>
      <v-list-item
        :to="{name: 'settings'}"
        title="设置"
        prepend-icon="mdi:mdi-cogs"
        v-if="UserStore.check_user_permission('changeSettings')">
      </v-list-item>
      <v-divider/>
      <v-list-item subtitle="浏览" v-if="!display"></v-list-item>
      <v-list-item
        title="值班记录"
        :to="{name: 'duty'}"
        prepend-icon="mdi:mdi-calendar-clock"
        v-if="UserStore.check_user_permission('viewDuty')">
      </v-list-item>
      <v-list-item
        :to="{name: 'patrol'}"
        title="巡检"
        prepend-icon="mdi-application-edit-outline"
        v-if="UserStore.check_user_permission('viewPatrol')">>
      </v-list-item>
      <v-list-item :to="{name: 'about'}" title="关于" prepend-icon="mdi:mdi-copyright"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
