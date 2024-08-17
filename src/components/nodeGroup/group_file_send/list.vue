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
  emits: ['action:del', 'action:pause', 'action:show_info'],
  data: () => {
    return {
      select: []
    }
  }
}
</script>

<template>
  <v-card title="分发任务列表" min-height="600px">
    <v-card-text>
      <v-table>
        <thead>
        <tr>
          <th class="text-left">
            集群
          </th>
          <th class="text-left">
            接收目录
          </th>
          <th class="text-left">
            分发进度
          </th>
          <th class="text-left">
            任务创建者
          </th>
          <th class="text-left">
            任务创建时间
          </th>
          <th class="text-left">
            操作
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="item in value"
          :key="item.uuid"
        >
          <td :title="`${item.group.name} (gid: ${item.group.id})`">{{ item.group.name }}</td>
          <td>{{ item.receive_directory ? item.receive_directory : '缺省' }}</td>
          <td>
            <strong>
              <span title="进行中">{{ item.progress.activity }}</span> /
              <span title="传输成功" class="text-green-accent-3">{{ item.progress.success }}</span> /
              <span title="传输失败" class="text-red-accent-3">{{ item.progress.failure + item.progress.offline }}</span>
            </strong>
          </td>
          <td>
            {{ item.creator.user_name }}
          </td>
          <td>
            {{ item.ctime }}
          </td>
          <td class="action">
            <v-btn variant="text" color="primary" @click="$emit('action:show_info', item.uuid)">详情</v-btn>
<!--            <v-btn variant="text" color="red" @click="$emit('action:del', item.uuid)">删除任务</v-btn>-->
<!--            <v-btn variant="text" color="red" @click="$emit('action:pause', item.uuid)">暂停分发</v-btn>-->
          </td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
