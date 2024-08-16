<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <span>当前节点:</span>
          <span
            @click="selectBoxShow = !selectBoxShow"
            title="点击切换"
            class="font-weight-black">
                {{ nodeName ? nodeName : '等待响应' }}
          </span>
        </v-col>
        <v-col class="title text-h6">
          {{ $default_title }}
          の
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

const selectBoxShow = ref(false)
const props = defineProps({
  nodeName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  nodeList: {
    type: Array,
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
