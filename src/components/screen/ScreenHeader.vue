<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-btn icon="mdi:mdi-arrow-left" variant="text" :title="$t('screen.back_btn')" :to="{name: 'dashboard'}"></v-btn>
        </v-col>
        <v-col class="title text-h6">
          {{ $t('screen.title', {title: $default_title}) }}
        </v-col>
        <v-col class="date">
          {{ date ? date : $t('screen.not_update_time') }}
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
