<script>
export default {
  name: "terminalLogin",
  props: {
    ws: {
      type: Object,
      required: true
    },
  },
  data: () => {
    return {
      host: '127.0.0.1',
      port: 22,
      username: 'root',
      password: ''
    };
  },
  methods: {
    login() {
      this.send({
        action: 'terminal:login',
        data: {
          host: this.host,
          port: this.port,
          username: this.username,
          password: this.password
        }
      })
    },
    send(data) {
      this.ws.send(JSON.stringify(data));
    },

  }

}

</script>

<template>
  <v-sheet class="mx-auto" width="300">
    <v-text-field
      disabled
      v-model="host"
      label="主机位置"
    ></v-text-field>
    <v-text-field
      v-model="port"
      label="端口"
    ></v-text-field>
    <v-text-field
      v-model="username"
      label="用户名"
    ></v-text-field>
    <v-text-field
      type="password"
      v-model="password"
      label="密码"
      clearable
    ></v-text-field>
    <v-btn class="mt-2" block @click="login">登录</v-btn>
  </v-sheet>
</template>

<style scoped>

</style>
