<template>
  <div class="form-item week-box">
    <v-select
      multiple
      v-model="cycle.week"
      :items="week"
      item-title="label"
      item-value="value"
      label="星期"
      hint="星期几"
      variant="underlined"
      persistent-hint
      required
    >
      <template #selection="{item}">
        <v-chip
          label
          small
          color="primary"
          outlined
          v-ripple
        >
          {{ item.title }}
        </v-chip>
      </template>
    </v-select>
  </div>
  <div class="form-item">
    <v-text-field
      :rules="[v => !!v || '不能为空']"
      v-model="cycle.time"
      label="时间"
      hint="在那天的哪个时间"
      variant="underlined"
      persistent-hint
      required
      type="time"
    />
  </div>
</template>

<script setup>

const week = [
  {label: '星期一', value: 1},
  {label: '星期二', value: 2},
  {label: '星期三', value: 3},
  {label: '星期四', value: 4},
  {label: '星期五', value: 5},
  {label: '星期六', value: 6},
  {label: '星期日', value: 7}
]
const cycle = defineModel({default: {week: [], time: ''}})
</script>


<style scoped>
.form-item {
  width: 50%;
  min-width: 200px;
  padding: 10px;
}

.week-box {
  display: flex;
  flex-wrap: wrap;
}

@media screen and (max-width: 720px) {
  .form-item {
    width: 100%;
  }
}
</style>
