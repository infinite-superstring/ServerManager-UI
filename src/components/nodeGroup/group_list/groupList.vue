<script>
import NotData from "@/components/emptyState/notData.vue";

export default {
  name: "node_group_list",
  components: {NotData},
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
  <v-table v-if="value.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        id
      </th>
      <th class="text-left">
        集群名
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
      <td>{{ item.group_id }}</td>
      <td>{{ item.group_name }}</td>
      <td>{{ item.group_leader }}</td>
      <td class="action">
        <v-btn variant="text" color="primary" @click="$emit('action:edit', item.group_id)">编辑集群</v-btn>
        <v-btn variant="text" color="info" @click="$emit('action:show_info', item.group_id)">详细信息</v-btn>
        <v-btn variant="text" color="red" @click="$emit('action:del', item.group_id)">删除</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>

</style>
