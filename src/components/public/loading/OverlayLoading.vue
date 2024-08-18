<template>
  <v-overlay
    v-if="loading"
    class="align-center justify-center cursor-not-allowed substance"
    :model-value="true"
    contained
    persistent
    no-click-animation
  >
    <Loading v-if="loading"/>
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
  }
})
</script>


<style scoped>
.loading-text {
  color: white;
  font-size: 20px;
}
</style>
