<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn icon="mdi:mdi-arrow-left" variant="text" title="返回主页" :to="{name: 'dashboard'}"></v-btn>
        </v-col>
        <v-col class="title text-h6">
          {{ $default_title }}
          运维监控
        </v-col>
        <v-col class="date">
          {{ date ? date : '等待响应' }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

import {ref} from "vue";

const props = defineProps({
  date: {
    type: String,
    required: true
  }
})
</script>


<style scoped>
.title, .date {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.date {
  justify-content: end;
  font-weight: initial;
}
</style>
