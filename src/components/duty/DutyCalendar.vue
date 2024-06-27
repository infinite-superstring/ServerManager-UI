<template>
  <v-card>
    <v-sheet>
      <div class="toolsBar searchHeader">
        <v-btn
          @click="reStatus = true"
          base-color="success">
          补签
        </v-btn>
        <select-user
          :multiple="true"
          :hide-details="true"
          :single-line="true"
          @update:select_user="r=>{userIds = r}"
        />
      </div>
    </v-sheet>
    <v-calendar
      text="今天"
      ref="calendar"
      v-model="currentDate"
      :view-mode="type"
      :events='props.events'
    >
      <template #event="{event}">
        <v-avatar
          v-if="idInList(event.userId)"
          :color="getAvatarColor(event.title)"
          size="small"
        >
          <v-tooltip
            activator="parent"
            location="end">
            <div>姓名:{{ event.title }}</div>
            <div>签到时间:{{ event.end.toLocaleString() }}</div>
          </v-tooltip>
          <span>{{ getAvatarUserName(event.title) }}</span>
        </v-avatar>
      </template>
    </v-calendar>
    <ReSignInDialog
      :user-id="userIds[0]"
      :status="reStatus"
      @submit="reSignIn"
      @close="reStatus = false"
    />

  </v-card>
</template>

<script setup>
import {VCalendar} from 'vuetify/labs/VCalendar'
import {computed, ref, watch} from "vue";
import SelectUser from "@/components/input/selectUser.vue";
import ReSignInDialog from "@/components/dialogs/duty/ReSignInDialog.vue";

// 补签对话框
const reStatus = ref(false)
// 父组件事件
const emit = defineEmits(['update']);
// 日历实例
const calendar = ref(null);
// 当前日期
const currentDate = ref([new Date()]);
const type = ref('month');
// 获取当前年
const currentYear = computed(() => {
  return new Date(currentDate.value[0]).getFullYear();
});
// 获取当前月
const currentMonth = computed(() => {
  return new Date(currentDate.value[0]).getMonth() + 1;
});
// 需要查询的用户
const userIds = ref([])

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  },
  yearAndMonth: {
    type: String,
    default: () => {
      return ''
    }
  },
  userList: {
    type: Array,
    default: () => []
  }
})

/**
 * 判断用户是否在列表中
 * @param id
 * @return {boolean}
 */
const idInList = (id) => {
  let isIn = false
  if (userIds.value.length === 0) return true
  userIds.value.forEach((user) => {
    if (user === id) {
      isIn = true
    }
  })
  return isIn
}

/**
 * 根据用户名 类型返回用户名
 * 中文返回前一个字符
 * 英文返回前两个字符
 * @param name
 */
const getAvatarUserName = (name) => {
  if (/^[\u4e00-\u9fa5]+$/.test(name)) {
    return name.substring(0, 1)
  } else {
    return name.substring(0, 2)
  }
}
/**
 * 根据用户名哈希返回颜色
 * @param name
 * @return {string}
 */
const getAvatarColor = (name) => {
  const colors = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const colorIndex = Math.abs(hash) % colors.length;
  return colors[colorIndex];
};

const reSignIn = () => {
  reStatus.value = false
  emit('update')
}


watch(() => currentYear.value, () => {
  emit('update')
})
watch(() => currentMonth.value, () => {
  console.log(calendar.value)
  emit('update')
})


// 暴露变量
defineExpose({
  currentMonth,
  currentYear,
  users: userIds,
})
</script>


<style scoped>
.searchHeader {
  display: flex;
  align-items: center;
}
</style>
