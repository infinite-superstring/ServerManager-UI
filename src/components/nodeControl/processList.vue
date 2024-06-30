<script>
import LoadingOverlay from "@/components/nodeControl/loadingOverlay.vue";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";
import dialogs from "@/scripts/utils/dialogs";

export default {
  name: "processList",
  components: {NodeOfflineOverlay, LoadingOverlay},
  props: {
    ws: {
      type: WebSocket,
      required: true
    },
    online: {
      type: Boolean,
      required: true
    }
  },
  data: () => {
    return {
      heartbeat_interval: null,
      process_list: [],
      headers: [
        {
          key: "pid",
          title: "PID"
        },
        {
          key: "name",
          title: "进程名",
        },
        {
          key: "status",
          title: "状态",
        },
        {
          key: "username",
          title: "用户"
        },
        {
          key: "cpu_percent",
          title: "CPU占用率",
          stock: false,
        },
        {
          key: "memory_usage",
          title: "内存占用率",
          stock: false,
        },
        {
          title: '操作',
          key: 'actions',
          sortable: false
        },
      ],
      search: ""
    }
  },
  mounted() {
    if (this.online) {
      this.ws.onmessage = (message) => {
        console.log(message)
        let data = null
        try {
          data = JSON.parse(message.data)
        } catch (e) {
          console.error(e)
          message.showError(this, `JSON数据解析失败：${e.message}`)
        }
        switch (data.action) {
          case "process_list:show":
            this.process_list = data.data.process_list
            console.log(this.process_list)
            break
        }
      }
      this.send({
        action: 'process_list:load'
      })
      this.heartbeat_interval = setInterval(this.heartbeat, 1000)
    }
  },
  unmounted() {
    if (this.heartbeat_interval) {
      console.log("停止计时器")
      clearInterval(this.heartbeat_interval)
    }
  },
  methods: {
    heartbeat() {
      return this.send({
        action: "process_list:heartbeat",
      })
    },
    kill(process_info, tree=false) {
      dialogs.confirm(
        `确定要结束${process_info.name}(PID:${process_info.pid})进程吗`,
        "该操作无法撤销，请谨慎操作",
        "warning"
      ).then(value => {
        if (value) {
          this.send({
            action: 'process_list:kill',
            data: {
              pid: process_info.pid,
              tree: tree
            }
          })
        }
      })
    },
    send(data) {
      return this.ws.send(JSON.stringify(data))
    },
  },
  watch: {
    online(val) {
      if (val) {
        this.heartbeat_interval = setInterval(this.heartbeat, 1000)
      } else {
        clearInterval(this.heartbeat_interval)
      }
    }
  }
}
</script>

<template>
  <v-sheet :min-height="300" width="100%">
    <node-offline-overlay :flag="!online"/>
    <!--    <loading-overlay :flag="process_list.length < 1 && online"/>-->
    <div class="table" v-if="online">
      <v-text-field
        v-model="search"
        label="搜索进程"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="process_list"
        :search="search"
        :loading="process_list.length < 1 && online"
        loading-text="加载中，请稍后......"
      >
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.status="{ value }">
          <v-chip :color="value==='stopped'?'red':''">
            {{ value }}
          </v-chip>
        </template>

        <template v-slot:item.actions="{ item }">
          <div class="action-btn">
            <v-btn size="small" color="warning" variant="text" @click="kill(item)">结束进程</v-btn>
            <v-btn size="small" color="red" variant="text" @click="kill(item, true)">结束进程树</v-btn>
          </div>

        </template>
      </v-data-table>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>
