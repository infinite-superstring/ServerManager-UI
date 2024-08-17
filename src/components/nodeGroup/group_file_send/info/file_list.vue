<script>
export default {
  name: "node_group_send_file_task_info__file_list",
  props: {
    file_list: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        文件名
      </th>
      <th class="text-left">
        文件哈希
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in file_list"
      :key="item.hash"
    >
      <td>{{ item.file_name }}</td>
      <td>{{ item.hash }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
