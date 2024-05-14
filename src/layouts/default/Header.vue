<template>
    <v-app-bar color="primary">
        <v-app-bar-nav-icon v-if="!isLoginPage()" @click.stop = "menu = !menu" title="展开侧边菜单">
            <v-icon icon="mdi-menu" />
        </v-app-bar-nav-icon>

        <v-app-bar-title>LoongArch-Server-Manager</v-app-bar-title>
        <userInfoCard color="primary" v-if="!isLoginPage()" style="height:80%"/>
        <logout-btn/>
        <template v-slot:append>
          <router-view name="appBarBtn"></router-view>
        </template>
    </v-app-bar>
  <header_sidebar :display="menu" v-if="!isLoginPage()"></header_sidebar>
</template>

<script>
import header_sidebar from "@/components/header/sidebar.vue";
import UserInfoCard from "@/components/header/userInfoCard.vue";
import LogoutBtn from "@/components/header/logout.vue";
export default {
  components: {LogoutBtn, UserInfoCard, header_sidebar},
  data() {
    return {
      menu: true,
    }
  },
  methods: {
    isLoginPage() {
      return this.$route?.name === "login";
    }
  },
}
</script>
<style lang="scss" scoped>

</style>
