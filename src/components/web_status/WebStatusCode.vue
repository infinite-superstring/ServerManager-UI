<script>
export default {
  name: "WebStatusCode",
  props: ['code']
}
</script>

<template>
  <span
    :style="{color:'green'}"
    v-if="/^2/.test(code)">
    <v-icon
      size="x-small">
      mdi-check-circle-outline
    </v-icon>
    在线
  </span>
  <span
    :style="{color:'orange'}"
    v-if="/^3/.test(code)">
    <v-icon size="x-small">
      mdi-help-circle-outline
    </v-icon>
    警告
  </span>
  <span
    :style="{color:'red'}"
    v-if="/^4/.test(code)">
    <v-icon size="x-small">
      mdi-close-circle-outline
    </v-icon>
    离线
  </span>
  <span
    :style="{color:'red'}"
    v-if="/^5/.test(code)">
    <v-icon size="x-small">
      mdi-close-circle-outline
    </v-icon>
    错误
  </span>
  <span
    v-if="code === null"
  >
    <v-icon size="x-small">
      mdi-help-circle-outline
    </v-icon>
    未知
  </span>
</template>

<style scoped>

</style>
