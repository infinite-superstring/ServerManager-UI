<template>
  <v-card :subtitle="title" class="unknown-name">
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "图表",
    required: true
  },
})
</script>


<style scoped>
.unknown-name {
  margin: 5px;
}
</style>
