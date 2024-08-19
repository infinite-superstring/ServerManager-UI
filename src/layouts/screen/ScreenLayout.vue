<template>
  <v-card class="pageMain-card" ref="mainCardRef">
    <v-card-title>
      <ScreenHeader
        :date="time"/>
    </v-card-title>
    <v-card-text style="position:relative;">
      <ScreenContent
        :topData="topData"
        :bottomData="bottomData"
        :is-loading="isLoading"
        :on-line-count="topData.on_line_count"
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
import {onMounted, onUnmounted, ref} from "vue";
import OverlayLoading from "@/components/public/loading/OverlayLoading.vue";
import {pollRequest} from "@/scripts/utils/pollRequest";

const isLoading = ref(true)
const loadingText = ref("加载中...")
const poller = ref()
const time = ref()
const topData = ref({})
const bottomData = ref({})
const mainCardRef = ref()

const onmessage = ({data}) => {
  console.log(data)
  isLoading.value = false
  topData.value = data.top
  if (Object.keys(data.body).length < 1) {
    loadingText.value = "数据正在到来"
    isLoading.value = true
  }
  bottomData.value = data.body
  time.value = data.time
}

const startPoll = () => {
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

const fullScreen = () => {
  if (document.fullscreenEnabled) {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
  startPoll()
}

const init = () => {
  fullScreen()
}
onMounted(init)
// 组件卸载时
onUnmounted(() => {
  poller.value && poller.value.stop()
  try {
    if (document.fullscreenEnabled) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  } catch (e) {

  }
})
</script>


<style scoped>

</style>
