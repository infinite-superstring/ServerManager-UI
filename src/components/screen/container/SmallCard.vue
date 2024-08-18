<template>
  <v-card>
    <v-card-text class="align-center">{{ title }}</v-card-text>
    <v-card-title class="align-center">{{ content }}</v-card-title>
    <v-card-item class="align-center">{{ footer }}</v-card-item>
  </v-card>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  footer: {
    type: String,
  }
})
</script>


<style scoped>
.align-center {
  text-align: center;
}
</style>
