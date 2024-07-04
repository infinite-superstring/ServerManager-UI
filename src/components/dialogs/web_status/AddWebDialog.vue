<template>
  <v-dialog
    persistent
    v-model="flag"
    width="400">
    <v-card>
      <v-card-title class="headline">
        <span class="text-h5">
          添加监控网站
        </span>
      </v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            网站标题
          </div>
          <v-text-field type="text" :rules="[v => !!v || '请输入网站标题']" v-model="data.title"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            主机地址
          </div>
          <v-text-field
            v-model="data.host"
            required
            :rules="rules"
          />
        </div>

        <div>
          <div class="text-caption">
            描述
          </div>
          <v-textarea
            v-model="data.description"></v-textarea>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submit()">确定</v-btn>
        <v-btn color="error" @click="close()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

import {ref, watch} from "vue";

const emit = defineEmits(['close', 'submit'])

const props = defineProps({
  status: {
    type: Boolean,
    default: false
  }
})
const data = ref({})
const flag = ref(false)

const rules = ref([
  v => !!v || '请输入主机地址',
  v => /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(v) ||
    '请输入正确的主机地址',
]);

const close = () => {
  emit('close')
}
const submit = () => {
  emit('submit', data.value)
}

const empty = () => {
  data.value = {}
}

watch(() => props.status, (val) => {
  flag.value = val
})

// 暴露出去
defineExpose({
  empty
})

</script>


<style scoped>

</style>
