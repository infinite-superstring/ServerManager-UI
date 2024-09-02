<template>
  <v-col class="column">
    <ContentSheet :title="$t('screen.chart.nodes_status.title')" class="fl1">
      <HostStatus
        v-if="Array.isArray(data.host_status) ? data.host_status.length > 0 : false"
        :data="data.host_status ? data.host_status : []"/>
    </ContentSheet>
  </v-col>

  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet :title="$t('screen.chart.cpu_usage.title')">
        <Cpu :data="data.cpu ? data.cpu : []"/>
      </ContentSheet>
      <ContentSheet :title="$t('screen.chart.alarm_trend.title')">
        <AlarmTrend
          :on-line-count="onLineCount"
          :data="data.alarm_trend ? data.alarm_trend : []"/>
      </ContentSheet>

    </ContentSheet>
  </v-col>
  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet :title="$t('screen.chart.memory_usage.title')">
        <Memory :data="data.memory ? data.memory : []"/>
      </ContentSheet>
      <ContentSheet :title="$t('screen.chart.network_throughput.title')">
        <NetWork :data="data.network ? data.network : []"/>
      </ContentSheet>
    </ContentSheet>
  </v-col>
  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet :title="$t('screen.chart.load_avg.title')">
        <AverageLoad :data="data.average_load ? data.average_load : []"/>
      </ContentSheet>
      <ContentSheet :title="$t('screen.chart.disk_usage.title')">
        <DiskStatus :data="data.disk ? data.disk : []"/>
      </ContentSheet>
    </ContentSheet>
  </v-col>
</template>

<script setup>

import ContentSheet from "@/components/screen/container/ContentSheet.vue";
import HostStatus from "@/components/screen/chart/HostStatus.vue";
import AverageLoad from "@/components/screen/chart/AverageLoad.vue";
import NetWork from "@/components/screen/chart/NetWork.vue";
import Memory from "@/components/screen/chart/Memory.vue";
import Cpu from "@/components/screen/chart/Cpu.vue";
import DiskStatus from "@/components/screen/chart/DiskStatus.vue";
import OverlayLoading from "@/components/public/loading/OverlayLoading.vue";
import AlarmTrend from "@/components/screen/chart/AlarmTrend.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => {
      return {
        host_status: [],
        average_load: [],
        network: [],
        memory: [],
        cpu: []
      }
    }
  },
  onLineCount: {
    type: Number,
    required: true,
    default: 0
  }
})
</script>


<style scoped>
.column {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fl1 {
  /*  flex: 1;*/
  height: 100%;
  width: 100%;
}
</style>
