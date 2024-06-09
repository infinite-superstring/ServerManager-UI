<script>
export default {
  name: "node_list_card",
  data() {
    return {
      node_list: []
    }
  },
  mounted() {
  },
  methods: {
    get_node_list() {

    }
  }
}
</script>

<template>
  <v-table density="compact">
    <thead>
    <tr>
      <th class="text-left">
        节点名
      </th>
      <th class="text-left">
        认证IP
      </th>
      <th class="text-left">
        在线状态
      </th>
      <th class="text-left">
        告警状态
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in node_list"
      :key="item.uuid"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.auth_ip }}</td>
      <td>{{ item.online }}</td>
      <td>{{ item.warning }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
