<template>
  <v-overlay
    v-if="loading || warning"
    class="align-center justify-center cursor-not-allowed substance"
    :model-value="true"
    contained
    persistent
    no-click-animation
  >
    <Loading v-if="loading"/>
    <div class="Tips" v-if="warning">
      <v-icon :size="60" color="warning">mdi-alert</v-icon>
    </div>
    <br>
    <br>
    <span class="font-weight-black loading-text">{{ text }}</span>
  </v-overlay>
</template>

<script setup>

import Loading from "@/components/public/loading/Loading.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: "加载中..."
  },
  warning: {
    type: Boolean,
    default: false
  }
})
</script>


<style scoped>
.loading-text {
  color: white;
  font-size: 20px;
}

.Tips {
  text-align: center;
}
</style>
