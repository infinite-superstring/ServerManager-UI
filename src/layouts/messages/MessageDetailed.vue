<template>
  <v-card class="content-card pageMain-card">
    <div v-html="content"></div>
  </v-card>
  <MessagesDrawers @select="onSelect"/>
</template>

<script setup>
import {ref} from 'vue';
import MessagesDrawers from '@/components/messages/Drawers.vue'
import axion from '@/scripts/utils/axios.js'
import message from '@/scripts/utils/message.js'

const content = ref('')


const onSelect = (id) => {
  axion.get('/api/message/getById?id=' + id)
    .then((r) => {
      content.value = r.data.data
    })
}

</script>

<style scoped>
.content-card {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
