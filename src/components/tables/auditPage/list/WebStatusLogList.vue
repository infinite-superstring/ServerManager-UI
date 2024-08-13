<template>
  <v-table density="compact">
    <thead>
    <tr>
      <th class="text-left">状态码</th>
      <th class="text-left">错误类型</th>
      <th class="text-left">错误信息</th>
      <th class="text-left">开始时间</th>
      <th class="text-left">结束时间</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in list">
      <td>{{ item.status_code }}</td>
      <td>{{ item.error_type }}</td>
      <td>{{ item.error_info }}</td>
      <td>{{ item.start_time }}</td>
      <td>{{ item.end_time }}</td>
    </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-model="page.page"
    v-if="page.maxPage > 1"
    :length="page.maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";
import {getLogApi} from "@/scripts/apis/audit/web_status";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";

const model = defineModel()
const props = defineProps({
  host: {
    type: String,
    default: ''
  },
})

const page = ref({
  page: 1,
  pageSize: 20,
  maxPage: null,
})
const list = ref([])

const getList = () => {
  getLogApi({
    host: props.host,
    page: page.value.page,
    pageSize: page.value.pageSize,
    ...model.value
  }).then(r => {
    list.value = r.data.data.list
    page.value.maxPage = r.data.data.maxPage
  })
}

onMounted(() => {
  getList()
})
// 卸载组件钩子
onUnmounted(() => {
  console.log(props.host + '已卸载')
})
onUnmounted(() => {
  console.log(props.host + '已卸载')
})
watch(() => page.value.page, () => {
  getList()
})
watch(() => model.value, () => {
  console.log(model.value)
  getList()
}, {deep: true})
</script>


<style scoped>

</style>
