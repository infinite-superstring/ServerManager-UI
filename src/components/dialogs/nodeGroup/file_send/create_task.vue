<script>
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import UploadFiles from "@/components/input/uploadFiles.vue";
import cluster_file_send from "@/scripts/apis/cluster_file_send";
import message from "@/scripts/utils/message";

export default {
  name: "create_file_send_task",
  components: {UploadFiles, SelectNodeGroup},
  data() {
    return {
      flag: true,
      group: null,
      path: null,
      files: [],
      uploading: false,
    }
  },
  methods: {
    file_upload_start() {
      /**
       * 开始文件上传回调
       */
      this.uploading = true
    },
    file_upload_result(file_info) {
      /**
       * 文件上传成功回调
       */
      this.files.push(file_info)
    },
    file_upload_end() {
      /**
       * 文件上传完成回调
       */
      this.uploading = false
    },
    submit() {
      cluster_file_send.create_file_send_task(this.group, this.path, this.files).then((res) => {
        message.showSuccess(this, "任务创建成功")
        this.files = []
      })
    }
  }
}
</script>

<template>

  <v-card title="创建分发任务">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <select-node-group v-model="group" label="分发集群"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="path" label="目标目录"/>
        </v-col>
      </v-row>
       <upload-files
         base_url="/api/file_distribution"
         label="要分发的文件"
         prepend_icon=""
         multiple
         :start_callback="file_upload_start"
         :end_callback="file_upload_end"
         :success_callback="file_upload_result"
       />
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="files.length <= 0 || uploading" @click="submit">开始分发</v-btn>
    </v-card-actions>
  </v-card>


</template>

<style scoped>

</style>
