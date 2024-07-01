<template>
  <p class="text-h5 setting_subtitle">网站监控设置</p>
  <v-divider/>
  <v-text-field
    v-model.number="setting_data.web_status.timeout"
    type="number"
    variant="underlined"
    label="监控心跳时长(秒)"
    hint="对被监控网站发送心跳数据包的间隔时间,默认10秒"
    persistent-hint
  ></v-text-field>
  <v-text-field
    v-model.number="setting_data.web_status.heartbeat"
    type="number"
    variant="underlined"
    label="监控超时时间(秒)"
    hint="对被监控网站发送心跳数据包的超时时间,默认3秒"
    persistent-hint
  ></v-text-field>
</template>

<script>
export default {
  name: "WebStatusSettings",
  props: {
    setting_data: {
      type: Object,
      required: true,
    }
  }
}
</script>


<style scoped>

</style>
