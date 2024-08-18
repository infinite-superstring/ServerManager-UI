<template>
  <v-table class="pageMain-card" density="compact">
    <thead>
    <tr>
      <th>节点</th>
      <th>总量(GB)</th>
      <th>已使用(GB)</th>
      <th>还剩余(GB)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in props.data" :key="item.name">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
</script>


<style scoped>

</style>
