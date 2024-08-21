<script>
import {useWebsiteSettingStore} from "@/store/webSiteSetting";
import {check_user_permission} from "@/scripts/utils/permission";

export default {
  name: "toolsBar",
  emits: ['action:search', 'action:addNode', 'action:switch_display_mode'],
  props: {
    search: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      webSiteSettingStore: null,
      currentDisplayMode: null
    }
  },
  created() {
    this.webSiteSettingStore = useWebsiteSettingStore()
    this.currentDisplayMode = this.webSiteSettingStore.viewMode.nodeList
  },
  methods: {
    updateDisplayMode() {
      this.currentDisplayMode = this.webSiteSettingStore.updateViewMode('nodeList')
      this.$emit('action:switch_display_mode', this.currentDisplayMode)
    },
    check_user_permission() {
      return check_user_permission
    }
  }
}
</script>

<template>
  <div class="toolsBar">
    <v-btn
      id="addUser"
      color="success"
      @click="$emit('action:addNode')"
      v-if="check_user_permission('editNode')"
    >
      添加节点
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="按节点名搜索"
      variant="solo-filled"
      single-line
      hide-details
      clearable
      :model-value="search"
      @input="$emit('action:search', $event.target.value)"
      @click:clear="$emit('action:search', '')"
    >
    </v-text-field>
    <v-btn icon title="切换视图模式">
      <v-icon icon="mdi:mdi-dots-vertical" v-if="currentDisplayMode !== 'AdvancedView'" @click="updateDisplayMode()"></v-icon>
      <v-icon icon="mdi:mdi-grid" v-else @click="updateDisplayMode()"></v-icon>
    </v-btn>
  </div>

</template>

<style scoped>

</style>
