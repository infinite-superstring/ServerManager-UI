<template>
  <div class="toolsBar">
    <v-btn
      color="green"
      @click="dialogShow = true"
    >
      新建集群任务
    </v-btn>
    <v-text-field
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
    @change-enable="onChangeEnable"
    @on-delete="onDelete"
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
  <create-cluster-task
    ref="createClusterTaskRef"
    :groupList="groupList"
    :status="dialogShow"
    @close="dialogShow = false"
    @submit="onSubmit"
    :title="'添加集群任务'"
  />

</template>

<script setup>

import ClusterTaskList from "@/components/cluster/ClusterTaskList.vue";
import CreateClusterTask from "@/components/cluster/CreateClusterTaskDialog.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";
import confirmDialog from "@/scripts/utils/confirmDialog";

const createClusterTaskRef = ref(null)
const dialogShow = ref(false)
const groupList = ref([])
const list = ref([])
const params = ref({
  page: 1,
  pageSize: 20,
  search: '',
  maxPage: 0
})


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
 * 获取任务列表
 */
const getList = () => {
  axiosplus.get('/api/group_task/getList')
    .then(r => {
      list.value = r.data.data.list
      params.value.maxPage = r.data.data.maxPage
    })
}

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
  // 校验 路径是否合法 例如 shell 环境命令
  const unixPathRegex = /^\/(?:[^\\\/:*?"<>|]+\/?)*$/;
  const windowsPathRegex = /^[a-zA-Z]:\\(?:[^\\/:*?"<>|]+\\)*[^\\/:*?"<>|]+$/;

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
 * 创建集群任务
 * @param data
 */
const onSubmit = (data) => {
  let err = validateFormData(data)
  if (err) {
    message.showWarning(this, err)
    return
  }
  axiosplus.post('/api/group_task/add', data)
    .then(r => {
      getList()
      message.showSuccess(this, r.data.msg)
      dialogShow.value = false
      createClusterTaskRef.value.clearForm()
    })

}

onMounted(() => {
  getGroupList()
  getList()
})
</script>


<style scoped>

</style>
