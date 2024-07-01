<template>
  <v-overlay
    v-model="show"
    class="align-center justify-center cursor-not-allowed substance"
    contained
    persistent
    no-click-animation
  >
    <v-empty-state>
      站点离线中！
    </v-empty-state>
  </v-overlay>
</template>

<script setup>
import {ref} from "vue";

const show = ref(true)
</script>


<style scoped>
.substance {
  height: 50%;
  max-height: 120px;
  min-height: 120px;
  position: relative;
  bottom: 0;
}
</style>
