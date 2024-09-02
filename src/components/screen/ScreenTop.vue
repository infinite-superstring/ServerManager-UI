<template>
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.total_count")'
    :content="topData.node_count"
  />
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.online_count")'
    :content="topData.on_line_count"
  />
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.offline_count")'
    :content="isNaN((topData.node_count - topData.on_line_count)) ? 0 : (topData.node_count - topData.on_line_count)"
  />
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.warning_count")'
    :content="Array.isArray(topData.alarm_count) ? topData.alarm_count.length : 0"
  />
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.running_tasks_count")'
    :content="topData.tasking_count"
  />
  <SmallCard
    class="small-card"
    :title='$t("screen.base_info.user_count")'
    :content="topData.user_count ? topData.user_count : 0"
  />
</template>

<script setup>

import SmallCard from "@/components/screen/container/SmallCard.vue";

const props = defineProps({
  topData: {
    type: Object,
    required: true,
    default: {}
  }
})
</script>


<style scoped>
.small-card {
  flex: 1;
  margin: 5px;
}
</style>
