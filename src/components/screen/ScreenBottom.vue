<template>
  <v-col class="column">
    <ContentSheet title="主机状态" class="fl1">
      <HostStatus :data="data.host_status ? data.host_status : []"/>
    </ContentSheet>
  </v-col>
  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet title="平均负载(Top10)">
        <AverageLoad :data="data.average_load ? data.average_load : []"/>
      </ContentSheet>
      <ContentSheet title="网络流量(Top3)">
        <NetWork :data="data.network ? data.network : []"/>
      </ContentSheet>
    </ContentSheet>
  </v-col>
  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet title="内存使用率(Top10)">
        <Memory :data="data.memory ? data.memory : []"/>
      </ContentSheet>
      <ContentSheet title="CPU使用率(Top10)">
        <Cpu :data="data.cpu ? data.cpu : []"/>
      </ContentSheet>
    </ContentSheet>
  </v-col>
  <v-col class="column">
    <ContentSheet class="fl1">
      <ContentSheet title="告警趋势">
        <AverageLoad/>
      </ContentSheet>
      <ContentSheet title="磁盘状态(Top5)">
        <DiskStatus/>
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
  }
})
</script>


<style scoped>
.column {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fl1 {
  /*  flex: 1;*/
  height: 100%;
  width: 100%;
}
</style>
