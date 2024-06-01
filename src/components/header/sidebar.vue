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
  watch: {
    display(val) {
      const docs = document.querySelectorAll(".v-navigation-drawer .list_group_item")

      for (let i = 0; i < docs.length; i++) {
        if (!val) {
          console.log(docs[i].classList)
          docs[i].classList.add("open")
          docs[i].classList.remove('close')
        } else {
          console.log(docs[i].classList)
          docs[i].classList.add("close")
          docs[i].classList.remove("open")
        }
      }
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
    base-color="#FAFAFA"
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
          <v-list-item class="list_group_title" v-bind="props" title="节点管理器"
                       prepend-icon="mdi:mdi-server-network"></v-list-item>
        </template>
        <v-list-item class="list_group_item close" :to="{name: 'nodeList'}" title="节点列表" density="compact"
                     prepend-icon="mdi:mdi-dns-outline"></v-list-item>
        <v-list-item class="list_group_item close" title="集群指令" density="compact"
                     prepend-icon="mdi:mdi-console"></v-list-item>
        <v-list-item class="list_group_item close" title="集群任务" density="compact"
                     prepend-icon="mdi:mdi-timeline-outline"></v-list-item>
      </v-list-group>
      <v-list-item title="网站监控" prepend-icon="mdi:mdi-web-check"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="管理" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'userManagement'}" title="用户管理" prepend-icon="mdi:mdi-account-details-outline"
                   v-if="UserStore.check_user_permission('manageUser')"></v-list-item>
      <v-list-item :to="{name: 'permissionManagement'}" title="权限管理" prepend-icon="mdi:mdi-account-cog-outline"
                   v-if="UserStore.check_user_permission('managePermissionGroup')"></v-list-item>
      <v-list-item :to="{name: 'audit'}" title="审计与日志" prepend-icon="mdi:mdi-chart-timeline"
                   v-if="UserStore.check_user_permission('viewAudit')"></v-list-item>
      <v-list-item :to="{name: 'settings'}" title="设置" prepend-icon="mdi:mdi-cogs"
                   v-if="UserStore.check_user_permission('changeSettings')"></v-list-item>
      <v-divider/>
      <v-list-item subtitle="浏览" v-if="!display"></v-list-item>
      <v-list-item :to="{name: 'about'}" title="关于" prepend-icon="mdi:mdi-copyright"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.v-list-group {
  .v-list-item:not(.list_group_title).open {
    padding-left: 25px !important;
  }

  .v-list-item:not(.list_group_title).close {
    padding-left: 8px !important;
  }
}

</style>
