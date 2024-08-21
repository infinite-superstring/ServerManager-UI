<script>
import {check_user_permission} from "@/scripts/utils/permission";
export default {
  name: "node_group_tools_bar",
  methods: {
    check_user_permission() {
      return check_user_permission
    }
  },
   emits: ['action:search', 'action:create_group'],
  props: {
    search: {
      type: String,
      required: true
    }
  },
}
</script>

<template>
  <div class="toolsBar">
    <v-btn
      id="addUser"
      color="success"
      @click="$emit('action:create_group')"
      v-if="check_user_permission('editNodeGroup')"
    >
      创建集群
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="按集群名搜索"
      variant="solo-filled"
      single-line
      hide-details
      :model-value="search"
      @input="$emit('action:search', $event.target.value)"
    >
    </v-text-field>
  </div>
</template>

<style scoped>

</style>
