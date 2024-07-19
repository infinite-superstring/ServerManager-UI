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
  <p class="text-h6 setting_subtitle">节点心跳设置</p>
  <!--  <div>-->
  <!--    <div class="text-caption">-->
  <!--      节点心跳包间隔（毫秒）-->
  <!--    </div>-->
  <!--    <v-text-field-->
  <!--      type="number"-->
  <!--      v-model.number="setting_data.node.heartbeat_time"-->
  <!--    ></v-text-field>-->
  <!--  </div>-->
  <v-text-field
    type="number"
    label="节点超时时间(毫秒)"
    hint="当节点超过该时间未发送消息时，自动将该节点踢下线"
    persistent-hint
    v-model.number="setting_data.node.timeout"
  ></v-text-field>
  <p class="text-h6 setting_subtitle">节点数据上传与存储</p>
  <v-text-field
    type="number"
    label="节点运行数据上传间隔(秒)"
    hint="设置节点多少秒上传一次使用率数据"
    persistent-hint
    min="3"
    v-model.number="setting_data.node_usage.upload_data_interval"
  ></v-text-field>
  <v-text-field
    type="number"
    label="节点运行数据保存间隔(分)"
    hint="设置多少分钟保存一次节点使用率数据到数据库中"
    persistent-hint
    v-model.number="setting_data.node_usage.data_save_interval"
  ></v-text-field>
  <v-text-field
    type="number"
    label="节点运行数据保存时长(天)"
    hint="设置删除超过该时长的节点资源使用率数据"
    persistent-hint
    v-model.number="setting_data.node_usage.data_storage_time"
  ></v-text-field>
  <v-divider/>
  <v-card>
    <v-card-title>
      <p class="text-h6 setting_subtitle">节点默认告警设置</p>
    </v-card-title>
    <v-card-text>

      <v-switch
        label="启用节点告警"
        hint="启用负载告警系统，节点负载超过设定值将会给集群内设置的用户发送告警消息"
        v-model="setting_data.node_default_alarm_setting.enable"
        color="primary"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        label="告警延迟时间（秒）"
        hint="当某个告警项超过阈值时并不会立即发出告警，需持续超过该值设定的时间后才会触发（该值不宜过小，否则可能会引起误报）"
        v-model.number="setting_data.node_default_alarm_setting.delay_seconds"
        color="primary"
        persistent-hint
      ></v-text-field>
      <v-text-field
        type="number"
        v-model.number="setting_data.node_default_alarm_setting.interval"
        color="primary"
        label="告警间隔时间（秒）"
        hint="当节点告警触发后，需达到设定的时间后才会被重新触发"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <v-switch
        v-model="setting_data.node_default_alarm_setting.cpu__enable"
        color="primary"
        density="compact"
        label="启用CPU占用率告警"
        hint="启用CPU占用率告警规则，请在下面设置告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        v-model.number="setting_data.node_default_alarm_setting.cpu__enable"
        label="告警阈值(百分比)"
        hint="当CPU总体占用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <v-switch
        v-model="setting_data.node_default_alarm_setting.memory__enable"
        color="primary"
        density="compact"
        label="启用内存使用率告警"
        hint="启用内存使用率告警规则，请在下面设置告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        v-model.number="setting_data.node_default_alarm_setting.memory__threshold"
        label="告警阈值(百分比)"
        hint="当内存使用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <v-switch
        v-model="setting_data.node_default_alarm_setting.network__enable"
        color="primary"
        density="compact"
        label="启用网络数据包发送速率告警"
        hint="启用网络数据包发送速率告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        v-model.number="setting_data.node_default_alarm_setting.network__send_threshold"
        label="发送数据告警阈值(bytes/s)"
        hint="当每秒发送的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-text-field
        type="number"
        v-model.number="setting_data.node_default_alarm_setting.network__receive_threshold"
        label="接收数据告警阈值(bytes/s)"
        hint="当每秒接收的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>

    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
