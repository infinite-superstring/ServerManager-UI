<template>
  <div>
    <div class="d-flex align-items-center">
      <v-file-input
        label="请选择文件"
        counter
        multiple
        show-size
        @change="onFileChange"
      >
        <template v-slot:selection="{ fileNames }">
          <template v-for="(fileName, index) in fileNames" :key="fileName">
            <v-chip
              v-if="index < 8"
              class="me-2"
              color="deep-purple-accent-4"
              size="small"
              label
            >
              {{ fileName }}
            </v-chip>

            <span
              v-else-if="index === 8"
              class="text-overline text-grey-darken-3 mx-2"
            >
          +{{ files.length - 8 }} File(s)
        </span>
          </template>
        </template>
      </v-file-input>
      <v-btn @click="uploadFiles" :disabled="files.length === 0">上传</v-btn>
    </div>
    <!-- 显示每个文件的上传进度 -->
    <div v-for="(file, fileIndex) in files" :key="fileIndex">
      <h3>{{ file.name }}</h3>
      <div v-if="fileUploadProgress[fileIndex] !== undefined">
        <p>上传进度：{{ fileUploadProgress[fileIndex].progress.toFixed(2) }}%</p>
        <div class="progress-bar">
          <div class="progress-bar-fill" :style="{ width: fileUploadProgress[fileIndex].progress + '%' }"></div>
        </div>
        <button v-if="fileUploadProgress[fileIndex].retry" @click="retryUpload(fileIndex)">重试上传</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const CHUNK_SIZE = 2 * 1024 * 1024; // 每个切片的大小为2MB
const WORKER_COUNT = 4; // Web Worker 实例的数量，控制并发上传的数量
const MAX_RETRIES = 5; // 最大重传次数

