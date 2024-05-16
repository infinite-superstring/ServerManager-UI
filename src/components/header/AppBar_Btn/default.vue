<script>
import UserInfoCard from "@/components/header/userInfoCard.vue";
import LogoutBtn from "@/components/header/logout.vue";

export default {
  name: "appbar_default",
  components: {LogoutBtn, UserInfoCard}
}
</script>

<template>
  <userInfoCard/>
  <logout-btn/>
</template>

<style scoped>

</style>
