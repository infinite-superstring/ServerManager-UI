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
  </v-overlay>
</template>

<script setup>

import Loading from "@/components/public/loading/Loading.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>


<style scoped>

</style>
