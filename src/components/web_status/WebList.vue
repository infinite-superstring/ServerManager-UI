<template>
  <div class="container">
    <WebCard
      ref="webCardRef"
      :item="item"
      v-for="(item) in list"
      :key="item.id"
      :time="getRuntimeTime(item.host)"
      :delay="getRuntimeData(item.host)"
      :online="getRuntimeOnline(item.host)"
      :status_code="getRuntimeStatusCode(item.host)"
      @delete="deleteWeb"
    />
  </div>
</template>

<script setup>

import WebCard from "@/components/web_status/WebCard.vue";
import {onMounted, onUnmounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import {createWebSocket, closeWebSocket} from "@/scripts/utils/webSocketUtil";
import confirmDialog from "@/scripts/utils/confirmDialog";
import message from "@/scripts/utils/message";

const list = ref([])
const runtimeData = ref({})
const webCardRef = ref()
const ws = ref()

const getList = () => {
  console.log('getList')
  axiosplus.get('/api/webStatus/getList')
    .then(res => {
      if (res.data.status === 1) {
        list.value = res.data.data.list
      }
    })
}

const onmessage = (data) => {
  let parse = JSON.parse(data.data)
  switch (parse.type) {
    case 'newData':
      handleNewData(parse.data)
      break
    case 'initData':
      runtimeData.value = parse.data
      break
  }
}

const handleNewData = (data) => {
  let host = Object.keys(data)[0]
  // runtimeData.value[host].time.push(data[host].time`)
  // runtimeData.value[host].data.push(data[host].data)`
  console.log(host)
  console.log(data)
  console.log(data[host])
  console.log(Object.keys(data[host]))
  for (let key in data[host]) {
    console.log(data[host][key])
  }
  runtimeData.value[host].time = data[host].time
  runtimeData.value[host].data = data[host].data
  runtimeData.value[host].online = data[host].online
  runtimeData.value[host].status_code = data[host].status_code
}

const getRuntimeTime = (host) => {
  if (host in runtimeData.value) {
    return runtimeData.value[host].time
  } else {
    return []
  }
}
const getRuntimeData = (host) => {
  if (host in runtimeData.value) {
    return runtimeData.value[host].data
  } else {
    return []
  }
}
const getRuntimeOnline = (host) => {
  if (host in runtimeData.value) {
    // console.log(runtimeData.value[host]);
    return runtimeData.value[host].online
  } else {
    return false
  }
}
const getRuntimeStatusCode = (host) => {
  if (host in runtimeData.value) {
    return runtimeData.value[host].status_code
  } else {
    return 0
  }
}


const deleteWeb = (id) => {
  confirmDialog('删除该网站日志将同步删除！', '删除', () => {
    axiosplus.delete(`/api/webStatus/delWeb/${id}`)
      .then(res => {
        if (res.data.status === 1) {
          message.showSuccess(this, '删除成功')
          getList()
        }
      })
  })
}

onMounted(() => {
  /**
   * 创建网络套接字
   * @type {WebSocket}
   */
  ws.value = createWebSocket(`ws://${location.host}/ws/web_status`, {
    onmessage,
    autoReconnect: true,
    maxReconnectAttempts: Infinity,
  })
  getList()
})

// 卸载组件
onUnmounted(() => {
  console.info('断开网络套接字')
  ws.value = null
  closeWebSocket()
  console.info(ws.value)
})

defineExpose({
  getList
})
</script>


<style scoped>
.container {
  /*弹性布局，左对齐，自动换行*/
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
