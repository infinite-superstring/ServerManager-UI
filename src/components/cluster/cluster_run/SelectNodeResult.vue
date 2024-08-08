<template>
<v-select
        v-model="resultUUID"
        :items="nodes"
        item-title="nodeName"
        item-value="resultUuid"
        label="节点"
      >
        <template v-slot:item="{props,item}">
          <v-list-item v-bind="props" :disabled="!item.raw.success">
            <template #append v-if="!item.raw.success">
              <span style="color: red">无结果</span>
            </template>
          </v-list-item>
        </template>
      </v-select>
</template>

<script setup>
const resultUUID = defineModel()
const props = defineProps({
  nodes: {
    type: Array,
    default: () => [],
    required: true
  }
})
</script>


<style scoped>

</style>
