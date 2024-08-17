<script>
import objectUtils from "@/scripts/utils/objectUtils";

export default {
  name: "selectNode",
  computed: {
    objectUtils() {
      return objectUtils
    }
  }
}
</script>

<template>
  <v-autocomplete
    v-model="select"
    :items="nodeListData"
    item-title="name"
    item-value="uuid"
    color="primary"
    :label="label"
    @update:search="value => getNodeBaseList(value)"
    @update:model-value="selectEmit"
    multiple
    return-object
    auto-select-first
  >
    <template v-slot:item="{ item, props }">
      <v-list-item v-bind="props" :disabled="isDisabled(item.raw)">
        <template v-slot:append v-if="isDisabled(item.raw)">
          <span style="color: red">已拥有组</span>
        </template>
      </v-list-item>
    </template>
    <template v-slot:selection="data">
      <v-chip
        :key="data.item"
        :model-value="data.selected"
        size="small"
        color="primary"
        @click:close="select.splice(data.index, 1)"
        closable
      >
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>

<script setup>
import objectUtils from "@/scripts/utils/objectUtils";
import node_manager from "@/scripts/apis/node_manager";
import {onMounted, ref, watch} from "vue";

/**
 * 原始选择数据
 */
const sourceSelect = ref()

const nodeListData = ref([])

const props = defineProps({
  value: {},
  label: {
    type: String,
  },
})

const emit = defineEmits(['update'])

const select = defineModel('select')
const getNodeBaseList = (search = "", page_index = 1, page_size = 20) => {
  node_manager.get_base_node_list(
    search,
    page_index,
    page_size
  ).then((res) => {
    nodeListData.value = res.data.data.PageContent
  })
}

const selectEmit = v => {
  emit('update', objectUtils.object_select_value_to_list(v.map(({uuid}) => ({uuid})), 'uuid'))
}

const isDisabled = (raw) => {
  if (!sourceSelect.value) return !!raw.group
  if (sourceSelect.value.includes(raw.uuid)) {
    return false
  } else {
    return !!raw.group
  }
}

onMounted(() => {
  getNodeBaseList()
  console.log(select.value)
  if (select.value) {
    sourceSelect.value = select.value.map(item => item.uuid)
    console.log(sourceSelect.value)
  }
})
/**
 * 监听外部传参
 */
watch(() => props.value, (val) => {
  if (val && val !== select.value) {
    select.value = val
    console.log(select.value)
  }
})
/**
 * 监听选择
 */
watch(() => select.value, () => {
  console.log(select.value)
})
</script>

<style scoped>
</style>
