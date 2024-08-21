<template>
  <div class="toolsBar">
    <v-btn
      color="success"
      @click="addWebDialogStatus = true"
      v-if="check_user_permission('editWebStatus')"
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
      @input="deOnSearch"
      v-model="search">
    </v-text-field>
  </div>
  <WebList ref="webListRef" @updateWeb="openUpdate"/>
  <div class="dialog">
    <AddWebDialog
      ref="addWebDialogRef"
      @close="addWebDialogStatus = false"
      @submit="onSubmit"
      :status="addWebDialogStatus"
    ></AddWebDialog>
    <UpdateWebDialog
      ref="updateWebDialogRef"
      @close="updateWebDialogStatus = false"
      @submit="onUpdate"
      :status="updateWebDialogStatus"
      :updateWeb="updateWeb"
    >
    </UpdateWebDialog>
  </div>
</template>

<script setup>
import {check_user_permission} from "@/scripts/utils/permission";
import WebList from "@/components/web_status/WebList.vue";
import AddWebDialog from "@/components/dialogs/web_status/AddWebDialog.vue";
import {ref} from "vue";
import message from "@/scripts/utils/message";
import {debounce} from "@/scripts/utils/debounce";
import UpdateWebDialog from "@/components/dialogs/web_status/UpdateWebDialog.vue";
import {addApi, updateApi} from "@/scripts/apis/web_status";

const addWebDialogStatus = ref(false)
const updateWebDialogStatus = ref(false)
const updateWebDialogRef = ref()
const updateWeb = ref({})
const addWebDialogRef = ref()
const webListRef = ref()
const search = ref()

const openUpdate = (data) => {
  console.log(data)
  updateWebDialogStatus.value = true
  updateWeb.value = data
}

const onSubmit = (data) => {
  addApi(data).then(res => {
    if (res.data.status === 1) {
      message.showSuccess(this, res.data.msg)
      webListRef.value.getList()
      addWebDialogStatus.value = false
      addWebDialogRef.value.empty()
    } else {
      message.showWarning(this, res.data.msg)
    }
  })
}
const onUpdate = (data) => {
  updateApi(data).then(res => {
    if (res.data.status === 1) {
      message.showSuccess(this, res.data.msg)
      webListRef.value.getList()
      updateWebDialogStatus.value = false
      updateWebDialogRef.value.empty()
    } else {
      message.showWarning(this, res.data.msg)
    }
  })
}

const onSearch = () => {
  webListRef.value.getList(search.value)
}
const deOnSearch = debounce(onSearch, 500)

</script>


<style scoped>
.toolsBar {
  margin-bottom: 20px;
}
</style>
