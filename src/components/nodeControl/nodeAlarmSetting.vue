<script>
import message from "@/scripts/utils/message";
import axios from "axios";

export default {
  name: "nodeAlarmSetting",
  props: {
    node_uuid: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      settings: {
        enable: true,
        delay_seconds: 360,
        interval: 60,
        cpu: {
          enable: true,
          threshold: 80
        },
        memory: {
          enable: true,
          threshold: 80
        },
        network: {
          enable: true,
          send_threshold: 6000000,
          receive_threshold: 6000000
        },
        disk: [
          {
            device: null,
            threshold: 70
          }
        ]
      },
      disk_partition: [
        '/dev/sda',
        '/dev/sdb',
        '/dev/sdc',
      ]
    }
  },
  mounted() {
    this.load_disk_partition_list()
    this.load_alarm_setting()
  },
  methods: {
    load_disk_partition_list() {
      axios.post('/api/node_manager/node_info/get_disk_partition_list', {node_uuid: this.node_uuid}).then((response) => {
        if (response.data.status !== 1) {
          return message.showError(this, response.data.msg)
        }
        this.disk_partition = response.data.data.disk_partition
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.msg)
      })
    },
    load_alarm_setting() {
      axios.post('/api/node_manager/node_info/get_alarm_setting', {node_uuid: this.node_uuid}).then((response) => {
        if (response.data.status !== 1) {
          return message.showError(this, response.data.msg)
        }
        this.settings = response.data.data
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.msg)
      })
    },
    save_alarm_setting() {
      axios.post('/api/node_manager/node_info/save_alarm_setting', {
        node_uuid: this.node_uuid,
        setting: this.settings
      }).then(response => {
        if (response.data.status !== 1) {
          return message.showError(this, response.data.msg)
        } else {
          return message.showSuccess(this, response.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.msg)
      })
    },
    add_disk_rule() {
      this.settings.disk.push({
        device: null,
        threshold: 70
      })
    },
    delete_disk_rule(index) {
      this.settings.disk.splice(index, 1)
    }
  }
}
</script>

<template>
  <div class="alarm_setting">
    <p class="text-h6 setting_subtitle">告警基础设置</p>

    <v-switch
      v-model="settings.enable"
      color="primary"
      density="compact"
      label="启用节点告警"
      hint="启用该节点的负载告警系统，如当前节点负载超过设定值将会给集群内设置的用户发送告警消息"
      persistent-hint
    ></v-switch>
    <v-text-field
      v-model="settings.delay_seconds"
      type="number"
      variant="underlined"
      label="告警延迟时间（秒）"
      hint="当节点某个告警项超过阈值时并不会立即发出告警，需持续超过该值设定的时间后才会触发（该值不宜过小，否则可能会引起误报）"
      persistent-hint
    ></v-text-field>
    <v-text-field
      v-model="settings.interval"
      type="number"
      variant="underlined"
      label="告警间隔时间（秒）"
      hint="当节点告警触发后，需达到设定的时间后才会被重新触发"
      persistent-hint
    ></v-text-field>
    <v-divider/>
    <div class="alarm_rule">
      <p class="text-h6 setting_subtitle">CPU告警设置</p>
      <v-switch
        v-model="settings.cpu.enable"
        color="primary"
        density="compact"
        label="启用"
        hint="启用CPU负载告警规则，请在下面设置告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        v-model.number="settings.cpu.threshold"
        type="number"
        variant="underlined"
        label="告警阈值(百分比)"
        hint="当CPU总体占用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <p class="text-h6 setting_subtitle">内存告警设置</p>
      <v-switch
        v-model="settings.memory.enable"
        color="primary"
        density="compact"
        label="启用"
        hint="启用内存使用率告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        v-model="settings.memory.threshold"
        type="number"
        variant="underlined"
        label="告警阈值(百分比)"
        hint="当内存使用率超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <p class="text-h6 setting_subtitle">网络告警设置</p>
      <v-switch
        v-model="settings.network.enable"
        color="primary"
        density="compact"
        label="启用"
        hint="启用网络数据包发送速率告警规则，请在下面输入告警阈值"
        persistent-hint
      ></v-switch>
      <v-text-field
        v-model="settings.network.send_threshold"
        type="number"
        variant="underlined"
        label="发送数据告警阈值(bytes/s)"
        hint="当每秒发送的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-text-field
        v-model="settings.network.receive_threshold"
        type="number"
        variant="underlined"
        label="接收数据告警阈值(bytes/s)"
        hint="当每秒接收的数据量超过该值时触发告警"
        persistent-hint
      ></v-text-field>
      <v-divider/>
      <p class="text-h6 setting_subtitle">磁盘告警设置</p>
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
              v-for="(item, index) in settings.disk"
              :key="item.device"
            >
              <td>
                <v-select
                  v-model="item.device"
                  variant="underlined"
                  :items="disk_partition"
                  label="磁盘设备"
                  hint="请选择要检查的磁盘设备"
                  persistent-hint
                ></v-select>
              </td>
              <td>
                <v-text-field
                  v-model.number="item.threshold"
                  type="number"
                  variant="underlined"
                  label="告警阈值(百分比)"
                  hint="当该磁盘空间使用率超过该值时触发告警"
                  persistent-hint
                ></v-text-field>
              </td>
              <td>
                <v-btn variant="text" color="red" icon title="删除该条规则" @click="delete_disk_rule(index)">
                  <v-icon icon="mdi-close"></v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-btn color="green" block @click="add_disk_rule">
            <v-icon icon="mdi:mdi-plus"/>
            添加规则
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="actionButton">
      <v-btn color="green" @click="save_alarm_setting()">
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
