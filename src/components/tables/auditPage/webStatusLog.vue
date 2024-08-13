<template>
  <v-row v-if="sites.length > 0">
    <v-col cols="2" style="border-right: black solid 1px">
      <v-tabs
        color="primary"
        direction="vertical"
        v-model="site">
        <v-tab
          prepend-icon="mdi-web"
          v-for="s in sites"
          :key="s[1]"
          :value="s[0]">
          <v-tooltip location="top">
            <span>
              {{ s[0] }}
            </span>
            <template #activator="{props}">
              <span v-bind="props">{{ s[0] }}</span>
            </template>
          </v-tooltip>
        </v-tab>
      </v-tabs>
    </v-col>
    <v-col cols="10">
      <ToolsSelectBar
        v-model="params"
        hide-add-button
        :options="options"
      />
      <v-tabs-window
        direction="vertical"
        v-model="site">
        <v-tabs-window-item
          v-for="s in sites"
          :key="s[0]"
          :value="s[0]">
          <WebStatusLogList v-model="params" :host="s[1]"/>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-col>
  </v-row>
  <not-data v-else/>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import WebStatusLogList from "@/components/tables/auditPage/list/WebStatusLogList.vue";
import NotData from "@/components/emptyState/notData.vue";
import {getSiteNameListApi} from "@/scripts/apis/audit/web_status";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";

const site = ref()
const sites = ref([])
const params = ref({})
const options = [
  {
    prop: 'date',
    label: '时间范围',
    type: 'date-range'
  }
]

onMounted(() => {
  getSiteNameListApi().then(r => {
    sites.value = r.data.data
    if (sites.value.length > 0) site.value = sites.value[0][0]
  })
})
</script>


<style scoped>

</style>

<style>
.v-btn {
  text-transform: lowercase !important;
}
</style>
