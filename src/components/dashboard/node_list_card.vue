<script>
import axiosplus from "@/scripts/utils/axios";
import NotData from "@/components/emptyState/notData.vue";
import {getNodeListApi} from "@/scripts/apis/dashboard";

export default {
  name: "node_list_card",
  components: {NotData},
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
      getNodeListApi().then(r => {
          this.node_list = r.data.data
        })
    }
  }
}
</script>

<template>
  <v-table density="compact" v-if="node_list.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        {{ $t('dashboard.node_list.table.name') }}
      </th>
      <th class="text-left">
        {{ $t('dashboard.node_list.table.ip') }}
      </th>
      <th class="text-left" :title="$t('dashboard.node_list.table.status__title')">
        {{ $t('dashboard.node_list.table.status') }}
      </th>
      <th class="text-left">
        {{ $t('dashboard.node_list.table.warning') }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in node_list"
      :key="item.uuid"
    >
      <td class="title">
        <span
          style="cursor:pointer;"
          @click="$router.push({name:'nodeControl',hash:`#${item.uuid}`})"
        >
          {{ item.name }}
        </span>
      </td>
      <td>
        {{ item.auth_ip ? item.auth_ip : $t('dashboard.node_list.table.ip_is_empty') }}
      </td>
      <td :title="$t('dashboard.node_list.table.status__title')">
        <span
          v-if="item.online"
          style="color: green;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:online' }})"
        >
          <v-icon icon="mdi:mdi-check-circle-outline" size="x-small"/>
          {{ $t('dashboard.node_list.table.status__value.online') }}
        </span>
        <span
          v-else-if="item.online === null"
          style="color: red;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:uninitialized' }})"
        >
          <v-icon icon="mdi:mdi-close-circle-outline" size="x-small"/>
          {{ $t('dashboard.node_list.table.status__value.uninitialized') }}
        </span>
        <span
          v-else
          style="color: red;cursor:pointer;"
          @click="$router.push({name:'nodeList',query: { search: 'status:offline' }})"
        >
          <v-icon icon="mdi:mdi-close-circle-outline" size="x-small"/>
          {{ $t('dashboard.node_list.table.status__value.offline') }}
        </span>

      </td>
      <td>
        <span
          v-if="item.warning === 'Info'"
        >
          {{ $t('dashboard.node_list.table.warning__value.normal') }}
        </span>
        <span
          v-else-if="item.warning === false"
        >
          {{ $t('dashboard.node_list.table.warning__value.none') }}
        </span>
        <span v-else>
          {{ $t('dashboard.node_list.table.warning__value.warning') }}
        </span>
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>
.title {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
}
</style>
