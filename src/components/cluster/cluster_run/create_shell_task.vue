<template>
  <v-card title="运行器">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <select-node-group
            v-model="group"
            ref="group_selectRef"
            label="执行集群"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="执行目录" max-length="512" v-model="base_path"></v-text-field>
        </v-col>
      </v-row>
      <cluster-command ref="shell_inputRef" class="shell_input" v-model="shell"/>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="disabledSubmit" @click="submit">执行</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import message from "@/scripts/utils/message";
import ClusterCommand from "@/components/cluster/form/ClusterCommand.vue";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import {ref} from "vue";

const props = defineProps({
  disabledSubmit: {
    type: Boolean,
    default: false
  }
})
const shell_inputRef = ref()
const group_selectRef = ref()
const emit = defineEmits(['onSubmit'])

const group = defineModel('group')
const base_path = defineModel('base_path')
const shell = defineModel('shell', {default: ''})

const submit = () => {
  if (!group.value) return message.showError(this, "未选择运行组")
  if (shell.value.length < 1) return message.showError(this, "未编写要运行的Shell")
  emit('onSubmit', {node_group: group.value, base_path: base_path.value, shell: shell.value})
}

const reset = () => {
  group.value = null
  base_path.value = null
  shell.value = ''
  shell_inputRef.value.clearShell()
  group_selectRef.value.reset()
}
const setData = (data) => {
  group.value = data.group
  base_path.value = data.base_path
  shell.value = data.shell
  shell_inputRef.value.setShell(data.shell)
  group_selectRef.value.setSelect(data.group)
}
defineExpose({
  reset,
  setData
})
</script>

<style scoped>
.shell_input {
  max-height: 450px;
  min-height: 300px;
  height: 70vh
}
</style>
