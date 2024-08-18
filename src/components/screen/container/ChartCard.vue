<template>
  <v-card class="pageMain-card">
    <v-card-text>
      暂无数据
    </v-card-text>
  </v-card>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
  },
})
</script>


<style scoped>
.unknown-name {
  margin: 5px;
}
</style>
