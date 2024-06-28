<template>
  <div class="toolsBar">
    <v-btn
      base-color="success"
      @click="addWebDialogStatus = true"
    >
      新增网站监控
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="搜索"
      variant="solo-filled"
      single-line
      hide-details
      v-model="search">
    </v-text-field>
  </div>
  <WebList ref="webListRef"></WebList>
  <div class="dialog">
    <AddWebDialog
      @close="addWebDialogStatus = false"
      @submit="onSubmit"
      :status="addWebDialogStatus"
    ></AddWebDialog>
  </div>
</template>

<script setup>

import WebList from "@/components/web_status/WebList.vue";
import AddWebDialog from "@/components/dialogs/web_status/AddWebDialog.vue";
import {ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";

const addWebDialogStatus = ref(false)

const webListRef = ref()

const onSubmit = (data) => {
  axiosplus.post("/api/webStatus/addWeb", data)
    .then(res => {
      if (res.data.status === 1) {
        addWebDialogStatus.value = false
        message.showSuccess(this, res.data.msg)
        webListRef.value.getList()
      } else {
        message.showWarning(this, res.data.msg)
      }
    })
}
</script>


<style scoped>
.toolsBar {
  margin-bottom: 20px;
}
</style>
