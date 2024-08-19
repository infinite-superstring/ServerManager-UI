<script>
import cluster_file_send from "@/scripts/apis/cluster_file_send";
import Node_group_send_file_task_info__file_list from "@/components/nodeGroup/group_file_send/info/file_list.vue";

export default {
  name: "node_group_send_file_task_info",
  components: {Node_group_send_file_task_info__file_list},
  props: {
    task_uuid: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close'],
  data() {
    return {
      group: {
        id: null,
        name: null
      },
      file_list: [],
      ctime: null,
      creator: {
        id: null,
        user_name: null
      },
      progress: {},
      tab: null
    }
  },
  methods: {
    get_info() {
      cluster_file_send.get_file_send_task_info(this.task_uuid).then(res => {
        const data = res.data.data
        this.group = data.group
        this.file_list = data.file_list
        this.ctime = data.ctime
        this.creator = data.creator
        this.progress = data.progress
      })
    },
    status_icon(status) {
      switch (status) {
        case "Activity":
          return 'mdi-refresh-circle'
        case "Success":
          return 'mdi-check'
        case "Failure":
          return 'mdi-alert-circle'
        case "Offline":
          return 'mdi-server-off'
      }
    },
    status_color(status) {
      switch (status) {
        case "Activity":
          return ''
        case "Success":
          return 'green'
        case "Failure":
          return 'red'
        case "Offline":
          return 'grey-lighten-1'
      }
    },
    close() {
      this.$emit("close")
    },
    reset() {
      this.group = {
        id: null,
        name: null
      }
      this.file_list = []
      this.ctime = null
      this.creator = {
        id: null,
        user_name: null
      }
      this.progress = {}
    }
  },
  watch: {
    flag(val) {
      if (!val) {
        return
      }
      this.reset()
      this.get_info()
    }
  },
  computed: {

  }
}
</script>

<template>
  <v-dialog
    @update:modelValue="value => {if (!value) {close()}}"
    :model-value="flag"
    width="80%"
    max-width="800px"
  >
    <v-card>
      <v-card-title>
        文件分发任务 - 详情
      </v-card-title>
      <v-card-text>
        任务uuid: {{ task_uuid }}<br>
        执行集群: <span :title="group.id">{{ group.name }}</span><br>
        文件列表：<br>
        <v-tabs v-model="tab">
          <v-tab value="progress">传输进度</v-tab>
          <v-tab value="file_list">文件列表</v-tab>
        </v-tabs>
        <v-window v-model="tab" class="px-1">
          <v-window-item value="progress">
            <v-expansion-panels
              variant="accordion"
              class="progress"
            >
              <v-expansion-panel
                v-for="(value, key) in progress"
                :key="key"
                class="my-1"
              >
                <v-expansion-panel-title>
                  {{ key }}
<!--                  <template v-slot:actions>-->
<!--                    <v-icon :color="status_color(value.status)">-->
<!--                      {{ status_icon(value.status) }}-->
<!--                    </v-icon>-->
<!--                  </template>-->
                </v-expansion-panel-title>
                <v-expansion-panel-text>
<!--                  状态：-->
<!--                  <span v-if="value.status === 'Activity'">活动中</span>-->
<!--                  <span v-else-if="value.status === 'Success'">已完成</span>-->
<!--                  <span v-else-if="value.status === 'Failure'">错误</span>-->
<!--                  <span v-else-if="value.status === 'Offline'">节点离线</span>-->
<!--                  <br>-->
                  <strong>成功文件：</strong>
                  <v-chip class="ma-1" v-for="file_name in value.success_files" :key="file_name">{{ file_name }}</v-chip>
                  <span v-if="value.success_files <= 0">无</span>
                  <br>
                  <strong v-if="value.failure_files.length > 0">失败文件：</strong>
                  <v-chip class="ma-1" v-for="file_name in value.failure_files" :key="file_name">{{ file_name }}</v-chip>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>

          </v-window-item>
          <v-window-item value="file_list">
            <node_group_send_file_task_info__file_list :file_list="file_list"/>
          </v-window-item>
        </v-window>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<style scoped>
.progress {
  margin-top: 15px;
}
</style>
