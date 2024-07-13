<template>
  <div class="toolsBar">
    <v-btn
      color="green"
      @click="addDialogShow = true"
    >
      新建集群任务
    </v-btn>
    <v-text-field
      v-model="params.search"
      @update:model-value="deGetList"
      class="search"
      density="compact"
      label="搜索"
      variant="solo-filled"
      single-line
      hide-details
    >
    </v-text-field>
  </div>
  <ClusterTaskList
    @on-show="onShowDetailDialog"
    @change-enable="onChangeEnable"
    @on-delete="onDelete"
    @on-edit="onShowEditDialog"
    :list="list"/>
  <v-pagination
    v-model="params.page"
    v-if="params.maxPage > 1"
    :length="params.maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  />
  <cluster-task-dialog
    ref="addDialogRef"
    :groupList="groupList"
    @searchGroup="deGetGroupList"
    :status="addDialogShow"
    @close="addDialogShow = false"
    @submit="onSubmit"
    title="添加集群任务"
  />
  <cluster-task-detailed-dialog
    ref="detailDialogRef"
    :status="detailDialogShow"
    @close="detailDialogShow = false"
  />
  <cluster-task-edit-dialog
    v-model="editDialogShow"
    v-model:data="editData"
    :groupList="groupList"
    @searchGroup="deGetGroupList"
    @close="editDialogShow = false"
    @submit="onSubmit"
    ref="editDialogRef"
  />

</template>

<script setup>

import ClusterTaskList from "@/components/cluster/ClusterTaskList.vue";
import ClusterTaskDialog from "@/components/cluster/CreateDialog.vue";
import ClusterTaskDetailedDialog from '@/components/cluster/DetailedDialog.vue'
import ClusterTaskEditDialog from "@/components/cluster/ClusterTaskEditDialog.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";
import confirmDialog from "@/scripts/utils/confirmDialog";
import {debounce} from "@/scripts/utils/debounce";

const addDialogRef = ref(null)
const detailDialogRef = ref(null)
const editDialogRef = ref(null)
/*添加对话框是否显示*/
const addDialogShow = ref(false)
/*详细对话框是否显示*/
const detailDialogShow = ref(false)
const editDialogShow = ref(false)
/*所有组*/
const groupList = ref([])
/*列表数据*/
const list = ref([])
/*搜索参数*/
const params = ref({
  page: 1,
  pageSize: 20,
  search: "",
  maxPage: 0
})
/*编辑对话框参数*/
const editData = ref()


/**
 * 改变任务状态
 * @param uuid
 */
const onChangeEnable = (uuid) => {
  axiosplus.put('/api/group_task/enableDisable', {uuid})
    .then(r => {
      message.showSuccess(this, r.data.msg)
      getList()
    })
}

/**
 * 删除任务
 * @param uuid
 */
const onDelete = (uuid) => {
  confirmDialog('确认删除该任务?', '删除后无法恢复!', () => {
    axiosplus.delete('/api/group_task/deleteByUuid', {params: {uuid}})
      .then(r => {
        message.showSuccess(this, r.data.msg)
        getList()
      })
  })
}

/**
 * 获取节点组列表
 * @param search
 */
const getGroupList = (search = '') => {
  // 如果搜索字符过长
  if (search.length > 20) {
    message.showWarning(this, '搜索字符过长')
    search = search.substring(0, 20)
  }
  axiosplus.post('/api/node_manager/node_group/getGroupList'
    , {
      page: 1,
      pageSize: 5,
      search
    }).then(r => {
    groupList.value = r.data.data.PageContent
  })
}
/**
 * 获取节点组列表(防抖)
 * @type {(function(...[*]): void)|*}
 */
const deGetGroupList = debounce(getGroupList, 300)
/**
 * 获取任务列表
 */
const getList = () => {
  axiosplus.get('/api/group_task/getList', {params: params.value})
    .then(r => {
      list.value = r.data.data.list
      params.value.maxPage = r.data.data.maxPage
    })
}

/**
 * 获取任务列表(防抖)
 * @type {(function(...[*]): void)|*}
 */
const deGetList = debounce(getList, 300)

/**
 * 校验表单数据
 * @param formData
 * @return {{}}
 */
function validateFormData(formData) {
  console.log(typeof formData.group)
  // 必填字段校验
  if (!formData.taskName.trim()) {
    return '任务名称不能为空';
  }
  if (!formData.group) {
    return '节点组不能为空';
  }
  if (!formData.execType) {
    return '执行方式不能为空';
  }
  if (!formData.command) {
    return '执行命令不能为空';
  }
  if (formData.execCount) {
    if (formData.execCount < 1) {
      return '执行次数不能小于1'
    }
  }
  // 根据 execType 判断对应字段的必填校验
  if (formData.execType === 'date-time' && !formData.execTime.trim()) {
    return '指定时间不能为空';
  } else if (formData.execType === 'cycle' && (!formData.execCycle.week.length || !formData.execCycle.time.trim())) {
    return '执行周期不能为空';
  } else if (formData.execType === 'interval' && !formData.execInterval) {
    return '执行间隔不能为空';
  }

  if (formData.execType === 'date-time') {
    // 不能小于当前时间
    if (new Date(formData.execTime) < new Date()) {
      return '执行时间不能小于当前时间';
    }
  }

  return false;
}

/**
 * 创建|编辑集群任务
 * @param data
 */
const onSubmit = (data) => {
  let err = validateFormData(data)
  if (err) {
    message.showWarning(this, err)
    return
  }

  function _submit() {
    axiosplus[data.uuid ? 'put' : 'post']('/api/group_task/operation', data)
      .then(r => {
        getList()
        message.showSuccess(this, r.data.msg)
        addDialogShow.value = false
        addDialogRef.value.clearForm()
        editDialogShow.value = false
      })
  }

  axiosplus.post('/api/group_task/command_legal?command', {command: data.command})
    .then(r => {
      if (r.data.data === false) {
        confirmDialog('警告!', '命令不安全，是否继续?', _submit)
      } else {
        _submit()
      }
    })
}

/**
 * 展示任务详情
 * @param uuid
 */
const onShowDetailDialog = (uuid) => {
  axiosplus.get('/api/group_task/get_task_detailed?uuid=' + uuid)
    .then(r => {
      detailDialogShow.value = true
      detailDialogRef.value.task = r.data.data
    })
}
/**
 * 展示编辑对话框
 */
const onShowEditDialog = (uuid) => {
  editDialogShow.value = true
  axiosplus.get('/api/group_task/get_task_by_uuid?uuid=' + uuid)
    .then(r => {
      editData.value = r.data.data
      editData.value.uuid = uuid
    })
}

onMounted(() => {
  getGroupList()
  getList()
})
</script>


<style scoped>

</style>
