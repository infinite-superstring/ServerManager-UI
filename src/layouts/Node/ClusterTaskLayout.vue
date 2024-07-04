<template>
  <VCard>
    <v-card-title>
      <div class="toolsBar">
        <v-btn
          base-color="success"
          @click="dialogShow = true"
        >
          添加集群任务
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
    </v-card-title>
    <v-card-text>
      <ClusterTaskList :list="list"/>
    </v-card-text>
    <create-cluster-task
      :groupList="groupList"
      :status="dialogShow"
      @close="dialogShow = false"
      @submit="onSubmit"
      :title="'添加集群任务'"
    />
  </VCard>
</template>

<script setup>

import ClusterTaskList from "@/components/cluster/ClusterTaskList.vue";
import CreateClusterTask from "@/components/cluster/CreateClusterTaskDialog.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";

const dialogShow = ref(false)
const groupList = ref([])
const list = ref([])

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
    return '执行类型不能为空';
  }

  // 根据 execType 判断对应字段的必填校验
  if (formData.execType === 'date-time' && !formData.execTime.trim()) {
    return '执行时间不能为空';
  } else if (formData.execType === 'cycle' && (!formData.execCycle.week.length || !formData.execCycle.time.trim())) {
    return '执行周期不能为空';
  } else if (formData.execType === 'interval' && !formData.execInterval) {
    return '执行间隔不能为空';
  }

  return false;
}

const onSubmit = (data) => {
  let err = validateFormData(data)
  if (err) {
    message.showWarning(this, err)
    return
  }

}

onMounted(() => {
  getGroupList()
})
</script>


<style scoped>

</style>