export default {
  name: "uploadFiles",
  data() {
    return {
      files: [], // 存储用户选择的文件
      currentFileIndex: 0, // 当前处理的文件索引
      currentChunk: 0, // 当前处理的切片索引
      totalChunks: 0, // 总切片数量
      workers: [], // Web Worker 实例数组
      uploadQueue: [], // 上传任务队列
      uploadedChunks: 0, // 已上传的切片数量
      totalFileChunks: 0, // 总切片数量（所有文件）
      fileUploadProgress: [], // 每个文件的上传进度
      retryQueue: [], // 需要重试的任务队列
    };
  },
  methods: {
    onFileChange(event) {
      /**
       * 处理文件选择事件，将选择的文件保存到组件状态。
       * @param {Event} event - 文件选择事件
       */
      this.files = Array.from(event.target.files);
      this.currentFileIndex = 0;
      this.fileUploadProgress = this.files.map(() => ({
        progress: 0,
        totalChunks: 0,
        uploadedChunks: 0,
        retry: false, // 标记文件是否需要重试
        retryQueue: [] // 需要重试的切片队列
      }));
    },
    async uploadFile(file) {
      /**
       * 开始上传指定文件的切片，并行处理文件的切片上传任务。
       * @param {File} file - 需要上传的文件
       */
      const fileIndex = this.currentFileIndex;
      this.totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      this.currentChunk = 0;

      // 更新文件的总切片数量
      this.fileUploadProgress[fileIndex].totalChunks = this.totalChunks;
      this.fileUploadProgress[fileIndex].retryQueue = []; // 清空重试队列

      // 创建多个 Web Worker 实例
      this.workers = Array.from({length: WORKER_COUNT}, () =>
        new Worker(new URL('@/workers/hashWorker.js', import.meta.url), {type: 'module'})
      );

      // 处理每个 Web Worker 的消息
      this.workers.forEach(worker => {
        worker.onmessage = this.onWorkerMessage;
      });

      // 将文件切片任务添加到上传队列中
      this.addChunksToQueue(file);
      this.processQueue();
    },
    addChunksToQueue(file) {
      /**
       * 将文件切片任务添加到上传队列中。
       * @param {File} file - 需要处理的文件
       */
      console.log(`总分片数：${this.totalChunks}`)
      this.uploadQueue = []
      while (this.currentChunk < this.totalChunks) {
        const start = this.currentChunk * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        this.uploadQueue.push({chunk, chunkIndex: this.currentChunk});
        this.currentChunk++;
      }
    },
    /**
     * 处理上传队列中的切片任务。
     */
    processQueue() {
      // 创建一个任务处理的异步函数
      const processTask = async (task) => {
        console.log("add Task:", task)
        const {chunk, chunkIndex} = task
        // 如果没有空闲的 Web Worker，等待直到有 worker 可用
        const worker = await getAvailableWorker();

        worker.postMessage({chunk, chunkIndex});

        return new Promise((resolve, reject) => {
          worker.onmessage = (e) => {
            this.uploadChunk(this.files[this.currentFileIndex], e.data.chunkIndex, e.data.hash)
              .then(() => {
                this.fileUploadProgress[this.currentFileIndex].uploadedChunks++;
                this.updateFileProgress(this.currentFileIndex); // 更新文件进度
              })
              .catch(() => {
                console.log("文件上传失败")
                return reject()
              })
              .finally(() => {
                this.workers.push(worker); // 将 Web Worker 归还到池中
                resolve();
              })
          }
        })
      }

      const getAvailableWorker = async () => {
        return new Promise((resolve) => {
          const checkWorker = () => {
            const worker = this.workers.pop();
            if (worker) {
              return resolve(worker);
            }
            setTimeout(checkWorker, 100); // 每100毫秒检查一次
          };

          checkWorker();
        });
      }
      console.log(this.uploadQueue)
      // 并行处理上传任务
      Promise.all(this.uploadQueue.map(task => processTask(task)))
        .then((res) => {
          console.log(res)
          // 在当前文件的所有切片上传完成后立即触发合并请求
          this.mergeFile(this.files[this.currentFileIndex]);
          // 处理下一个文件
          this.currentFileIndex++;
          if (this.currentFileIndex < this.files.length) {
            this.uploadFile(this.files[this.currentFileIndex]);
          } else {
            console.log('所有文件处理完成');
          }
        })
        .catch(err=>{
        console.error(err)
      })
    },
    /**
     * 上传文件切片到服务器。
     * @param {File} file - 需要上传的文件
     * @param {number} chunkIndex - 当前切片的索引
     * @param {string} hash - 切片的哈希值
     */
    async uploadChunk(file, chunkIndex, hash) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk); // 添加切片数据
      formData.append('hash', hash); // 添加切片哈希值
      formData.append('chunkIndex', chunkIndex); // 添加切片索引
      formData.append('fileName', file.name); // 添加文件名

      try {
        // 使用 axios 发送切片数据到服务器
        await axios.post('/api/file/upload', formData);
      } catch (error) {
        console.error('上传切片失败', error);
        this.retryQueue.push({chunk, chunkIndex}); // 重新加入重试队列
        throw error;
      }
    },
    /**
     * 更新指定文件的上传进度。
     * @param {number} fileIndex - 文件索引
     */
    updateFileProgress(fileIndex) {
      const {totalChunks, uploadedChunks} = this.fileUploadProgress[fileIndex];
      console.log(uploadedChunks, totalChunks)
      if (totalChunks > 0) {
        this.fileUploadProgress[fileIndex].progress = (uploadedChunks / totalChunks) * 100;
        // console.log(this.fileUploadProgress[fileIndex].progress)
      }
    },
    /**
     * 重新上传指定文件。
     * @param {number} fileIndex - 文件索引
     */
    retryUpload(fileIndex) {
      this.fileUploadProgress[fileIndex].retry = false; // 重置重试标记
      this.uploadFile(this.files[fileIndex]); // 重新上传文件
    },
    /**
     * 上传所有选择的文件。
     */
    uploadFiles() {
      if (this.files.length > 0) {
        this.uploadFile(this.files[this.currentFileIndex]);
      } else {
        console.log("未选择文件")
      }
    },
    /**
     * 发送合并文件的请求到服务器。
     */
    async mergeFile(file) {
      try {
        const formData = new FormData();
        formData.append('fileName', file.name);
        formData.append('totalChunks', this.fileUploadProgress[this.currentFileIndex].totalChunks);

        const response = await axios.post('/api/file/merge', formData);

        if (response.status === 200) {
          console.log(`文件 ${file.name} 合并成功`);
        } else {
          console.error(`文件 ${file.name} 合并失败`);
        }
      } catch (error) {
        console.error(`文件 ${file.name} 合并请求失败`, error);
      }
    }
  }
}
</script>

<style>
/* 样式 */
.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  height: 20px;
  margin-top: 10px;
}

.progress-bar-fill {
  height: 100%;
  background-color: #4caf50;
  text-align: center;
  color: white;
  line-height: 20px;
}
</style>
