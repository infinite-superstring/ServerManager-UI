<template>
  <v-app-bar color="primary">
    <v-app-bar-nav-icon v-if="!hideSideBar()" @click.stop="menu = !menu" title="展开侧边菜单">
      <v-icon icon="mdi-menu"/>
    </v-app-bar-nav-icon>

    <v-app-bar-title>{{ $default_title }}</v-app-bar-title>
    <template v-slot:append>
      <router-view name="appBarBtn"></router-view>
    </template>
  </v-app-bar>
  <header_sidebar :display="menu" v-if="!hideSideBar()"></header_sidebar>
</template>

<script>
import header_sidebar from "@/components/header/sidebar.vue";
import UserInfoCard from "@/components/header/userInfoCard.vue";
import LogoutBtn from "@/components/header/logout.vue";
export default {
  components: {LogoutBtn, UserInfoCard, header_sidebar},
  data() {
    return {
      menu: false,
    }
  },
  methods: {
    hideSideBar() {
      const pages = [
        'login',
        'init_user'
      ]
      return pages.includes(this.$route?.name)
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
