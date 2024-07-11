<template>
  <div class="d-flex align-center justify-center" style="height: 100%; width: 100%">
    <div style="width:60%; min-width: 350px">
      <p class="text-h3 text-center mx-auto my-6">请登录</p>
<!--      <v-img class="mx-auto my-6" max-width="228"-->
<!--             src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>-->

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">账户</div>

        <v-text-field
          density="compact"
          placeholder="输入您的用户名"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="username"
        >
        </v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">密码</div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact" placeholder="输入您的密码" prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible">
        </v-text-field>

        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="submit">
          登录
        </v-btn>
      </v-card>
    </div>
  </div>
</template>

<script>
import message from "@/scripts/utils/message";

export default {
  data: () => ({
    visible: false,
    username: '',
    password: '',
  }),
  methods: {
    submit() {
      if (!this.username) {return message.showWarning(this, "用户名不能为空")}
      if (!this.password) {return message.showWarning(this, "密码不能为空")}
      this.$user.login(this.username, this.password).then(() => {
        this.$user.getUserInfo().then(() => {
          this.$router.push({name: "dashboard"})
        })
      })
    },
  }
}

</script>

<style lang="scss" scoped>
@import "@/styles/LoginPage/login";
</style>
