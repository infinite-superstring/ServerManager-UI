<template>
  <v-card class="pageMain-card">
    <v-card-text class="main-content">
      <v-row>
        <ScreenTop :top-data="topData"/>
      </v-row>
      <v-row>
        <ScreenBottom
          :data="bottomData"
          :on-line-count="onLineCount"
        />
        <OverlayLoading :warning="topData.on_line_count < 1 && !isLoading" text="暂无节点在线"/>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

import ScreenTop from "@/components/screen/ScreenTop.vue";
import ScreenBottom from "@/components/screen/ScreenBottom.vue";
import OverlayLoading from "@/components/public/loading/OverlayLoading.vue";

const props = defineProps({
  topData: {
    type: Object,
    required: true
  },
  bottomData: {
    type: Object,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  onLineCount: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>


<style scoped>

.main-content {
  height: 100%;
}

.v-row:nth-child(2) {
  height: 100%;
}


.big-card {
  height: 100%;
}
</style>
