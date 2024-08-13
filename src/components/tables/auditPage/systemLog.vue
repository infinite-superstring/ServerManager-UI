<script>
import NotData from "@/components/emptyState/notData.vue";
import system_log from "@/scripts/apis/audit/system_log";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";

export default {
  name: "systemLog_table",
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
        },
        {
          prop: 'level',
          label: '日志等级',
          optional: [
            {
              label: '信息',
              value: 1
            },
            {
              label: '警告',
              value: 2
            },
            {
              label: '错误',
              value: 3
            }
          ],
          type: 'checkbox'
        }
      ]
    }
  },
  methods: {
    // 获取用户列表
    getTable(page = 1, pageSize = 20) {
      system_log.load_system_log(
        page,
        pageSize,
        this.params
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
        时间
      </th>
      <th class="text-left">
        等级
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
      <td>{{ item.time }}</td>
      <td>
        <span v-if="item.level === 1" class="text-blue-darken-1">
          <v-icon icon="mdi-information-outline"/>
          信息
        </span>
        <span v-if="item.level === 2" class="text-amber-darken-1">
          <v-icon icon="mdi-alert-outline"/>
          警告
        </span>
        <span v-if="item.level === 3" class="text-red-darken-2">
          <v-icon icon="mdi-alert-circle-outline"/>
          错误
        </span>
      </td>
      <td>{{ item.module }}</td>
      <td>{{ item.content }}</td>
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
