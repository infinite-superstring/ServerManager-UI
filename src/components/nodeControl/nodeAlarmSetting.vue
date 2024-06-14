<script>
export default {
  name: "nodeAlarmSetting"
}
</script>

<template>
  <div class="alarm_setting">
    <p class="text-h6 setting_subtitle">告警基础设置</p>

    <v-switch
      color="primary"
      density="compact"
      label="启用节点告警"
      hint="启用该节点的负载告警系统，如当前节点负载超过设定值将会给节点组内设置的消息接收人发送消息"
      persistent-hint
    ></v-switch>
    <v-text-field
      type="number"
      variant="underlined"
      label="告警延迟时间"
      hint="当节点某个告警项超过阈值时并不会立即发出告警，需持续超过该值设定的时间后才会触发（该值不宜过小，否则可能会引发误报）"
      persistent-hint
    ></v-text-field>
    <v-divider/>
    <div class="alarm_rule">
      <p class="text-h6 setting_subtitle">CPU告警设置</p>
      <v-switch
        color="primary"
        density="compact"
        label="启用"
        hint="启用CPU负载告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        variant="underlined"
        label="告警阈值(百分比)"
        hint="当CPU总体占用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>

      <v-divider/>
      <p class="text-h6 setting_subtitle">内存告警设置</p>
      <v-switch
        color="primary"
        density="compact"
        label="启用"
        hint="启用内存使用率告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        variant="underlined"
        label="告警阈值(百分比)"
        hint="当内存使用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <p class="text-h6 setting_subtitle">网络告警设置</p>
      <v-switch
        color="primary"
        density="compact"
        label="启用"
        hint="启用内存使用率告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        type="number"
        variant="underlined"
        density="compact"
        label="发送数据告警阈值(bytes/s)"
        hint="当每秒发送的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-text-field
        type="number"
        variant="underlined"
        density="compact"
        label="接收数据告警阈值(bytes/s)"
        hint="当每秒接收的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <p class="text-h6 setting_subtitle">磁盘告警设置</p>
      <v-switch
        color="primary"
        density="compact"
        label="启用"
        hint="启用磁盘空间使用率告警规则，请在下表中输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-card class="ma-3">
        <v-card-text>
          <v-table>
            <thead>
            <tr>
              <th class="text-left">
                磁盘(设备)
              </th>
              <th class="text-left">
                阈值
              </th>
              <th class="text-left">
                操作
              </th>
            </tr>
            </thead>
            <tbody>
            <tr
            >
              <td>
                <v-select
                  variant="underlined"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                  label="磁盘设备"
                  hint="请选择要检查的磁盘设备"
                  persistent-hint
                ></v-select>
              </td>
              <td>
                <v-text-field
                  type="number"
                  variant="underlined"
                  label="告警阈值(百分比)"
                  hint="当该磁盘空间使用率超过该值时触发告警"
                  persistent-hint
                ></v-text-field>
              </td>
              <td>
                <v-btn variant="text" color="red" icon title="删除该条规则"><v-icon icon="mdi-close"></v-icon></v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-btn base-color="green" block>
            <v-icon icon="mdi:mdi-plus"/>
            添加规则
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="actionButton">
      <v-btn base-color="green">
        保存
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.alarm_setting {
  padding: 0 5px;
}

.actionButton {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.v-switch {
  margin-left: 5px;
}
</style>
