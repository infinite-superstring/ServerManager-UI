<script>
import axios from "axios";

export default {
  name: "systemLog_table",
  data: () => {
    return {
      currentPage: 1,
      maxPage: null,
      table: [],
    }
  },
  methods: {
    // 显示APi错误
    showApiErrorMsg(message, status = null) {
      this.$notify.create({
        text: `API错误：${message} ${status ? '(status:' + status + ')' : ''}`,
        level: 'error',
        location: 'bottom right',
        notifyOptions: {
          "close-delay": 3000
        }
      })
    },
    // 获取用户列表
    getTable(page = 1, pageSize = 20) {
      axios.post("/api/admin/auditAndLogger/systemLog", {
        page: page,
        pageSize: pageSize,
      }).then(res => {
        const apiStatus = res.data.status
        if (apiStatus === 1) {
          const data = res.data.data
          const PageContent = data.PageContent
          this.table = []
          this.maxPage = data.maxPage
          this.currentPage = data.currentPage
          for (const item of PageContent) {
            this.table.push({
              id: item.id,
              time: item.time,
              level: item.level,
              module: item.module,
              content: item.content,
            })
          }
        } else {
          this.showApiErrorMsg(res.data.msg, apiStatus)
        }
      }).catch(err => {
        console.error(err)
        this.showApiErrorMsg(err.message)
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
  <v-table density="compact">
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
       <span v-if="item.level === 0" class="text-blue-darken-1"><v-icon
         icon="mdi-information-outline"/>信息</span>
        <span v-if="item.level === 1" class="text-amber-darken-1"><v-icon
          icon="mdi-alert-outline"/>警告</span>
        <span v-if="item.level === 3" class="text-red-darken-2"><v-icon icon="mdi-alert-circle-outline"/>错误</span>
      </td>
      <td>{{ item.module }}</td>
      <td>{{ item.content }}</td>
    </tr>
    </tbody>
  </v-table>
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
