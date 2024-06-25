<template>
  <SignInTaskCard :task="task" @signIn="signIn"/>
  <TaskItemCard v-for="item in tasks" :task="item" :key="item.id"/>
</template>

<script setup>

import SignInTaskCard from "@/components/task/TaskItemCard.vue";
import TaskItemCard from "@/components/task/TaskItemCard.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";

const task = ref({
  type: 0,
  status: 0,
  description: "签到",
})

const tasks = ref([])


/**
 * 获取任务列表
 */
const getTasks = () => {
  axiosplus.get('/api/dashboard/getTasks', {
    params: {
      page: 1,
      pageSize: 5
    }
  }).then(res => {
    if (res.data.data.length === 0) {
      return
    }
    tasks.value = res.data.data
  })
}

const getCheckInStatus = () => {
  axiosplus.get('/api/task/getCheckInStatus')
    .then(res => {
      if (res.data.data) {
        task.value = res.data.data
      }
    })
}

const signIn = () => {
  axiosplus.post('/api/task/attendanceCheckIn')
    .then(res => {
      if (res.data.status === 1) {
        if (res.data.data === false) {
          message.showWarning(this, res.data.msg)
          return
        }
        task.value = res.data.data
        getCheckInStatus()
        message.showSuccess(this, res.data.msg)
      }
    })
}


onMounted(() => {
  getCheckInStatus()
  getTasks()
})
</script>


<style scoped>

</style>
