<script>
export default {
  name: "processList",
  props: {
    ws: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <v-table density="compact">
    <thead>
    <tr>
      <th class="text-left">
        PID
      </th>
      <th class="text-left">
        进程名称
      </th>
      <th class="text-left">
        状态
      </th>
      <th class="text-left">
        用户
      </th>
      <th class="text-left">
        CPU
      </th>
      <th class="text-left">
        内存
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in [1,2,3,4,5,6,7,8,9,10]"
      :key="item"
    >
      <td>0</td>
      <td>System</td>
      <td>running</td>
      <td>root</td>
      <td>10%</td>
      <td>10%</td>
      <td class="action-btn">
        <v-btn size="small" color="warning" variant="text">结束进程</v-btn>
        <v-btn size="small" color="red" variant="text">结束进程树</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<style scoped>

</style>
