<script>
import Node_group_send_file_task_tools_bar from "@/components/nodeGroup/group_file_send/toolsBar.vue";
import Node_group_send_file_task_list from "@/components/nodeGroup/group_file_send/groupList.vue";

export default {
  name: "node_group_file_send_layout",
  components: {Node_group_send_file_task_list, Node_group_send_file_task_tools_bar}
}
</script>

<template>
  <node_group_send_file_task_tools_bar search=""/>
  <node_group_send_file_task_list value=""/>
  <div class="dialogs">

  </div>
</template>

<style scoped>

</style>
