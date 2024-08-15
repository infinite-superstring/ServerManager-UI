<template>
  <v-card class="pageMain-card">
    <v-card-text class="main-content">
      <v-row>
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
        <SmallCard
          class="small-card"
          title="我是标题"
          content="我是内容"
          footer="我是脚注"
        />
      </v-row>
      <v-row>
        <v-col>
          <ContentSheet title="XXX" style="padding: 10px">
            <ContentSheet title="平均负载" class="chart">
              <CpuWatch/>
            </ContentSheet>
            <ContentSheet title="内存占用" class="chart">
              <CpuWatch/>
            </ContentSheet>
          </ContentSheet>
        </v-col>
        <v-col>
          <ContentSheet title="XXX">
            <ChartCard title="网络流量" class="chart">
              <CpuWatch/>
            </ChartCard>
            <ChartCard title="主机数量" class="chart">
              <CpuWatch/>
            </ChartCard>
          </ContentSheet>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

import CpuWatch from "@/components/charts/node/watch/cpuWatch.vue";
import ChartCard from "@/components/screen/card/ChartCard.vue";
import SmallCard from "@/components/screen/card/SmallCard.vue";
import ContentSheet from "@/components/screen/ContentSheet.vue";
</script>


<style scoped>

.main-content {
  height: 100%;
}

.v-row:nth-child(2) {
  height: 100%;
}


.small-card {
  flex: 1;
  margin: 5px;
}

.big-card {
  height: 100%;
}
</style>
