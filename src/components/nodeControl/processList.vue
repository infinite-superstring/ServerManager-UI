<script>
import LoadingOverlay from "@/components/nodeControl/loadingOverlay.vue";

export default {
  name: "processList",
  components: {LoadingOverlay},
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
      process_list: []
    }
  },
  mounted() {
    if (this.online) {
      this.ws.onmessage = (message) => {
        console.log(message)
        let data = null
        try {
          data = JSON.parse(event.data)
        } catch (e) {
          console.error(e)
          message.showError(this, `JSON数据解析失败：${e.message}`)
        }
        switch (data.action) {
          case "show_process_list":
            this.process_list = data.data
            break
        }
      }
      this.send({
        action: 'load_process_list'
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
  <loading-overlay :flag="process_list.length < 1"/>
    <v-table density="compact" v-if="process_list.length > 1">
      <thead>
      <tr>
        <th class="text-left">
          PID
        </th>
        <th class="text-left">
          进程名称
        </th>
        <th class="text-left">
          状态
        </th>
        <th class="text-left">
          用户
        </th>
        <th class="text-left">
          CPU
        </th>
        <th class="text-left">
          内存
        </th>
        <th class="text-left">
          操作
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in [1,2,3,4,5,6,7,8,9,10]"
        :key="item"
      >
        <td>0</td>
        <td>System</td>
        <td>running</td>
        <td>root</td>
        <td>10%</td>
        <td>10%</td>
        <td class="action-btn">
          <v-btn size="small" color="warning" variant="text">结束进程</v-btn>
          <v-btn size="small" color="red" variant="text">结束进程树</v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
</template>

<style scoped>

</style>
