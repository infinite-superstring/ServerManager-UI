<script>
export default {
  name: "selectAuthRestrictionsMethod",
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  emits: ['update']
}
</script>

<template>
  <v-select
    label="登录限制方法"
    :model-value="value"
    :items="[{key: '限制IP地址段', value: 1},{key: '限制IP地址', value: 2}]"
    item-title="key"
    item-value="value"
    @update:model-value="value => $emit('update', value)"
  />
</template>

<style scoped>

</style>
