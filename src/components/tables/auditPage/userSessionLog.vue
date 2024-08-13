<template>
  <ToolsSelectBar
    v-model="params"
    hide-add-button
    :options="options"
    @search:input="getList()"
    @option:click="getList()"
  />
  <v-table density="compact" v-if="tableData.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        用户
      </th>
      <th class="text-left">
        时间
      </th>
      <th class="text-left">
        动作
      </th>
      <th class="text-left">
        IP
      </th>

    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in tableData"
      :key="item.id"
    >
      <td>{{ item.user }}</td>
      <td>{{ item.time }}</td>
      <td>
        <v-chip color="primary" v-if="item.action === 0">
          登录
        </v-chip>
        <v-chip color="error" v-else>
          登出
        </v-chip>
      </td>
      <td>{{ item.ip }}</td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<script setup>

import {onBeforeMount, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";
import NotData from "@/components/emptyState/notData.vue";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";
import {getListApi} from "@/scripts/apis/audit/user_session_log";

const options = [
  {
    prop: 'date',
    label: '时间范围',
    type: 'date-range',
  },
  {
    prop: 'action',
    label: '动作',
    type: 'radio',
    optional: [
      {
        label: '登录',
        value: 0
      },
      {
        label: '登出',
        value: 1
      }
    ]
  }
]
const params = ref({
  page: 1,
  pageSize: 20
})
const tableData = ref([])
const maxPage = ref(0)
const currentPage = ref(1)
const getList = () => {
  getListApi(params.value).then(res => {
    tableData.value = res.data.data.PageContent.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    })
    maxPage.value = res.data.data.maxPage
    currentPage.value = res.data.data.currentPage
  })
}
watch(() => currentPage.value, (n) => {
  params.value.page = n
  getList()
})
onBeforeMount(() => {
  getList()
})
</script>


<style scoped>

</style>
