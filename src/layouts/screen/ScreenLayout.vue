<template>
  <v-card class="pageMain-card">
    <v-card-title>
      <ScreenHeader/>
    </v-card-title>
    <v-card-text style="height: 100%;">
      <ScreenContent/>
    </v-card-text>
  </v-card>
</template>

<script setup>

import ScreenHeader from "@/components/screen/ScreenHeader.vue";
import ScreenContent from "@/components/screen/ScreenContent.vue";
import {onMounted} from "vue";
import node_manager from "@/scripts/apis/node_manager";

const getNodeList = () => {
  let params = {
    page: 1,
    pageSize: 999
  }
  node_manager.getNodeListApi(params)
}

onMounted(getNodeList)
</script>


<style scoped>

</style>
