<script>
import NotData from "@/components/emptyState/notData.vue";
import access_log from "@/scripts/apis/audit/access_log";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";

export default {
  name: "accessLog_table",
  components: {ToolsSelectBar, NotData},
  data: () => {
    return {
      currentPage: 1,
      maxPage: null,
      table: [],
      params: {},
      options: [
        {
          prop: 'date',
          label: '时间范围',
          type: 'date-range',
        }
      ]
    }
  },
  methods: {
    // 获取用户列表
    getTable(page = 1, pageSize = 20) {
      access_log.load_access_log(
        page,
        pageSize,
        this.params
      ).then(res => {
        const data = res.data.data
        const PageContent = data.PageContent
        this.table = []
        this.maxPage = data.maxPage
        this.currentPage = data.currentPage
        this.table = PageContent
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
   <ToolsSelectBar
    v-model="params"
    hide-add-button
    :options="options"
    @search:input="getTable()"
    @option:click="getTable()"
  />
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
        ip
      </th>
      <th class="text-left">
        模块
      </th>
      <th class="text-left">
        内容
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in this.getTableData()"
      :key="item.id"
    >
      <td>{{ item.user }}</td>
      <td>{{ item.time }}</td>
      <td>{{ item.ip }}</td>
      <td>{{ item.module }}</td>
      <td>{{ item.content ? item.content : '无' }}</td>
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

</style>
