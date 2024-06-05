<template>
  <simple-view
    :node-list="nodeList"
    v-if="displayMode !== 'AdvancedView'"
    @action:reset_token="args => $emit('action:reset_token', args)"
    @action:del_node="args => $emit('action:del_node', args)"
    @action:click_tag="args => $emit('action:click_tag', args)"
  />
  <advanced-view
    :node-list="nodeList"
    v-else
    @action:reset_token="args => $emit('action:reset_token', args)"
    @action:del_node="args => $emit('action:del_node', args)"
    @action:click_tag="args => $emit('action:click_tag', args)"
  />
</template>

<script>

import SimpleView from "@/components/nodeList/viewMode/simpleView.vue";
import AdvancedView from "@/components/nodeList/viewMode/advancedView.vue";

export default {
  name: 'NodeList',
  components: {AdvancedView, SimpleView},
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
  emits: ['action:del_node', 'action:reset_token', 'action:click_tag']
}
</script>

<style>

</style>
