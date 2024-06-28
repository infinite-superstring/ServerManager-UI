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
            <div class="text-caption">
              内容
            </div>
            <v-textarea :rules="rules.content" v-model="formData.content" clearable></v-textarea>
          </div>
          <div>
            <div class="text-caption">
              状态
            </div>
            <v-select :rules="rules.status" type="text" v-model="formData.status"
                      :items="['正常','待观察','异常']"></v-select>
          </div>
          <div>
            <div class="text-caption">
              图片
            </div>
            <v-text-field :rules="rules.image" type="text" v-model="formData.image"></v-text-field>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn base-color="error" @click="close()">取消</v-btn>
        <v-btn base-color="success" @click="submit()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import message from "@/scripts/utils/message";

const formRef = ref(null)
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
})
const emit = defineEmits(['close', 'submit'])

const formData = ref({
  content: '',
  status: '',
  image: '',
})

const rules = {
  content: [
    v => !!v || '内容不能为空',
    v => v.length <= 100 || '内容长度不能超过100个字符',
    v => v.length >= 10 || '内容长度不能少于10个字符',
  ],
  status: [
    v => !!v || '状态不能为空',
  ],
  image: [
    v => !!v || '图片不能为空',
  ],
}

const close = () => {
  emit('close')
}
const submit = () => {
  formRef.value.validate().then(v => {
    if (!v.valid) {
      console.log(v.valid);
      message.showError(this, '请检查输入')
      return
    }
    emit('submit', formData.value)
  })
}
watch(()=>props.status,() => {
  if (props.data !== null) {
    formData.value = props.data
  }
})
</script>


<style scoped>

</style>
