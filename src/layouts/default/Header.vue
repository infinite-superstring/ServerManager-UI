<template>
  <v-app-bar color="primary" v-if="!$route.meta.hide_app_bar">
    <v-app-bar-nav-icon v-if="!$route.meta.hide_sidebar" @click.stop="menu = !menu" title="展开侧边菜单">
      <v-icon icon="mdi-menu"/>
    </v-app-bar-nav-icon>

    <v-app-bar-title>{{ $default_title }}</v-app-bar-title>
    <template v-slot:append>
      <router-view name="appBarBtn"></router-view>
    </template>
  </v-app-bar>
  <header_sidebar :display="menu" v-if="!$route.meta.hide_sidebar"></header_sidebar>
</template>

<script>
import header_sidebar from "@/components/header/sidebar.vue";
import UserInfoCard from "@/components/header/userInfoCard.vue";
import LogoutBtn from "@/components/header/logout.vue";
import router from "@/router";
export default {
  components: {LogoutBtn, UserInfoCard, header_sidebar},
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    router
  },
}
</script>
<style lang="scss" scoped>

</style>
