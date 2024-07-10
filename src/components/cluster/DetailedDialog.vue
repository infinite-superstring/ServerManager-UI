<template>
  <v-row>
    <v-col sm="12" cols="4">
      <v-dialog
        :model-value="status"
        width="500"
        @update:modelValue="emit('close')">
        <v-card>
          <v-card-title>
            <v-icon>mdi-information</v-icon>
            <span class="ml-2">集群任务详情</span>
          </v-card-title>
          <v-card-text>
            <div class="container">
              <div class="item">
                <b>任务名称:</b><span>{{ task.name }}</span>
              </div>
              <div class="item">
                <b>唯一ID:</b><span>{{ task.uuid }}</span>
              </div>
              <div class="item">
                <b>执行方式:</b><span>{{ getTypeName(task.type) }}</span>
              </div>
              <div class="item">
                <b>执行路径|环境:</b><span>{{ task.exec_path }}</span>
              </div>
              <div class="item">
                <b>运行时间:</b>
                <span v-if="task.type === 'interval'">
                  {{ format.secondToStr(task.time) }}
                </span>
                <span v-if="task.type === 'cycle'">
                  {{ task.time }}
                </span>
                <span v-if="task.type === 'date-time'">
                  {{ format.formatTimestampToStr(task.time * 1000) }}
                </span>
              </div>
              <div class="item" v-if="task.type === 'cycle'">
                <b>运行周期:</b>
                <span>
                  <v-chip
                    class="week-chip"
                    color="green"
                    v-for="t in getWeekText(task.week)">
                    {{ t }}
                 </v-chip>
                </span>
              </div>
              <div class="item">
                <b>指定运行次数:</b><span>{{ task.exec_count ? task.exec_count : '无限' }}</span>
              </div>
              <div class="item">
                <ClusterCommand :disabled="true" :model-value="task.shell"/>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="emit('close')">完成</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import {ref} from "vue";
import format from "../../scripts/utils/format";
import ClusterCommand from "@/components/cluster/form/ClusterCommand.vue";

const emit = defineEmits(['close'])

const props = defineProps({
  status: {
    type: Boolean,
    default: false
  }
})

const task = ref()
defineExpose({
  task
})

const getTypeName = type => {
  switch (type) {
    case 'date-time':
      return '定时任务'
    case 'cycle':
      return '周期任务'
    case 'interval':
      return '间隔任务'
    default:
      return '未知任务'
  }
}

/**
 * 获取周文本
 * @param week
 */
const getWeekText = (week) => {
  let text = []
  for (let w of week) {
    if (w === 1) {
      text.push('星期一')
    } else if (w === 2) {
      text.push('星期二')
    } else if (w === 3) {
      text.push('星期三')
    } else if (w === 4) {
      text.push('星期四')
    } else if (w === 5) {
      text.push('星期五')
    } else if (w === 6) {
      text.push('星期六')
    } else if (w === 7) {
      text.push('星期日')
    }
  }
  return text
}

</script>


<style scoped>


.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
}

.item b {
  flex-shrink: 0;
}
</style>
