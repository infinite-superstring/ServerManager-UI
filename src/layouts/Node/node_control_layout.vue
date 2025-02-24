<script>

import NodeStatus from "@/components/nodeControl/nodeStatus.vue";
import NodeWatch from "@/components/nodeControl/nodeWatch.vue";
import node from "../../components/settings/node.vue";
import message from "@/scripts/utils/message";
import NodeInfo from "@/components/nodeControl/nodeInfo.vue";
import NodeTerminal from "@/components/nodeControl/nodeTerminal.vue";
import ProcessList from "@/components/nodeControl/processList.vue";
import DiskPartitionList from "@/components/nodeControl/diskPartitionList.vue";
import NodePerformanceRecord from "@/components/nodeControl/nodePerformanceRecord.vue";
import NodeAlarmSetting from "@/components/nodeControl/nodeAlarmSetting.vue";
import NodeEvent from "@/components/nodeControl/nodeEvent.vue";

export default {
  name: "node_control_layout",
  computed: {
    node() {
      return node
    }
  },
  components: {
    NodeEvent,
    NodeAlarmSetting,
    NodePerformanceRecord, DiskPartitionList, ProcessList, NodeTerminal, NodeInfo, NodeWatch, NodeStatus
  },
  data() {
    return {
      hash: location.hash.slice(1),
      tab: null,
      websocket: null,
      terminal_output: [],
      os:null,
      node_base_info: {
        node_description: null,
        node_hostname: null,
        node_memory_total: null,
        node_name: null,
        node_swap_total: null,
        node_system_boot_time: null,
        node_system_build_version: null,
        node_system_type: null,
        node_system_version: null,
        node_group: null,
        node_tags: [],
        node_uuid: null,
      },
      usage_data: {}
    }
  },
  mounted() {
    console.log(this.hash)
    this.connect_websocket()
  },
  unmounted() {
    this.websocket.close()
    this.websocket = null
  },
  methods: {
    connect_websocket() {
      /**
       * 连接到 WebSocket
       * @type {WebSocket}
       */
      this.websocket = new WebSocket(`ws://${location.host}/ws/node/node_control/${this.hash}/`)
      this.websocket.addEventListener('open', this.on_websocket)
      this.websocket.addEventListener('close', this.close_websocket)
      this.websocket.addEventListener('error', this.error_websocket)
      this.websocket.addEventListener('message', this.message_websocket)

    },
    on_websocket(event) {
      /**
       * 连接websocket服务器
       */
      console.log(event)
    },
    close_websocket(event) {
      /**
       * websocket 连接关闭
       */
      console.warn(event.code)
    },
    error_websocket(event) {
      /**
       * websocket 连接错误
       */
      console.error(event)
    },
    message_websocket(event) {
      /**
       * websocket 收到消息
       */
      let data = null
      try {
        data = JSON.parse(event.data)
      } catch (e) {
        console.error(e)
        message.showError(this, `JSON数据解析失败：${e.message}`)
      }
      if (data) {
        switch (data.action) {
          case "init": {
            this.node_base_info = data.data['base_info']
            if (data.data['usage']) {
              this.os=data.data['base_info']['node_system_info']['system_type']
              this.usage_data = data.data['usage']
            }
            break
          }
          case "node:update_usage_data": {
            this.usage_data = data.data
            break
          }
          case "node:online": {
            this.node_base_info.node_online = true
            break
          }
          case "node:offline": {
            this.node_base_info.node_online = false
            break
          }
        }
      }

    }
  },
}
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab
        text="状态"
        value="Status"
      ></v-tab>
      <v-tab
        text="进程列表"
        value="Process_list"
      ></v-tab>
      <v-tab
        text="性能记录"
        value="Performance_records"
      ></v-tab>
      <v-tab
        text="终端"
        value="Terminal"
      ></v-tab>
      <v-tab
        text="事件"
        value="Event"
      ></v-tab>
      <v-tab
        text="告警规则"
        value="Rules"
      ></v-tab>
    </v-tabs>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="Status">
          <div class="status">
            <div class="left">
              <v-card subtitle="系统状态">
                <v-card-text>
                  <node-status :status_data="usage_data" :base_info="node_base_info"/>
                </v-card-text>
              </v-card>
              <v-card subtitle="监控">
                <v-card-text>
                  <node-watch :status_data="usage_data" :base_info="node_base_info"/>
                </v-card-text>
              </v-card>
            </div>
            <div class="right">
              <v-card subtitle="节点信息">
                <v-card-text>
                  <node-info :node_base_info="node_base_info"/>
                </v-card-text>
              </v-card>
              <v-card subtitle="磁盘列表">
                <v-card-text>
                  <disk-partition-list :partition_list="usage_data.disk_space"/>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-window-item>
        <v-window-item value="Process_list">
          <process-list :ws="websocket" :online="node_base_info.node_online"/>
        </v-window-item>
        <v-window-item value="Performance_records">
          <node-performance-record :ws="websocket"/>
        </v-window-item>
        <v-window-item value="Terminal">
          <node-terminal :node_uuid="node_base_info.node_uuid" :ws="websocket" :online="node_base_info.node_online" :os="os"/>
        </v-window-item>
        <v-window-item value="Event">
          <node-event :node_uuid="node_base_info.node_uuid"/>
        </v-window-item>
        <v-window-item value="Rules">
          <v-alert
            variant="tonal"
            v-if="!node_base_info.node_group"
            type="warning"
          >当前节点未绑定集群，将无法接收告警消息</v-alert>
          <node-alarm-setting :node_uuid="node_base_info.node_uuid"/>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.status {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;

  .left {
    width: 70%;
    margin-right: 5%;
  }

  .right {
    width: 35%;
  }

  .v-card:not(:last-child) {
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 950px) {
  .status {
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    .left {
      width: 100%;
      margin-right: 0 !important;
    }

    .right {
      width: 100%;
    }
  }
}
</style>
