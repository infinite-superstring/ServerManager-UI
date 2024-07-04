<template>
  <div class="form-item">
    <v-text-field
      v-model="dateTime"
      label="指定时间"
      hint="指定一个执行的日期时间"
      variant="underlined"
      persistent-hint
      required
      type="datetime-local"
    />
  </div>
</template>

<script setup>
const dateTime = defineModel()
</script>


<style scoped>
/*最高优先级*/
.form-item {
  width: 100% !important;
  min-width: 200px;
  padding: 10px;
}
</style>
