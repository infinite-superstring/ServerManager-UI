<script>
export default {
  name: "group_task_list_card",
  data() {
    return {
      data: [
        {
          id: 1,
          name: "1111",
          type: "指定时间",
          run_time: "2024-07-09 00:00:00"
        },
        {
          id: 2,
          name: "2222",
          type: "指定时间",
          run_time: "2024-07-09 00:00:00"
        },
        {
          id: 3,
          name: "3333",
          type: "指定时间",
          run_time: "2024-07-09 00:00:00"
        }
      ]
    }
  }
}
</script>

<template>
  <v-table density="compact">
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
      <td>{{ item.type }}</td>
      <td>{{ item.run_time }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
