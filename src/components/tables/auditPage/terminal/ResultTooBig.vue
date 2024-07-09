<template>
  <v-overlay
    :model-value="props.show"
    class="align-center justify-center cursor-not-allowed substance"
    contained
    persistent
    no-click-animation
  >
    <v-empty-state>
      <span class="tips">
        <v-icon>mdi-alert</v-icon>
        结果太大！请下载文件查看!
      </span>
    </v-empty-state>
  </v-overlay>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>


<style scoped>
.tips {
  color: white;
}
</style>
