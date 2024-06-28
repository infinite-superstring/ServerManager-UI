<template>
  <WebCard :list="list"/>
</template>

<script setup>

import WebCard from "@/components/web_status/WebCard.vue";
import {onMounted, ref} from "vue";
import axiosplus from "@/scripts/utils/axios";

const list = ref([])

const getList = () => {
  axiosplus.get('/api/webStatus/getList')
    .then(res => {
      if (res.data.status === 1) {
        list.value = res.data.data.list
        console.log(list.value)
      }
    })
}

onMounted(() => {
  getList()
})
defineExpose({
  getList
})
</script>


<style scoped>

</style>
