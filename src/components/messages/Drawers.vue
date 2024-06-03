<template>
  <v-navigation-drawer width="350" v-model="drawer" location="right">
    <v-row class="options">
      <v-col class="col">
        <v-btn-group class="btn-group">
          <v-btn @click="getAll()">全部</v-btn>
          <v-btn @click="getRead()">已读</v-btn>
          <v-btn @click="getUnread()">未读</v-btn>
          <v-tooltip text="已读所有消息">
            <template v-slot:activator="{ props }">
              <v-btn @click="readAll()" v-bind="props">
                全部已读
              </v-btn>
            </template>
          </v-tooltip>
          <v-tooltip text="删除所有已读">
            <template v-slot:activator="{ props }">
              <v-btn @click="confirmDialog('确认删除所有已读消息？', '删除后无法找回！', deleteAll)"
                     icon="mdi-trash-can" v-bind="props"/>
            </template>
          </v-tooltip>
        </v-btn-group>
      </v-col>
    </v-row>
    <v-row class="content">
      <MTable
        ref="MTableRef"
        :list="data.list"
        :total="data.maxPage"
        :current-page="currentPage"
        class="table"
        @pageChange="handlePageChange"
        @select="onSelect"/>
    </v-row>
  </v-navigation-drawer>

</template>

<script setup>
import {ref, onMounted} from "vue";
import MTable from "@/components/messages/MTable.vue";
import axios from "@/scripts/utils/axios.js";
import message from "@/scripts/utils/message";
import bus from "vue3-eventbus";
import confirmDialog from '@/scripts/confirmDialog'

/**
 * 注册事件
 */
const emit = defineEmits(['select'])
const drawer = ref(true)
const confirmDialogDisplay = ref(false)
// 获取消息列表方式
const method = ref('all')
const currentPage = ref(1)
const MTableRef = ref()

/**
 * 表格数据
 */
const data = ref({
  list: [],
  maxPage: 1
})
/**
 * 获取表格数据列表
 */
const getList = () => {
  axios.get('/api/message/list',
    {
      params: {
        method: method.value,
        currentPage: currentPage.value,
        pageSize: 20,
      }
    })
    .then(r => {
      data.value = r.data.data
      data.value.list.sort((a, b) => {
        if (a.read !== b.read) {
          return a.read ? 1 : -1;
        } else {
          return new Date(b.createTime) - new Date(a.createTime);
        }
      })

    })
}

/**
 * 获取全部消息
 */
const getAll = () => {
  currentPage.value = 1
  method.value = 'all'
  getList()
}

/**
 * 获取已读消息
 */
const getRead = () => {
  method.value = 'read'
  getList()
}

/**
 * 获取未读消息
 */
const getUnread = () => {
  method.value = 'unread'
  getList()
}

/**
 * 删除所有已读消息
 */
const deleteAll = () => {
  axios.delete('/api/message/deleteAll')
    .then((r) => {
      message.showSuccess(this, r.data.msg)
      confirmDialogDisplay.value = false
      getList()
    })
}


const readAll = () => {
  axios.put('/api/message/readAll')
    .then((r) => {
      message.showSuccess(this, r.data.msg)
      getList()
    })
}

/**
 * 选中消息
 * @param {Number}id
 */
const onSelect = (id) => {
  emit('select', id)
  getList() /*刷新列表*/
}
/**
 * 分页
 * @param current
 */
const handlePageChange = (current) => {
  currentPage.value = current
  getList()
}

onMounted(() => {
  getList()
  bus.on('to:Message', () => {
    drawer.value = !drawer.value
  })
  bus.on('update:Message', () => {
    getList()
  })
})


</script>

<style scoped>

.options {
  height: 10%;
}

.col {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
}

.content {
  height: 90%;
}

.table {
  width: 100%;
}
</style>
