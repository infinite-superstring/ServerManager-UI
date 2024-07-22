<script>
import NotData from "@/components/emptyState/notData.vue";
import operation_log from "@/scripts/apis/audit/operation_log";

export default {
  name: "operationLog_table",
  components: {NotData},
  data: () => {
    return {
      currentPage: 1,
      maxPage: null,
      table: [],
    }
  },
  methods: {
    getTable(page = 1, pageSize = 20) {
      operation_log.load_operation_log(
        page,
        pageSize
      ).then(res => {
        const data = res.data.data
        this.table = []
        this.maxPage = data.maxPage
        this.currentPage = data.currentPage
        this.table = data.PageContent
      })
    },
    getTableData() {
      // 按照时间降序排序 并返回
      return this.table.sort((a, b) => {
        return new Date(b.time) - new Date(a.time);
      });
    }
  },
  created() {
    this.getTable()
  },
  watch: {
    currentPage(val) {
      this.getTable(val)
    },
  },
}
</script>

<template>
  <v-table density="compact" v-if="table.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        用户
      </th>
      <th class="text-left">
        时间
      </th>
      <th class="text-left">
        动作
      </th>
      <th class="text-left">
        模块
      </th>
      <th class="text-left">
        数据
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in getTableData()"
      :key="item.id"
    >
      <td>{{ item.user }}</td>
      <td>{{ item.time }}</td>
      <td>{{ item.action }}</td>
      <td>{{ item.module }}</td>
      <td class="data" :title="item.content">{{ item.content }}</td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<style scoped>
.data {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 200px;
}
</style>
