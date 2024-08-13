<template>
  <v-btn icon title="切换视图模式">
    <v-icon icon="mdi:mdi-dots-vertical" v-if="currentDisplayMode !== 'AdvancedView'"
            @click="updateDisplayMode()"></v-icon>
    <v-icon icon="mdi:mdi-grid" v-else @click="updateDisplayMode()"></v-icon>
  </v-btn>
</template>

<script setup>

import {ref} from "vue";
import {useWebsiteSettingStore} from "@/store/webSiteSetting";

const emit = defineEmits(['switch_display_mode'])
const currentDisplayMode = ref()
const webSiteSettingStore = useWebsiteSettingStore()
const updateDisplayMode = () => {
  currentDisplayMode.value = webSiteSettingStore.updateViewMode('nodeList')
  emit('switch_display_mode', currentDisplayMode.value)
}
</script>


<style scoped>

</style>
