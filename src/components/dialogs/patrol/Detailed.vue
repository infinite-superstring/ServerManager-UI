<template>
  <VDialog
    :model-value="status"
    min-width="500px"
    max-width="800px"
    width="85vw"
    @update:modelValue="val => {if(!val) close()}"
  >
    <v-card>
      <v-card-title>内容详细</v-card-title>
      <v-card-text>
        <div>
          <strong>
            标题:
          </strong>
          <span>{{ data.title }}</span>
        </div>
        <v-divider/>
        <div>
          <strong>
            内容:
          </strong>
          <div class="content">
            {{ data.content }}
          </div>
        </div>
        <div v-if="data.images && data.images.length > 0">
          <v-divider/>
          <strong>图片:</strong>
          <viewer class="images" :images="data.images">
            <!--            <img v-for="src in images" :key="src" :src="src">-->
            <img class="my-2 image" v-for="image in data.images" :key="image" :src="`/api/patrol/image/${image}`"/>
          </viewer>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="close()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </VDialog>
</template>

<script setup>
import {defineProps, defineEmits} from 'vue';
import {getImageApi} from "@/scripts/apis/patrol";

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
    default: false
  },
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      content: '',
      img64: ''  // 改成 img64
    }),
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style scoped>
.content {
  text-indent: 2em;
}

.images {
  display: flex;
  flex-direction: column;
}

.image {
  max-width: 100%;
}
</style>
