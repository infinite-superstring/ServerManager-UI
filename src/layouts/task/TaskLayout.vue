<template>
  <v-table>
    <thead>
    <tr>
      <td class="text-left">类型</td>
      <td class="text-left">状态</td>
      <td class="text-left">描述</td>
      <td class="text-left">操作</td>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>
        考勤
      </td>
      <td>
        <span v-if="!task.status">未完成</span>
        <span v-else>已完成</span>
      </td>
      <td>
        <span>{{ task.description }}</span>
      </td>
      <td>
        <v-btn
          v-if="!task.status"
          color="primary"
          @click="toAttendance">
          签到
        </v-btn>
        <v-btn
          size="small"
          v-else>
          已签到
        </v-btn>

      </td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import {ref} from "vue";

const task = ref({
  status: 1,
  description: "签到"
})
</script>


<style scoped>

</style>
