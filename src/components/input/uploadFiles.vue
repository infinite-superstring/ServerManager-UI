<template>
  <div>
    <div class="d-flex align-items-center">
      <v-file-input
        v-model="file"
        :accept="accept"
        :label="label"
        :prepend-icon="prepend_icon"
        :multiple="multiple"
        :counter="multiple"
        :show-size="show_size"
        :clearable="false"
        :disabled="uploading"
        @change="() => {if (auto_upload) upload()}"
        :hide-details = "!hide_progress"
      >
        <template v-if="multiple" v-slot:selection="{ fileNames }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
              v-if="index < 8"
              class="me-2"
              :color="chip_color"
              size="small"
              label
            >
              {{ fileName }}
            </v-chip>
            <span
              v-else-if="index === 8"
              class="text-overline text-grey-darken-3 mx-2"
            >
              +{{ file.length - 8 }} 文件
            </span>
          </template>
        </template>
        <template #append>
          <v-btn
            @click="upload"
            v-if="!auto_upload && show_upload_button"
            :disabled="file.length === 0 && !this.uploading"
            :prepend-icon="multiple ? 'mdi-upload-multiple' : 'mdi-upload'"
          >
            {{ upload_button_text }}
          </v-btn>
        </template>
      </v-file-input>
    </div>
    <v-sheet v-if="!hide_progress && file_info.length > 0" :max-height="progress_box_max_height" width="100%" class="overflow-auto progress">
      <div v-for="item in file_info" :key="item.file_name">
        <h3>{{ item.file_name }}</h3>
        <div>
          <v-progress-linear
            v-model="item.progress.value"
            :color="item.progress.status === -1 ? 'error' : 'light-blue'"
            :height="progress_height"
            :striped="item.progress.status === 0"
          >
            <template v-slot:default="{ value }">
            <span v-if="item.progress.status === -1">
              上传失败
            </span>
              <span v-if="item.progress.status === 0">
              {{ Math.ceil(value) }} %
            </span>
              <span v-if="item.progress.status === 1">
              已完成
            </span>
            </template>
          </v-progress-linear>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import axios from '@/scripts/utils/axios';
import message from "@/scripts/utils/message";
import asyncPool from 'tiny-async-pool';
import fileUtils from "@/scripts/utils/fileUtils";
import formDataUtils from "@/scripts/utils/formDataUtils";

