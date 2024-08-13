<template>
  <div class="box">
    <v-text-field
      :rules="[startDatePass || '开始时间不合法']"
      hide-details="auto"
      variant="outlined"
      class="input"
      density="compact"
      v-model="model.start"
      type="datetime-local"/>
    <v-text-field
      :rules="[endDatePass || '结束时间不合法']"
      hide-details="auto"
      variant="outlined"
      class="input"
      density="compact"
      v-model="model.end"
      type="datetime-local"/>
    <v-btn icon="mdi-close" size="small" variant="text" title="清空" @click="empty"/>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import format from "@/scripts/utils/format";


const emit = defineEmits(['input'])

const model = ref({start: '', end: ''})

const startDatePass = () => {
  if (!(model.value.start && model.value.end)) return true
  let startDate = format.convertToTimestamp(model.value.start);
  let endDate = format.convertToTimestamp(model.value.end);
  return startDate <= endDate;

}
const endDatePass = () => {
  if (!(model.value.start && model.value.end)) return true
  let startDate = format.convertToTimestamp(model.value.start);
  let endDate = format.convertToTimestamp(model.value.end);
  return startDate <= endDate;
}
const empty = () => {
  model.value = {start: '', end: ''}
  emit('input', null)
}
watch(() => model.value.start, (n, o) => {
  if (model.value.start && model.value.end) emit('input', model.value)
})
watch(() => model.value.end, (n, o) => {
  if (model.value.end && model.value.start) emit('input', model.value)
})
</script>


<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input {
  margin: 5px;
}
</style>
