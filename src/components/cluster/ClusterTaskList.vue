<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        任务名称
      </th>
      <th class="text-left">
        执行组
      </th>
      <th class="text-left">
        运行次数
      </th>
      <th class="text-left">
        任务类型
      </th>

      <th class="text-left">
        运行时间
      </th>
      <th class="text-left">
        启用
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in list"
      :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.node_group_name }}</td>
      <td>{{ item.exec_count === null ? '无限' : item.exec_count }}</td>
      <td>
        <span v-if="item.exec_type === 'interval'">
          间隔
        </span>
        <span v-if="item.exec_type === 'date-time'">
          指定时间
        </span>
        <span v-if="item.exec_type === 'cycle'">
          周期
        </span>
      </td>
      <td v-if="item.exec_type === 'interval'">{{ format.secondToStr(item.interval) }}</td>
      <td v-if="item.exec_type === 'date-time'">{{ item.that_time }}</td>
      <td v-if="item.exec_type === 'cycle'">
        在
        <v-tooltip location="top">
          <v-chip
            class="week-chip"
            color="green"
            v-for="t in getWeekText(item.cycle.week)">
            {{ t }}
          </v-chip>
          <template #activator="{props}">
            <VIcon v-bind="props">mdi-information</VIcon>
          </template>
        </v-tooltip>
        的
        {{ item.cycle.time }}
      </td>
      <td>
        <v-checkbox
          :model-value="item.enable"
          @click="changeEnable(item)"
          hide-details
        />
      </td>
      <td>
        <v-btn variant="text">详细</v-btn>
        <v-btn variant="text" color="red" @click="this.$emit('onDelete',item.uuid)">删除</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import format from "../../scripts/utils/format";

const emit = defineEmits(['changeEnable', 'onDelete'])
const props = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})
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

/**
 * 改变任务启用状态
 */
const changeEnable = ({uuid}) => {
  emit('changeEnable', uuid)
}
</script>


<style scoped>
.week-chip {
  margin: 2px;
}
</style>
