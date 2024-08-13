<template>
  <div class="toolsBar">
    <v-btn
      v-if="!hideAddButton"
      color="success"
      @click="$emit('addButtonClick')"
    >
      {{ buttonLabel }}
    </v-btn>
    <v-text-field
      v-model="model.search"
      class="search"
      density="compact"
      :label="searchLabel"
      variant="solo-filled"
      single-line
      hide-details
      clearable
      @input="emit('search:input')"
    >
      <template #append-inner>
        <v-btn
          prepend-icon="mdi-view-grid"
          title="更多选项"
          @click="openMany"
          variant="text">
          筛选条件
        </v-btn>
      </template>
    </v-text-field>
    <slot name="append"></slot>
  </div>
  <ManySelect
    :open="manyIsOpen"
    @select="handleSelect"
    :options="options"
  />
</template>

<script setup>
import {ref} from "vue";
import ManySelect from "@/components/public/toolsSelectBar/ManySelect.vue";

const model = defineModel({default: {}})
const emit = defineEmits(['addButtonClick', 'search:input', 'option:click'])
const manyIsOpen = ref(false)
const props = defineProps({
  searchLabel: {
    type: String,
    default: '按内容搜索'
  },
  buttonLabel: {
    type: String,
    default: '点击添加'
  },
  options: {
    type: Array
  },
  hideAddButton: {
    type: Boolean,
    default: false
  }
})
const openMany = () => {
  manyIsOpen.value = !manyIsOpen.value
}

/*
 *
 *                               未实现
 * type: 'radio' | 'checkbox' | 'date' | 'date-range'
 * 单选 多选 日期 日期范围
 *
 */
const handleSelect = (data) => {
  switch (data.type) {
    case 'radio'://单选处理方式
      if (model.value[data.prop] === data.value) {
        delete model.value[data.prop]
      } else {
        model.value[data.prop] = data.value
      }
      break
    case 'checkbox'://多选处理方式
      if (model.value[data.prop] === undefined) {
        model.value[data.prop] = [data.value]
      } else {
        if (model.value[data.prop].includes(data.value)) {
          model.value[data.prop] = model.value[data.prop].filter(item => item !== data.value)
        } else {
          model.value[data.prop].push(data.value)
        }
        if (model.value[data.prop].length === 0) {
          delete model.value[data.prop]
        }
      }
      break
    case 'date'://日期处理方式
      model.value[data.prop] = data.value
      break
    case 'date-range'://日期范围处理方式
      if (data.value) {
        model.value[data.prop] = data.value
      } else {
        delete model.value[data.prop]
      }
      break
  }

  emit('option:click', data)
  console.log(model.value)
}
</script>


<style scoped>


</style>
