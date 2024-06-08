<template>
  <VDialog
    :model-value="status"
    min-width="500px"
    max-width="500px"
    width="auto"
    persistent
    @close="close"
  >
    <v-card>
      <v-card-title>内容详细</v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            内容
          </div>
          <div class="content">
            {{ data.content }}
          </div>
        </div>
        <div>
          <div class="text-caption">
            图片
          </div>
          <VImg :src="data.image" max-height="200px" max-width="200px"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn base-color="success" @click="close()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </VDialog>
</template>

<script setup>
const props = defineProps({
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  data: {
    type: Object,
    required: true,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>


<style scoped>
.content {
  text-indent: 2em;
}
</style>
