<template>
  <div class="toolsBar">
    <v-btn
      id="addPatrol"
      base-color="success">
      新增记录
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="搜索"
      variant="solo-filled"
      single-line
      hide-details>
    </v-text-field>
  </div>
  <PatrolList/>
</template>

<script setup>

import PatrolList from "@/components/tables/patrol/PatrolList.vue";
</script>

<style scoped>

</style>
