<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
})
const emit = defineEmits(['delete', 'update', 'show'])
const del = (id) => {
  emit('delete', id)
}
const edit = (item) => {
  emit('update', item)
}
const show = (item) => {
  emit('show', item)
}
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-center">
        用户
      </th>
      <th class="text-center">
        时间
      </th>
      <th class="text-center">
        图片
      </th>
      <th class="text-center">
        内容
      </th>
      <th class="text-center">
        状态
      </th>
      <th class="text-center">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in list" :key="item.id">
      <td class="text-center">
        {{ item.user }}
      </td>
      <td class="text-center">
        {{ item.time }}
      </td>
      <td class="text-center">
        <v-img :src="item.image" height="100px"/>
      </td>
      <td class="text-center">
        <v-btn variant="text" size="small" @click="show(item)">查看</v-btn>
      </td>
      <td class="text-center">
        {{ item.status }}
      </td>
      <td class="text-center">
        <v-btn variant="text" size="small" @click="edit(item)">
          编辑
        </v-btn>
        <v-btn variant="text" size="small" base-color="error" @click="del(item.id)">
          删除
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
