<template>
  <v-table class="pageMain-card" density="compact">
    <thead>
    <tr>
      <th>节点</th>
      <th>IP</th>
      <th>接收(MB)</th>
      <th>发送(MB)</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in props.data" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.data.ip }}</td>
      <td>{{ byteToMegabyteConversion(item.data.recv) }}</td>
      <td>{{ byteToMegabyteConversion(item.data.send) }}</td>
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

const byteToMegabyteConversion = (byte) => {
  return (byte / 1024 / 1024).toFixed(2)
}
</script>


<style scoped>

</style>
