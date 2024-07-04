<template>
  <div class="login">
    <LoginPage/>
  </div>
</template>

<script setup>
import LoginPage from '@/layouts/login.vue';
</script>
<style lang="scss" scoped>
.login {
  height: 100%;
  //background: linear-gradient(120deg,#E0C3FC 0%,#8EC5FC 100%);
  background: linear-gradient(0deg,#F3E7E9 0%,#E3EEFF 100%);
  //background: url("@/assets/images/Login-PC.png") no-repeat;
  //background-size: cover;
}
</style>