export default {
  name: "uploadFiles",
  data() {
    return {
      uploading: false,  // 标识正在上传文件
      file: [],  // 文件列表
      file_info: [],  // 文件信息
      upload_progress: [],  // 上传进度
      success_count: 0,  // 成功计数器
      failure_count: 0,  // 失败计数器
    }
  },
  computed: {},
  props: {
    label: {
      type: String,
      default: "上传文件..."
    },
    multiple: {
      type: Boolean,
      default: false
    },
    prepend_icon: {
      type: String,
      default: "$file",
    },
    accept: {
      type: String,
      default: "",
    },
    chip_color: {
      /**
       * 文件卡片颜色
       */
      type: String,
      default: "deep-purple-accent-4"
    },
    show_size: {
      /**
       * 显示要上传的文件大小
       */
      type: Boolean,
      default: true,
    },
    hide_progress: {
      type: Boolean,
      default: false
    },
    progress_height: {
      /**
       * 单条进度条高度
       */
      type: Number,
      default: 20
    },
    progress_box_max_height: {
      /**
       * 进度条盒子最大高度
       */
      type: Number,
      default: 200
    },
    auto_upload: {
      /**
       * 自动触发上传
       */
      type: Boolean,
      default: false
    },
    show_upload_button: {
      /**
       * 显示上传按钮
       */
      type: Boolean,
      default: true
    },
    upload_button_text: {
      type: String,
      default: "上传"
    },
    base_url: {
      /**
       * 上传基础URL(不带方法)
       */
      type: String,
      required: true
    },
    chunk_size: {
      /**
       * 上传文件块大小（MB）
       */
      type: Number,
      default: 2
    },
    threads: {
      /**
       * 上传线程数
       */
      type: Number,
      default: 8
    },
    start_callback: {
      type: Function,
      default: null
    },
    end_callback: {
      type: Function,
      default: null
    },
    success_callback: {
      type: Function,
      default: null
    }
  },
  methods: {
    async upload() {
      /**
       * 启动上传文件
       */
      if (this.uploading) return message.showWarning(this, "已有文件正在上传中，请耐心等待");
      this.uploading = true
      this.file_info = []
      this.upload_progress = {}
      this.success_count = 0
      this.failure_count = 0
      const files = this.file
      if (this.start_callback) {this.start_callback()}
      files.forEach((file, index) => {
        this.file_info[index] = ({
          file_name: file.name,  // 文件名
          file_size: file.name,  // 文件大小
          file_chunks: fileUtils.create_chunks(file, this.chunk_size * 1024 * 1024),  // 创建文件块
          progress: {  // 文件上传进度
            uploaded_count: 0,
            value: 0,  // 上传进度值
            status: 0  // -1: 文件传输失败 0: 未完成 1: 已完成
          }
        })
      })

      for (let i = 0; i < this.file_info.length; i++) {
        const file_info = this.file_info[i]
        file_info.chunk_hash_list = []
        const tasks = file_info.file_chunks.map((chunk, index) => {
          return {
            chunk: chunk,
            index: index
          }
        })
        // 异步上传文件块
        for await (const result of asyncPool(this.threads, tasks, fileUtils.calculateChunkHash)) {
          const {hash, index} = result
          file_info.chunk_hash_list[index] = hash
          const formData = new FormData();
          formData.append("file", file_info.file_chunks[index])
          formData.append("index", index)
          formData.append("hash", hash)
          try {
            const upload_res = await axios.post(this.base_url + "/upload", formData)
            if (upload_res.data.status === 1) {
              this.handle_upload_progress(i)
              continue
            }
          } catch (e) {
            console.log("文件", file_info.file_name, "上传失败")
          }
          console.log('文件块上传失败')
          this.handle_upload_error(i)
          break
        }
        // 如果状态不对于1则不合并文件
        if (file_info.progress.status !== 1) continue
        // 合并文件
        try {
          const upload_res = await axios.post(this.base_url + "/merge", formDataUtils.new_form_data({
            file_name: file_info.file_name,
            chunk_count: file_info.file_chunks.length,
            chunk_hash_list: file_info.chunk_hash_list
          }))
          if (upload_res) {
            this.success_count += 1
            // 触发回调
            if (this.success_callback) {
              this.success_callback(upload_res.data.data)
            }
          }
        } catch (e) {
          // message.showError(this, `文件合并失败：${e}`)
          console.log('文件合并失败')
          console.log(e)
          this.handle_upload_error(i)
        }
      }
      this.uploading = false
      const msg = "文件上传完成！"
      this.file = []
      if (this.failure_count !== 0) {
        message.showWarning(this, msg + `失败：${this.failure_count}`)
        return
      }
      message.showSuccess(this, msg)
      if (this.end_callback) {this.end_callback()}
    },
    handle_upload_progress(file_index) {
      /**
       * 处理进度条
       */
      const file_info = this.file_info[file_index]
      let uploaded_count = this.file_info[file_index].progress.uploaded_count += 1
      const percentage = (uploaded_count / file_info.file_chunks.length) * 100
      file_info.progress.value = percentage.toFixed(1)
      if (percentage >= 100) file_info.progress.status = 1
    },
    handle_upload_error(file_index) {
      /**
       * 处理文件上传错误
       */
      const file_info = this.file_info[file_index]
      file_info.progress.status = -1
      this.failure_count += 1
      console.log(this.file_info[file_index])
      console.log(this.failure_count)
    }
  }
}
</script>

<style>
.progress {
  margin-top: 15px;
}
</style>
