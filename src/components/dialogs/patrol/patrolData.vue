<template>
  <v-dialog
    :model-value="props.status"
    min-width="400px"
    width="auto"
    persistent
    @close="close"
  >
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <div>
            <div class="text-caption">标题</div>
            <v-text-field :rules="rules.title" type="text" v-model="formData.title"></v-text-field>
          </div>
          <div>
            <div class="text-caption">内容</div>
            <v-textarea :rules="rules.content" v-model="formData.content" clearable></v-textarea>
          </div>
          <div>
            <div class="text-caption">状态</div>
            <v-select :rules="rules.status" v-model="formData.status"
                      :items="['正常', '待观察', '异常']"></v-select>
          </div>
          <div v-if="title !== '更新记录'">
            <div class="text-caption">上传图片</div>
            <upload-files
              base_url="/api/patrol"
              accept="image/*"
              :start_callback="upload_start_callback"
              :success_callback="upload_success_callback"
              :end_callback="upload_end_callback"
              multiple
            />
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submit">确定</v-btn>
        <v-btn color="error" @click="close">取消</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>
<script setup>
import {nextTick, ref, watch} from 'vue';
import message from '@/scripts/utils/message';
import Cropper from "cropperjs";
import {uploadImageApi} from "@/scripts/apis/patrol";
import UploadFiles from "@/components/input/uploadFiles.vue";

const formRef = ref(null);
const imageName = ref('');
const imageId = ref(null);
const isCrop = ref(false)
const cropCanvasRef = ref(null)
const cropEl = ref()
const uploadImageFlag = ref(false);
const image_list = [];

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  title: {
    type: String,
    required: true,
    default: '新增记录'
  },
  data: {
    type: Object,
    required: false,
    default: null
  }
});
const emit = defineEmits(['close', 'submit']);

const formData = ref({
  content: '',
  status: '',
  title: ''
});

const rules = {
  content: [
    v => !!v || '内容不能为空',
    v => v.length <= 100 || '内容长度不能超过100个字符',
    v => v.length >= 10 || '内容长度不能少于10个字符'
  ],
  status: [
    v => !!v || '状态不能为空'
  ],
  title: [
    v => !!v || '标题不能为空'
  ]
};

const close = () => {
  emit('close');
};

const upload_success_callback = (data) => {
  console.log(data.hash)
  image_list.push(data.hash)
}

const upload_start_callback = () => {
  uploadImageFlag.value = true
}
const upload_end_callback = () => {
  uploadImageFlag.value = false
}

const submit = () => {
  formRef.value.validate().then(async (v) => {
    if (!v.valid) {
      message.showError(this, '请检查输入');
      return;
    }
    if (uploadImageFlag.value) {
      message.showError(this, '图片未上传完成')
    }
    const dataToSubmit = {...formData.value, images: image_list};
    emit('submit', dataToSubmit);
  });
};

watch(() => props.status, () => {
  if (props.data !== null) {
    formData.value = props.data;
  }
});

watch(() => isCrop.value, () => {
  console.log(isCrop.value)
})
</script>
