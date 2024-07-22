<script>
import NotData from "@/components/emptyState/notData.vue";
import file_change_log from "@/scripts/apis/audit/file_change_log";

export default {
  name: "fileChangeLog_table",
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
      file_change_log.load_file_change_log(
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
        目标
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in table"
      :key="item.id"
    >
      <td>{{ item.user }}</td>
      <td>{{ item.time }}</td>
      <td>{{ item.action }}</td>
      <td>{{ item.filepath }}</td>
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
