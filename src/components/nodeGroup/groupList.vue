<script>
export default {
  name: "node_group_list",
  props: {
    value: {
      type: Array,
      required: true
    }
  },
  emits: ['action:del', 'action:edit', 'action:show_info'],
  data: () => {
    return {
      select: []
    }
  }
}
</script>

<template>
  <v-table>
    <thead>
    <tr>
<!--      <th class="text-left">-->
<!--        -->
<!--      </th>-->
      <th class="text-left">
        id
      </th>
      <th class="text-left">
        组名
      </th>
      <th class="text-left">
        负责人
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in value"
      :key="item.id"
    >
<!--      <td>-->
<!--        <v-checkbox :value="item.id" v-model="select" density="compact" hide-details></v-checkbox>-->
<!--      </td>-->
      <td>{{ item.group_id }}</td>
      <td>{{ item.group_name }}</td>
      <td>{{ item.group_leader }}</td>
      <td class="action">
<!--        <v-btn variant="text" color="primary" @click="$emit('action:edit', item.group_id)">编辑</v-btn>-->
        <v-btn variant="text" color="primary" @click="$emit('action:show_info', item.group_id)">详细信息</v-btn>
        <v-btn variant="text" color="red" @click="$emit('action:del', item.group_id)">删除</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
