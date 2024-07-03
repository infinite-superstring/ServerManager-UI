<template>
  <div class="form-item">
    <v-text-field
      type="number"
      max="23"
      v-model="hour"
      label="时"
      hint="小时"
      variant="underlined"
      persistent-hint
      required
      @input="timeToSecond"
    />
  </div>
  <div class="form-item">
    <v-text-field
      type="number"
      max="59"
      v-model="minute"
      label="分"
      hint="分"
      variant="underlined"
      persistent-hint
      required
      @input="timeToSecond"
    />
  </div>
  <div class="form-item">
    <v-text-field
      type="number"
      max="59"
      v-model="second"
      label="秒"
      hint="秒"
      variant="underlined"
      persistent-hint
      required
      @input="timeToSecond"
    />
  </div>
</template>

<script setup>
import {ref} from "vue";

const emit = defineEmits(['input'])
const totalSecond = defineModel()
const hour = ref('00')
const minute = ref('00')
const second = ref('00')

/**
 * 将输入的时间转换为秒
 * 确保小时、分钟、秒的值在合理范围内
 */
const timeToSecond = () => {
  // 清理输入，去除前导零并确保转换为数字
  const h = parseInt(hour.value.replace(/^0+/, ''), 10) || 0;
  const m = parseInt(minute.value.replace(/^0+/, ''), 10) || 0;
  const s = parseInt(second.value.replace(/^0+/, ''), 10) || 0;

  // 验证时间单位是否在合理范围内
  const validHour = Math.max(0, Math.min(h, 100));
  const validMinute = Math.max(0, Math.min(m, 100));
  const validSecond = Math.max(0, Math.min(s, 100));

  hour.value = validHour.toString().padStart(2, '0');
  minute.value = validMinute.toString().padStart(2, '0');
  second.value = validSecond.toString().padStart(2, '0');
  // 转换为总秒数
  totalSecond.value = validHour * 3600 + validMinute * 60 + validSecond;
};
</script>


<style scoped>
.form-item {
  width: 33%;
  min-width: 130px;
  padding: 10px;
}

@media screen and (max-width: 720px) {
  .form-item {
    width: 100%;
  }
}
</style>
