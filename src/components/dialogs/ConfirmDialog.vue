<template>
  <v-dialog
    v-model="props.state"
    activator="parent"
    min-width="400px"
    width="auto"
    persistent
  >
    <template #default>
      <v-card>
        <v-card-title :style="[{textAlign: props.titleCenter ? 'center' : 'left'}]">{{ props.title }}</v-card-title>
        <v-card-text :style="[{textAlign: props.contentCenter ? 'center' : 'left'}]">
          {{ props.content }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="confirm">确定
          </v-btn>
          <v-btn color="error" @click="close">取消</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup>
const props = defineProps({
  state: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  contentCenter: {
    type: Boolean,
    default: false
  },
  titleCenter: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['confirm', 'close'])

const confirm = () => {
  emits('confirm', true)
}
const close = () => {
  emits('close', true)
}
</script>


<style scoped>

</style>
