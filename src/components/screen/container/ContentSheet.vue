<template>
  <v-sheet rounded border class="box">
    <p v-if="title" class="title font-weight-black"><span>{{ title }}</span></p>
    <slot></slot>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  },
})
</script>


<style scoped>
.title {
  text-indent: 1em;
  font-weight: 400;
  line-height: 40px;
  font-size: 16px;
}

.box {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  width: 100%;
  height: 100%;
}

</style>
