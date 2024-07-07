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
      @update="updateWeb"
    />
  </div>
  <v-pagination
    v-model="param.page"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<script setup>

import WebCard from "@/components/web_status/WebCard.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";
import {createWebSocket, closeWebSocket} from "@/scripts/utils/webSocketUtil";
import confirmDialog from "@/scripts/utils/confirmDialog";
import message from "@/scripts/utils/message";

const list = ref([])
const maxPage = ref(0)
const runtimeData = ref({})
const webCardRef = ref()
const ws = ref()
const emit = defineEmits(['updateWeb'])

let param = ref({
  name: '',
  page: 1,
  pageSize: 6,
})


const updateWeb = (data) => {
  console.log(data)
  emit('updateWeb', data)
}
/**
 * 获取列表
 */
const getList = (name = '') => {
  param.value.name = name
  let paramStr = Object.keys(param.value).map(key => {
    return `${key}=${param.value[key]}`
  }).join('&')
  axiosplus.get('/api/webStatus/getList?' + paramStr)
    .then(res => {
      if (res.data.status === 1) {
        list.value = res.data.data.list
        maxPage.value = res.data.data.maxPage
      }
    })
}
/**
 * 监听消息
 * @param data
 */
const onmessage = (data) => {
  let parse = JSON.parse(data.data)
  switch (parse.type) {
    case 'newData':
      handleNewData(parse.data)
      break
    case 'initData':
      runtimeData.value = parse.data || {}
      break
  }
}
const onopen = (instance) => {
  instance.send(JSON.stringify({type: 'initData'}))
}
/**
 * 处理新数据
 * @param data
 */
const handleNewData = (data) => {
  let host = Object.keys(data)[0]
  if (!runtimeData.value[host]) runtimeData.value[host] = {}
  runtimeData.value[host].time = data[host]['time']
  runtimeData.value[host].data = data[host].data
  runtimeData.value[host].online = data[host].online
  runtimeData.value[host].status_code = data[host].status_code
}
/**
 * 获取运行时时间
 * @param host
 * @return {*|*[]}
 */
const getRuntimeTime = (host) => {
  if (!runtimeData.value) runtimeData.value = {}
  if (host in runtimeData.value) {
    return runtimeData.value[host].time
  } else {
    return []
  }
}
/**
 * 获取运行时数据
 * @param host
 * @return {*|*[]}
 */
const getRuntimeData = (host) => {
  if (!runtimeData.value) runtimeData.value = {}
  if (host in runtimeData.value) {
    return runtimeData.value[host].data
  } else {
    return []
  }
}
/**
 * 获取运行时在线状态
 * @param host
 * @return
 */
const getRuntimeOnline = (host) => {
  if (!runtimeData.value) runtimeData.value = {}
  if (host in runtimeData.value) {
    // console.log(runtimeData.value[host]);
    return runtimeData.value[host].online
  } else {
    return false
  }
}
/**
 * 获取运行时状态码
 * @param host
 * @return {number|{type: Number | NumberConstructor, required: boolean}|*}
 */
const getRuntimeStatusCode = (host) => {
  if (!runtimeData.value) runtimeData.value = {}
  if (host in runtimeData.value) {
    return runtimeData.value[host].status_code
  } else {
    return 500
  }
}

/**
 * 删除网站
 * @param id
 */
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


/**
 * 创建网络套接字
 */
const initSocket = () => {
  ws.value = createWebSocket(`ws://${location.host}/ws/web_status/${param.value.page}`, {
    onmessage,
    onopen,
    autoReconnect: true,
    maxReconnectAttempts: Infinity,
  })
}

onMounted(() => {
  initSocket()
  getList()
})

watch(() => param.value.page, () => {
  ws.value = null
  closeWebSocket()
  getList()
  initSocket()
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
