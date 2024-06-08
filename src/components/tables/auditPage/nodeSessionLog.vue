<template>
  <v-table density="compact">
    <thead>
    <tr>

      <th class="text-left">
        节点
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
      <td>{{ item.name }}</td>
      <td>{{ item.time }}</td>
      <td>
        <v-chip color="primary" v-if="item.action === '上线'">
          {{ item.action }}
        </v-chip>
        <v-chip color="error" v-else>
          {{ item.action }}
        </v-chip>
      </td>
      <td>{{ item.ip }}</td>
    </tr>
    </tbody>
  </v-table>
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

const params = ref({
  page: 1,
  pageSize: 20
})
const tableData = ref([])
const maxPage = ref(0)
const currentPage = ref(1)
const getList = () => {
  axiosplus.post('/api/admin/auditAndLogger/nodeSessionLog', params.value)
    .then(res => {
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
