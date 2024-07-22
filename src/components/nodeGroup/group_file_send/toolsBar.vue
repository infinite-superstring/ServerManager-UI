<script>
export default {
  name: "node_group_send_file_task_tools_bar",
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
      v-if="$user.check_user_permission('editNodeGroup')"
    >
      创建文件分发任务
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label=""
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
