<template>
  <div class="main">
    <v-table class="table" fixed-header>
      <thead>
      <tr>
        <th class="table-header">标题</th>
        <th class="table-header">时间</th>
      </tr>
      </thead>
      <tbody>
      <tr class="msg-row" v-for="(item ,index) in props.list" :key="item.title" @click="eva => { onClick(item.id,index) }"
          :class="{ 'active': activeId === item.id }">
        <td>
            <span class="title">
              <v-badge v-if="!item.read" color="error" dot>
                <v-icon :icon="item.read ? 'mdi-email-open' : 'mdi-email'"></v-icon>
              </v-badge>
              <v-icon v-else :icon="item.read ? 'mdi-email-open' : 'mdi-email'"></v-icon>
              {{ item.title }}
            </span>
        </td>
        <td>
          <span class="date">
            {{ item.createTime }}
          </span>
        </td>
      </tr>
      </tbody>
    </v-table>
    <div class="footer">
      <v-pagination
        active-color="#1867C0FF"
        v-model="pageData.currentPage"
        v-if="pageData.maxPage>1"
        :length="pageData.maxPage"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';

const activeId = ref()
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  }
})

const pageData = ref({
  currentPage: props.currentPage,
  maxPage: props.total,
})

const emit = defineEmits(['select', 'pageChange'])
/**
 * 向父组件发送点击事件
 * @param {Number}id
 */
const onClick = (id,index) => {
  props.list[index].read = true
  emit('select', id)
  activeId.value = (id === activeId.value ? null : id)
}

watch(() => pageData.value.currentPage, (val) => {
  emit('pageChange', val)
})
watch(() => props.total, (n) => {
  pageData.value.maxPage = n
})
watch(() => props.currentPage, (n) => {
  pageData.value.currentPage = n
})

</script>


<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table {
  height: 97%;
}

.footer {
  height: 3%;
}

.table-header {
  text-align: center;
}

.table-header:first-child {
  max-width: 30%;
}

.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100px;
}

.date {
  font-size: 0.8em;
}

.msg-row {
  transition: background-color 0.3s, transform 0.3s;
}

.msg-row:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  /*transform: translateY(-2px);*/
}


.msg-row.active {
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  background-color: rgb(24, 103, 192, 0.3);
  /*color: white;*/
  /*background: rgba(0, 0, 0, 0.05);*/
  /*transform: scale(0.9);*/
}
</style>
