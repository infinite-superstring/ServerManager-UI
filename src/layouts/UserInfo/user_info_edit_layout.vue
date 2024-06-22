<script>
import ChangePassword from "@/components/UserInfo/changePassword.vue";
import EditUserInfo from "@/components/UserInfo/editUserInfo.vue";
import otp_bind from "@/components/UserInfo/OTP_bind.vue";

export default {
  name: "UserInfoEdit",
  components: {otp_bind, EditUserInfo, ChangePassword}
}
</script>

<template>
  <div class="userInfoEdit">
    <div class="right">
      <EditUserInfo/>
    </div>
    <div class="left">
      <change-password/>
      <otp_bind/>
    </div>
  </div>


</template>

<style scoped>
.userInfoEdit {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  .right {
    flex: 2;
  }

  .left {
    flex: 1;
    div:not(:last-child) {
      margin-bottom: 15px;
    }
  }
}

@media screen and (max-width: 1024px) {
  .userInfoEdit {
    flex-direction: column;
  }
}
</style>
