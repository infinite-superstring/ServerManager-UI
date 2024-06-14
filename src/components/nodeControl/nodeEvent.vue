<script>
export default {
  name: "nodeEvent",
  data() {
    return {
      currentPage: 1,
      maxPage: 5
    }
  }
}
</script>

<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        EventID
      </th>
      <th class="text-left">
        发生时间
      </th>
      <th class="text-left">
        类型
      </th>
      <th class="text-left">
        等级
      </th>
      <th class="text-left">
        描述
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
    >
      <td>1</td>
      <td>2024-6-5 02:51:30</td>
      <td>CPU Warning</td>
      <td>Error</td>
      <td>xxxxxxxxxx</td>
    </tr>
    </tbody>
  </v-table>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<style scoped>

</style>
