<script>
import Node_group_send_file_task_list from "@/components/nodeGroup/group_file_send/list.vue";
import Create_file_send_task from "@/components/dialogs/nodeGroup/file_send/create_task.vue";
import cluster_file_send from "@/scripts/apis/cluster_file_send";
import Node_group_send_file_task_info from "@/components/nodeGroup/group_file_send/info.vue";

export default {
  name: "node_group_file_send_layout",
  components: {Node_group_send_file_task_info, Create_file_send_task, Node_group_send_file_task_list},
  data() {
    return {
      currentPage: null,
      maxPage: null,
      task_list: [],
      task_info: {
        flag: false,
        uuid: null
      }
    }
  },
  mounted() {
    this.get_task_list()
  },
  methods: {
    get_task_list(page = 1, page_size = 20) {
      console.log(page)
      cluster_file_send.get_file_send_task_list(page, page_size).then(res => {
        const data = res.data.data
        this.maxPage = data.maxPage
        this.currentPage = data.currentPage
        this.task_list = data.PageContent
      })
    },
    show_task_info(uuid) {
      if (this.task_info.flag && !uuid) {
        return
      }
      this.task_info.uuid = uuid
      this.task_info.flag = true
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <create_file_send_task @success="get_task_list(this.currentPage)"/>
    </v-col>
    <v-col cols="12" sm="8">
      <node_group_send_file_task_list :value="task_list" @action:show_info="uuid => show_task_info(uuid)"/>
    </v-col>
  </v-row>

  <v-pagination
    v-model="currentPage"
    @update:modelValue="value => get_task_list(value)"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  />

  <div class="dialogs">
    <node_group_send_file_task_info
      :task_uuid="task_info.uuid"
      :flag="task_info.flag"
      @close="()=>{task_info.uuid=null; task_info.flag = false}"
    />
  </div>
</template>

<style scoped>

</style>
