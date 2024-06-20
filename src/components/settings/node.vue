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
  <p class="text-h5 setting_subtitle">节点心跳设置</p>
  <div>
    <div class="text-caption">
      节点心跳包间隔（毫秒）
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node.heartbeat_time"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      节点超时时间（毫秒）
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_usage.timeout"
    ></v-text-field>
  </div>
  <p class="text-h5 setting_subtitle">节点数据上传与存储</p>
  <div>
    <div class="text-caption">
      节点运行数据上传间隔（秒）
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_usage.upload_data_interval"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      节点运行数据保存间隔（分）
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_usage.data_save_interval"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      节点运行数据保存时间（天）
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_usage.data_storage_time"
    ></v-text-field>
  </div>
  <v-divider/>
  <p class="text-h5 setting_subtitle">节点默认告警设置</p>
  <div>
    <div class="text-caption">
      启用告警
    </div>
    <v-switch
      v-model="setting_data.node_default_alarm_setting.enable"
      color="primary"
      density="compact"
    ></v-switch>
  </div>
  <div>
    <div class="text-caption">
      告警延迟时间(秒)
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.delay_seconds"
      color="primary"
      density="compact"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      告警间隔时间(秒)
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.interval"
      color="primary"
      density="compact"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      CPU告警启用
    </div>
    <v-switch
      v-model="setting_data.node_default_alarm_setting.cpu__enable"
      color="primary"
      density="compact"
    ></v-switch>
  </div>
  <div>
    <div class="text-caption">
      CPU告警阈值
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.cpu__enable"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      内存告警启用
    </div>
    <v-switch
      v-model="setting_data.node_default_alarm_setting.memory__enable"
      color="primary"
      density="compact"
    ></v-switch>
  </div>
  <div>
    <div class="text-caption">
      内存告警阈值
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.memory__threshold"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      网络告警启用
    </div>
    <v-switch
      v-model="setting_data.node_default_alarm_setting.network__enable"
      color="primary"
      density="compact"
    ></v-switch>
  </div>
  <div>
    <div class="text-caption">
      发送数据包阈值
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.network__send_threshold"
    ></v-text-field>
  </div>
  <div>
    <div class="text-caption">
      接收数据包阈值
    </div>
    <v-text-field
      type="number"
      v-model.number="setting_data.node_default_alarm_setting.network__receive_threshold"
    ></v-text-field>
  </div>
</template>

<style scoped>

</style>
