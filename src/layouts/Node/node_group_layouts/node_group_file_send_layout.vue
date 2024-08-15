<script>
import Node_group_send_file_task_tools_bar from "@/components/nodeGroup/group_file_send/toolsBar.vue";
import Node_group_send_file_task_list from "@/components/nodeGroup/group_file_send/groupList.vue";
import Create_file_send_task from "@/components/dialogs/nodeGroup/file_send/create_task.vue";

export default {
  name: "node_group_file_send_layout",
  components: {Create_file_send_task, Node_group_send_file_task_list, Node_group_send_file_task_tools_bar}
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <create_file_send_task/>
    </v-col>
    <v-col cols="12" sm="8">
      <node_group_send_file_task_list value=""/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
