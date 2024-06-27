<template>
  <v-card>
    <DutyCalendar
      :events="events"
      :user-list="userList"
      ref="dutyCalendarRef"
      @update="getDuty"
    />
  </v-card>
</template>

<script setup>

import DutyCalendar from "@/components/duty/DutyCalendar.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";

const dutyCalendarRef = ref(null)
const exist = ref([])
const events = ref([])
const rawEvents = ref([])
const userList = ref([])

/**
 * 获取值班信息
 */
const getDuty = (state) => {
  let yearAndMonth = dutyCalendarRef.value.currentYear + '-' + dutyCalendarRef.value.currentMonth
  // if (dutyCalendarRef.value.users.length === 0) {
  if (!state) {
    if (exist.value.includes(yearAndMonth)) {
      return
    }
  }
  // }
  axiosplus.get('/api/task/getDuty?year_and_month=' +
    yearAndMonth).then((res) => {
    let result = res.data.data.map((item) => {
      return {
        userId: item.userId,
        title: item.title,
        start: new Date(item.start),
        end: new Date(item.end),
        pic: item.pic
      }
    })

    result.forEach((item) => {
      rawEvents.value.push(item)
    })
    // if (dutyCalendarRef.value.users.length === 0) {
    //   result.forEach((item) => {
    //     rawEvents.value.push(item)
    //   })
    // } else {
    //   rawEvents.value = result
    //   events.value = rawEvents.value
    // }
    exist.value.push(yearAndMonth)
    events.value = rawEvents.value
  })
}
/**
 * 获取用户信息
 */
const getUserList = () => {
  let param = {page: 1, pageSize: 5, search: ''}
  axiosplus.post('/api/admin/userManager/getUserList?', param).then((res) => {
    userList.value = res.data.data.PageContent
  })
}


onMounted(() => {
  getDuty()
  getUserList()
})

</script>


<style scoped>

</style>
