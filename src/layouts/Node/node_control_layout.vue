<script>

import NodeStatus from "@/components/nodeControl/nodeStatus.vue";
import NodeWatch from "@/components/nodeControl/nodeWatch.vue";
import node from "../../components/settings/node.vue";
import message from "@/scripts/utils/message";
import NodeInfo from "@/components/nodeControl/nodeInfo.vue";

export default {
  name: "node_control_layout",
  computed: {
    node() {
      return node
    }
  },
  components: {NodeInfo, NodeWatch, NodeStatus},
  data() {
    return {
      hash: location.hash.slice(1),
      tab: null,
      websocket: null,
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
    this.websocket.clone()
    this.websocket = null
  },
  methods: {
    connect_websocket() {
      /**
       * 连接到 WebSocket
       * @type {WebSocket}
       */
      this.websocket = new WebSocket(`ws://${location.host}/node_manager/websocket/node_control/${this.hash}/`)
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
      console.log(event.code)
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
      console.log(event.data)
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
              this.usage_data = data.data['usage']
            }
            break
          }
          case "update_node_usage_data": {
            this.usage_data = data.data
            console.log(this.usage_data)
            break
          }
        }
      }

    }
  },
  // watch: {
  //   hash(val) {
  //     console.log(val)
  //     if (!val && val.length <= 0) {
  //       this.$router.push({name: 'nodeList'})
  //     }
  //   }
  // }
}
</script>

<template>
  <v-card>
    <v-tabs
      v-model="tab"
    >
      <v-tab
        text="状态"
        value="Status"
      ></v-tab>
      <v-tab
        text="控制"
        value="Control"
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
                  <node-watch/>
                </v-card-text>
              </v-card>
            </div>
            <div class="right">
              <v-card subtitle="节点信息">
                <v-card-text>
                  <node-info :node_base_info="node_base_info"/>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-window-item>
        <v-window-item value="Control">
        </v-window-item>
        <v-window-item value="Event">
        </v-window-item>
        <v-window-item value="Rules">
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
</style>
