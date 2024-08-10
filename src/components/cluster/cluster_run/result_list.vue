<template>
  <v-card
    title="结果列表"
    min-height="600px"
  >
    <v-table>
      <thead>
      <tr>
        <th class="text-left">
          命令摘要
        </th>
        <th class="text-left">
          发起者
        </th>
        <th class="text-left">
          集群
        </th>
        <th class="text-left">
          执行时间
        </th>
        <th class="text-left">
          操作
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="item in data"
        :key="item.name"
      >
        <td>{{ item.shell }}</td>
        <td>{{ item.user }}</td>
        <td>{{ item.group }}</td>
        <td>{{ item.timestamp }}</td>
        <td>
          <v-btn
            variant="text"
            title="浏览命令结果"
            icon="mdi:mdi-eye"
            @click="$emit('selectResult', item.uuid)">
          </v-btn>
          <v-btn
            color="red"
            variant="text"
            title="删除记录"
            icon="mdi:mdi-delete"
            @click="$emit('delete',item.uuid)">
          </v-btn>
        </td>
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
    <!--    <v-list-->
    <!--      density="compact"-->
    <!--    >-->
    <!--      <v-list-item-->
    <!--        v-for="item in data"-->
    <!--        :key="item.result_id"-->
    <!--        :title="item.time"-->
    <!--        variant="plain"-->
    <!--      >-->
    <!--        {{ item.command }}-->
    <!--      </v-list-item>-->
    <!--    </v-list>-->
  </v-card>
</template>

<script setup>

const emit = defineEmits(['selectResult', 'delete'])
const currentPage = defineModel()
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  maxPage: {
    type: Number,
    default: 1
  }
})

</script>

<style scoped>

</style>
