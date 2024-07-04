<template>
  <div class="form-item">
    <v-text-field
      label="时间"
      hint="指定一个日期时间"
      variant="underlined"
      persistent-hint
      required
      type="datetime-local"
    />
  </div>
</template>

<script setup>

</script>


<style scoped>
.form-item {
  width: 100%;
  min-width: 200px;
  padding: 10px;
}
</style>
