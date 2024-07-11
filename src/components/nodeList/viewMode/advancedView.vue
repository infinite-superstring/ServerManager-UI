<script>

export default {
  name: "advancedView",
  props: {
    nodeList: {
      type: Array,
      required: true
    }
  },
  emits: ['action:del_node', 'action:reset_token', 'action:edit'],
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
      <th class="text-left">

      </th>
      <th class="text-left">
        节点名
      </th>
      <th class="text-left">
        节点组
      </th>
      <th class="text-left">
        主机名
      </th>
      <th class="text-left">
        操作系统类型
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in nodeList"
      :key="item.uuid"
    >
      <td>
        <v-checkbox :value="item.uuid" v-model="select" density="compact" hide-details></v-checkbox>
      </td>
      <td
        @click='this.$router.push({name:"nodeControl", hash: `#${item.uuid}`})'
        :title="item.name"
        class="cursor-pointer text-light-blue-darken-2 font-weight-medium text-decoration-underline table-name">
        {{ item.name }}
      </td>
      <td>{{ item.group ? item.group : "无" }}</td>
      <td>{{ item.baseData ? item.baseData.hostname : "未知" }}</td>
      <td>{{ item.baseData ? item.baseData.platform : "未知" }}</td>
      <td class="action-btn">
        <v-btn
          variant="text"
          size="small"
          color="primary"
          @click="$emit('action:edit', item.uuid)"
          :disabled="!$user.check_user_permission('editNode')"
        >编辑节点</v-btn>
        <v-btn
          variant="text"
          size="small"
          color="warning"
          @click="$emit('action:reset_token', item.uuid)"
          :disabled="!$user.check_user_permission('editNode')"
        >
          重置Token
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          color="red"
          @click="$emit('action:del_node', item.uuid)"
          :disabled="!$user.check_user_permission('editNode')"
        >
          删除节点
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>
.table-name {
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
