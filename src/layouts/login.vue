<template>
  <div class="d-flex align-center justify-center" style="height: 100%; width: 100%">
    <div style="width:60%; min-width: 350px">
      <p class="text-h3 text-center mx-auto my-6">
        {{ $t('login.title') }}
      </p>

      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
        <div class="text-subtitle-1 text-medium-emphasis">{{ $t('login.account') }}</div>

        <v-text-field
          density="compact"
          :placeholder="$t('login.account_input')"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          v-model="username"
        >
        </v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">{{ $t('login.password') }}</div>

        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          :placeholder="$t('login.password_input')"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          v-model="password"
          @click:append-inner="visible = !visible">
        </v-text-field>

        <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="submit">
          {{ $t('login.submit') }}
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
      if (!this.username) {return message.showWarning(this, this.$t('login.account_is_empty'))}
      if (!this.password) {return message.showWarning(this, this.$t('login.password_is_empty'))}
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
