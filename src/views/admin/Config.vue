<script>
import Settings from "@/layouts/admin/setting_layout.vue";

export default {
  name: "system_setting",
  components: {Settings},
}
</script>

<template>
  <v-card title="系统设置" class="pageMain-card">
    <v-card-text>
      <settings></settings>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.v-card-text {
  display: flex;
  min-height: 90%;
  width: 95%;
  margin: 0 auto;
  border: rgba(0,0,0,0.2) solid 0.5px;
  border-radius: 15px;
}
</style>
