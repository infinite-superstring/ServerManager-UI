<template>
  <v-sheet rounded border class="box">
    <p class="title font-weight-black"><span>{{ title }}</span></p>
    <slot></slot>
  </v-sheet>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "标题",
    required: true
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
  margin: 10px 5px;
  padding: 10px;
}
</style>
