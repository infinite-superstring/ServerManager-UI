<template>
  <v-card class="main">
    <v-card-text>
      <v-row>
        <v-col class="item">{{ props.task.type === 0 ? '考勤' : '未知' }}</v-col>
        <v-col class="item">{{ props.task.description ? props.task.description : '未知' }}</v-col>
        <v-col class="item">
          <v-chip
            :color="getCipColor(props.task.status)"
          >
            {{ getStatus(props.task.status) }}
          </v-chip>
        </v-col>
        <v-col class="item">
          <v-btn
            size="small"
            @click="onClick"
            :disabled="props.task.status === 1 || props.task.status === 2"
            :color="getCipColor(props.task.status)"
          >
            {{ props.task.status === 0 ? '执行' : props.task.status === 1 ? '已完成' : '已超时' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>

const emit = defineEmits(['signIn','finish'])


const props = defineProps({
  task: {
    type: Object,
    default: () => {
      return {}
    }
  }
})


/**
 * 获取状态文本
 * @param status
 * @return {string}
 */
const getStatus = (status) => {
  switch (status) {
    case 0:
      return '未完成'
    case 1:
      return '已完成'
    case 2:
      return '已超时'
    default:
      return '未知'
  }
}

/**
 * 获取状态颜色
 * @param status
 * @return {string}
 */
const getCipColor = (status) => {
  switch (status) {
    case 0:
      return 'primary'
    case 1:
      return 'success'
    case 2:
      return 'error'
    default:
      return 'primary'
  }
}

const onClick = () => {
  emit('signIn', props.task.id)
  emit('finish', props.task.id)
}
</script>


<style scoped>
.item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
