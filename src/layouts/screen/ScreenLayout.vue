<template>
  <v-card class="pageMain-card">
    <v-card-title>
      <ScreenHeader
        node-list=""
        node-name="我是节点"
        date="2023-01-01 00:00:00"/>
    </v-card-title>
    <v-card-text style="height: 100%;">
      <ScreenContent/>
      <OverlayLoading :loading="isLoading"/>
    </v-card-text>
  </v-card>
</template>

<script setup>
import ScreenHeader from "@/components/screen/ScreenHeader.vue";
import ScreenContent from "@/components/screen/ScreenContent.vue";
import {onMounted, ref} from "vue";
import OverlayLoading from "@/components/public/loading/OverlayLoading.vue";
import node_manager from "@/scripts/apis/node_manager";

const isLoading = ref(false)
const nodeLists = ref()

const linkToSSE = () => {
  let eventSource = new EventSource(`http://${location.host}/api/screen/sse/get_data`)
  eventSource.onmessage = (event) => {
    console.log(event)
  }
}

const init = async () => {
  isLoading.value = true
  const {data} = await node_manager.getNodeListApi({page: 1, pageSize: 5})
  isLoading.value = false
}
onMounted(init)
</script>


<style scoped>

</style>
