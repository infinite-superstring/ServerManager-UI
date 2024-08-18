<template>
  <v-card class="pageMain-card">
    <v-card-title>
      <ScreenHeader
        :date="time"/>
    </v-card-title>
    <v-card-text>
      <ScreenContent
        :topData="topData"
        :bottomData="bottomData"
      />
      <OverlayLoading
        :loading="isLoading"
        :text="loadingText"
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import ScreenHeader from "@/components/screen/ScreenHeader.vue";
import ScreenContent from "@/components/screen/ScreenContent.vue";
import {onMounted, ref, watch} from "vue";
import OverlayLoading from "@/components/public/loading/OverlayLoading.vue";
import {pollRequest} from "@/scripts/utils/pollRequest";

const isLoading = ref(true)
const loadingText = ref("加载中...")
const poller = ref()
const time = ref()
const topData = ref({})
const bottomData = ref({})

const onmessage = ({data}) => {
  console.log(data)
  isLoading.value = false
  topData.value = data.top
  if (Object.keys(data.body).length < 1){
    loadingText.value = "数据正在到来"
    isLoading.value = true
  }
  bottomData.value = data.body
  time.value = data.time
}

const init = () => {
  poller.value = pollRequest({
    url: '/api/screen/sse/get_data',
    method: 'get',
    onSuccess: onmessage,
    onError: (error) => {
      isLoading.value = true
      loadingText.value = "失去连接"
      console.log(error)
    },
    interval: 2,
    retryOnFailure: true
  })
}
onMounted(init)
</script>


<style scoped>

</style>
