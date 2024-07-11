<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-treeview
        @click:select="({id})=>handleSelect(id)"
        :items="treeLists"
        :load-children="getChildren"
        v-if="treeLists.length > 0"
      >
      </v-treeview>
      <not-data v-else/>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col>
      <v-select
        v-model="showCount"
        style="padding-top: 10px"
        variant="outlined"
        density="compact"
        label="选择结果显示的条数"
        persistent-hint
        :items="[10, 20, 50, 100, 200, 500, 1000]"
      />
      <v-divider></v-divider>
      <cluster-task-audit-terminal
        v-if="current_activity"
        :activity="current_activity"
        :too-big="tooBig"
        :command="resultList"/>
      <div v-else class="no-activity">选择一条结果</div>
    </v-col>
  </v-row>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";
import ClusterTaskAuditTerminal from "@/components/tables/auditPage/terminal/clusterTaskAuditTerminal.vue";
import NotData from "@/components/emptyState/notData.vue";

const showCount = ref(10)
const current_activity = ref()
const treeLists = ref([])
const resultList = ref([])
const tooBig = ref(false)

const handleSelect = (value) => {
  if (isObject(value)) {
    current_activity.value = value
    axiosplus.get('/api/admin/auditAndLogger/groupTask/get_result_detail', {params: value})
      .then(r => {
        resultList.value = r.data.data
        tooBig.value = false
      })
      .catch(r => {
        resultList.value = []
        tooBig.value = true
      })
  }
}

const showCountChange = () => {
  for (let i = 0; i < treeLists.value.length; i++) {
    treeLists.value[i].children = []
  }
}

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

const getTaskNameList = () => {
  axiosplus.get('/api/admin/auditAndLogger/groupTask/getNameList')
    .then(r => {
      treeLists.value = r.data.data
    })
}

const getChildren = async (item) => {
  let api = '/api/admin/auditAndLogger/groupTask/'
  let params = {}
  if (item.sign === 'task') {
    api += 'get_node'
    params.uuid = item.id
  }
  if (item.sign === 'node') {
    api += 'get_result'
    params.uuid = item.id
    params.task_uuid = item.task_uuid
    params.show_count = showCount.value
  }
  return axiosplus.get(api, {params})
    .then(r => {
      item.children = r.data.data
    })
}

onMounted(() => {
  getTaskNameList()
})

watch(() => showCount.value, showCountChange)
</script>


<style scoped>
.no-activity {
  padding: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
