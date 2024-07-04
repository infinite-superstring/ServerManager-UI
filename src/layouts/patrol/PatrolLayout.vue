<template>
  <div class="toolsBar">
    <v-btn
      id="addPatrol"
      color="success"
      @click="openAddDialog"
    >
      新增记录
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="搜索"
      variant="solo-filled"
      single-line
      hide-details>
    </v-text-field>
  </div>
  <PatrolList
    :list="list"
    @show="openShowDetailedDialog"
    @update="update"
    @delete="del"
  />
  <patrol-data
    :title="dialogTitle"
    :status="showDataDialog"
    @close="closeDialog"
    @submit="onSubmit"
    :data="showData"
  />
  <patrolDetailed
    :status="showDetailedDialog"
    @close="closeDialog"
    :data="showData"
  />
</template>

<script setup>

import PatrolList from "@/components/tables/patrol/PatrolList.vue";
import {onMounted, ref} from "vue";
import patrolData from "@/components/dialogs/patrol/patrolData.vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";
import patrolDetailed from '@/components/dialogs/patrol/Detailed.vue'
import confirmDialog from "@/scripts/utils/confirmDialog";

/**
 * 展示更新或编辑对话框
 * @type {Ref<UnwrapRef<boolean>>}
 */
const showDataDialog = ref(false)
/**
 * 展示详细对话框
 * @type {Ref<UnwrapRef<boolean>>}
 */
const showDetailedDialog = ref(false)
const list = ref([])
/**
 *  显示单条数据
 * @type {Ref<any>}
 */
const showData = ref()
/**
 * 对话框标题
 */
const dialogTitle = ref('新增记录')

const params = ref({
  page: 1,
  pageSize: 20,
  search: ''
})

/**
 * 打开添加对话框
 */
const openAddDialog = () => {
  showDataDialog.value = true
  dialogTitle.value = '新增记录'
}

const openShowDetailedDialog = (data) => {
  showData.value = {...data}
  showDetailedDialog.value = true
}

const closeDialog = () => {
  showDataDialog.value = false
  showDetailedDialog.value = false
  showData.value = {}
}
/**
 * 添加时提交或更新时提交
 * @param data
 */
const onSubmit = (data) => {
  if (dialogTitle.value === '新增记录') {
    axiosplus.post('/api/patrol/addARecord', data)
      .then(() => {
        message.showSuccess(this, '新增成功')
        getList()
        closeDialog()
      })
  } else {
    axiosplus.put('/api/patrol/updateARecord', data)
      .then(() => {
        message.showSuccess(this, '更新成功')
        getList()
        closeDialog()
      })
  }
}

const update = (data) => {
  showDataDialog.value = true
  showData.value = {...data}
  dialogTitle.value = '更新记录'
}

const del = (id) => {
  confirmDialog('操作确认', '确定要删除这条记录吗', () => {
    axiosplus.delete('/api/patrol/deleteRecord?id=' + id,)
      .then(() => {
        message.showSuccess(this, '删除成功')
        getList()
      })
  })
}

const getList = () => {
  axiosplus.post('/api/patrol/getList', params.value)
    .then(res => {
      list.value = res.data.data.PageContent
    })
}

onMounted(() => {
  getList()
})
</script>

<style scoped>

</style>
