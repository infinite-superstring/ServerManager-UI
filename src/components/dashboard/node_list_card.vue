<script>
import axiosplus from "@/scripts/utils/axios";

export default {
  name: "node_list_card",
  data() {
    return {
      node_list: []
    }
  },
  mounted() {
    this.get_node_list()
  },
  methods: {
    get_node_list() {
      axiosplus.get('/api/dashboard/getNodeList')
        .then(r => {
          this.node_list = r.data.data
        })
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
      <td>
        <span
          style="cursor:pointer;"
          @click="$router.push({name:'nodeControl',hash:`#${item.uuid}`})"
        >
          {{ item.name }}
        </span>
      </td>
      <td>
        {{ item.auth_ip }}
      </td>
      <td>
        <span
          v-if="item.online"
          style="color: green;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:online' }})"
        >
          <v-icon icon="mdi:mdi-check-circle-outline" size="x-small"/>
          在线
        </span>
        <span
          v-if="item.online === null"
          style="color: red;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:uninitialized' }})"
        >
          <v-icon icon="mdi:mdi-close-circle-outline" size="x-small"/>
          未初始化
        </span>
        <span
          v-else
          style="color: red;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:offline' }})"
        >
          <v-icon icon="mdi:mdi-close-circle-outline" size="x-small"/>
          离线
        </span>

      </td>
      <td>
        <span
          v-if="item.warning === 'Info'"
        >
          正常
        </span>
        <span
          v-if="item.warning === false"
        >
          无
        </span>
        <span v-else>
          警告中
        </span>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
