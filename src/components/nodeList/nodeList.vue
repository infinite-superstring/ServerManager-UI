<template>
  <simple-view
    :node-list="nodeList"
    v-if="displayMode !== 'AdvancedView' && nodeList.length > 0"
    @action:reset_token="args => $emit('action:reset_token', args)"
    @action:del_node="args => $emit('action:del_node', args)"
    @action:click_tag="args => $emit('action:click_tag', args)"
    @action:click_status="args => $emit('action:click_status', args)"
  />
  <advanced-view
    :node-list="nodeList"
    v-else-if="displayMode === 'AdvancedView' && nodeList.length > 0"
    @action:reset_token="args => $emit('action:reset_token', args)"
    @action:del_node="args => $emit('action:del_node', args)"
    @action:click_tag="args => $emit('action:click_tag', args)"
    @action:edit="args => $emit('action:edit', args)"
  />
  <not-data v-else/>
</template>

<script>

import SimpleView from "@/components/nodeList/viewMode/simpleView.vue";
import AdvancedView from "@/components/nodeList/viewMode/advancedView.vue";
import NotData from "@/components/emptyState/notData.vue";

export default {
  name: 'NodeList',
  components: {NotData, AdvancedView, SimpleView},
  props: {
    nodeList: {
      type: Array,
      required: true
    },
    displayMode: {
      type: String,
      required: true
    }
  },
  emits: ['action:del_node', 'action:reset_token', 'action:edit', 'action:click_tag', 'action:click_status']
}
</script>

<style>

</style>
