<script>
import NotData from "@/components/emptyState/notData.vue";

export default {
  name: "node_group_send_file_task_list",
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
        任务id
      </th>
      <th class="text-left">
        集群
      </th>
      <th class="text-left">
        接收目录
      </th>
      <th class="text-left">
        分发状态
      </th>
      <th class="text-left">
        分发进度
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in value"
      :key="item.task_id"
    >
      <td>{{ item.task_id }}</td>
      <td>{{ item.group }}</td>
      <td>{{ item.recv_path }}</td>
      <td>
        {{ item.recv_status }}
        <span>
          完成
        </span>
        <span>
          进行中
        </span>
        <span>
          暂停中
        </span>
      </td>
      <td>
        {{ item.recv_progress }}
      </td>
      <td class="action">
        <v-btn variant="text" color="primary" @click="$emit('action:show_info', item.group_id)">详情</v-btn>
        <v-btn variant="text" color="red" @click="$emit('action:del', item.group_id)">删除任务</v-btn>
        <v-btn variant="text" color="red" @click="$emit('action:del', item.group_id)">停止分发</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>

</style>
