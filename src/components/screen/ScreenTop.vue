<template>
  <SmallCard
    class="small-card"
    title="节点总数量"
    :content="topData.node_count"
  />
  <SmallCard
    class="small-card"
    title="节点在线数量"
    :content="topData.on_line_count"
  />
  <SmallCard
    class="small-card"
    title="节点离线数量"
    :content="isNaN((topData.node_count - topData.on_line_count)) ? 0 : (topData.node_count - topData.on_line_count)"
  />
  <SmallCard
    class="small-card"
    title="告警中"
    :content="Array.isArray(topData.alarm_count) ? topData.alarm_count.length : 0"
  />
  <SmallCard
    class="small-card"
    title="执行任务中"
    :content="topData.tasking_count"
  />
  <SmallCard
    class="small-card"
    title="平台用户数量"
    :content="topData.user_count ? topData.user_count : 0"
  />
</template>

<script setup>

import SmallCard from "@/components/screen/container/SmallCard.vue";

const props = defineProps({
  topData: {
    type: Object,
    required: true,
    default:{}
  }
})
</script>


<style scoped>
.small-card {
  flex: 1;
  margin: 5px;
}
</style>
