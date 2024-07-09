<template>
  <v-row>
    <v-col cols="4">
      <v-treeview
        @click:select="({id})=>handleSelect(id)"
        :items="treeLists"
        :load-children="getChildren"
      >

      </v-treeview>
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
      {{ current_activity }}
    </v-col>
  </v-row>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";

const showCount = ref(30)
const current_activity = ref()
const treeLists = ref([])

const handleSelect = (value) => {
  if (isObject(value)) {
    current_activity.value = value.uuid
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
  console.log(item)
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
</script>


<style scoped>

</style>
