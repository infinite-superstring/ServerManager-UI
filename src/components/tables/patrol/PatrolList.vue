<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
})
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        用户
      </th>
      <th class="text-left">
        时间
      </th>
      <th class="text-left">
        图片
      </th>
      <th class="text-left">
        内容
      </th>
      <th class="text-left">
        状态
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in list" :key="item.id">
      <td class="text-left">
        {{ item.user }}
      </td>
      <td class="text-left">
        {{ item.time }}
      </td>
      <td class="text-left">
        <v-img :src="item.image" width="100px" height="100px"/>
      </td>
      <td class="text-left">
        {{ item.content }}
      </td>
      <td class="text-left">
        {{ item.status }}
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
