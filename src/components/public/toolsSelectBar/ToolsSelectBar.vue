<template>
  <div class="toolsBar">
    <v-btn
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
          更多
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
    type: Array,
    default: () => [
      {
        prop: 'name',
        label: '选项1',
        optional: [
          {
            label: '选项1-1',
            value: '1-1'
          },
          {
            label: '选项1-2',
            value: '1-2'
          },
          {
            label: '选项1-3',
            value: '1-3'
          }
        ],
      },
      {
        prop: 'name2',
        label: '选项2',
        optional: [
          {
            label: '选项2-1',
            value: '2-1'
          },
          {
            label: '选项2-2',
            value: '2-2'
          },
          {
            label: '选项2-3',
            value: '2-3'
          }
        ],
      },
      {
        prop: 'name3',
        label: '选项3',
        optional: [
          {
            label: '选项3-1',
            value: '3-1'
          },
          {
            label: '选项3-2',
            value: '3-2'
          },
          {
            label: '选项3-3',
            value: '3-3'
          }
        ],
      },
      {
        prop: 'name4',
        label: '选项4',
        optional: [
          {
            label: '选项4-1',
            value: '4-1'
          },
          {
            label: '选项4-2',
            value: '4-2'
          },
          {
            label: '选项4-3',
            value: '4-3'
          }
        ],
      },
    ]
  }
})
const openMany = () => {
  manyIsOpen.value = !manyIsOpen.value
}

const handleSelect = (data) => {
  if (model.value[data.prop] === data.value) {
    delete model.value[data.prop]
  } else {
    model.value[data.prop] = data.value
  }
  emit('option:click', data)
  console.log(model.value)
}
</script>


<style scoped>


</style>
