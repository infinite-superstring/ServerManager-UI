<template>
  <div class="toolsBar">
    <v-btn
      id="addPatrol"
      base-color="success"
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
  <PatrolList/>
  <new-patrol/>
</template>

<script setup>

import PatrolList from "@/components/tables/patrol/PatrolList.vue";
import {ref} from "vue";
import NewPatrol from "@/components/dialogs/patrol/newPatrol.vue";
const addDialogShow = ref(false)
/**
 * 打开添加对话框
 */
const openAddDialog = () => {
  console.log("openAddDialog")
}
</script>

<style scoped>

</style>
