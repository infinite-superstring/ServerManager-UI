<template>
  <v-table
    v-if="data.length >0"
    style="width: 100%;"
    class="pageMain-card"
    density="compact">
    <thead>
    <tr>
      <th>节点</th>
      <th>总量</th>
      <th>已使用</th>
      <th>还剩余</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in props.data" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ format.formatBytes(item.data.total) }}</td>
      <td>{{ Math.ceil((item.data.used * 100)) + '%' }}</td>
      <td>{{ Math.ceil((item.data.free * 100)) + '%' }}</td>
    </tr>
    </tbody>
  </v-table>
  <NotData v-else/>
</template>

<script setup>
import NotData from "@/components/emptyState/notData.vue";
import format from "../../../scripts/utils/format";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: []
  }
})
</script>


<style scoped>

</style>
