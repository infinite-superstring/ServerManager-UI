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
          <div>
            <div class="text-caption">上传图片</div>
            <v-file-input
              label="选择图片"
              accept="image/*"
              @change="uploadImage"
            />
            <div v-if="imageName">已选择图片: {{ imageName }}</div>
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
import { ref, watch } from 'vue';
import axios from 'axios';
import message from '@/scripts/utils/message';

const formRef = ref(null);
const imageName = ref('');
const imageId = ref(null);

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

const uploadImage = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const formDataImage = new FormData();
  formDataImage.append('image', file);

  try {
    const response = await axios.post('/api/patrol/upload_image', formDataImage, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(response);
    imageId.value = response.data.image_id;
    imageName.value = file.name;
    message.showSuccess('图片上传成功');
  } catch (error) {
    console.error('Error uploading image:', error);
    message.showError('图片上传失败');
  }
};

const submit = () => {
  formRef.value.validate().then(async (v) => {
    if (!v.valid) {
      message.showError('请检查输入');
      return;
    }

    const dataToSubmit = { ...formData.value, image_id: imageId.value };
    emit('submit', dataToSubmit);
  });
};

watch(() => props.status, () => {
  if (props.data !== null) {
    formData.value = props.data;
  }
});
</script>
