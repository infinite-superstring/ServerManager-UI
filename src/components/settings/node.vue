<script>
export default {
  name: "node_settings",
  props: {
    setting_data: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <p class="text-h5 setting_subtitle">节点数据上传与存储</p>
  <div>
    <div class="text-caption">
      节点运行数据上传间隔（秒）
    </div>
    <v-text-field type="number" v-model="setting_data.node_usage.upload_data_interval"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      节点运行数据保存间隔（分）
    </div>
    <v-text-field type="number" v-model="setting_data.node_usage.data_save_interval"></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      节点运行数据保存时间（天）
    </div>
    <v-text-field type="number" v-model="setting_data.node_usage.data_storage_time"></v-text-field>
  </div>
</template>

<style scoped>

</style>
