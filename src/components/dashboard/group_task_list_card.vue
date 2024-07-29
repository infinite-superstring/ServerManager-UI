<script>
import axios from "@/scripts/utils/axios";
import format from "@/scripts/utils/format";
import NotData from "@/components/emptyState/notData.vue";
import {getListApi} from "@/scripts/apis/clusterTask";

export default {
  name: "group_task_list_card",
  components: {NotData},
  computed: {
    format() {
      return format
    }
  },
  data() {
    return {
      data: [
        // {
        //   id: 1,
        //   name: "1111",
        //   type: "指定时间",
        //   run_time: "2024-07-09 00:00:00"
        // },
        // {
        //   id: 2,
        //   name: "2222",
        //   type: "指定时间",
        //   run_time: "2024-07-09 00:00:00"
        // },
        // {
        //   id: 3,
        //   name: "3333",
        //   type: "指定时间",
        //   run_time: "2024-07-09 00:00:00"
        // }
      ]
    }
  },
  created() {
    getListApi().then(r => {
      console.log(r.data.data)
      this.data = r.data.data.list
    })
  },
  methods: {
    getWeekText(week) {
      let text = []
      for (let w of week) {
        switch (w) {
          case 1:
            text.push('星期一')
            break
          case 2:
            text.push('星期二')
            break
          case 3:
            text.push('星期三')
            break
          case 4:
            text.push('星期四')
            break
          case 5:
            text.push('星期五')
            break
          case 6:
            text.push('星期六')
            break
          case 7:
            text.push('星期日')
            break
        }
      }
      return text
    }
  }
}
</script>

<template>
  <v-table density="compact" v-if="data.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        名称
      </th>
      <th class="text-left">
        类型
      </th>
      <th class="text-left">
        运行时间
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in data"
      :key="item.id"
    >
      <td>{{ item.name }}</td>
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
            v-for="t in getWeekText(item.cycle.week)" :key="t">
            {{ t }}
          </v-chip>
          <template #activator="{props}">
            <VIcon v-bind="props">mdi-information-outline</VIcon>
          </template>
        </v-tooltip>
        的
        {{ item.cycle.time }}
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>

</style>
