<script>
import axios from "axios";

export default {
  name: "overview_card",
  data() {
    return {
      node_count: 0,
      node_online_count: 0,
      node_offline_count: 0,
      node_warning_count: 0
    }
  },
  mounted() {
    this.get_overview()
  },
  methods: {
    get_overview() {
      axios.get('/api/dashboard/getOverview').then((response) => {
        const data = response.data;
        if (data.status === 1) {
          this.node_count = data.data.node_count
          this.node_online_count = data.data.node_online_count
          this.node_offline_count = data.data.node_offline_count
          this.node_warning_count = data.data.node_warning_count
        }
      })
    }
  }
}
</script>

<template>
  <div class="status">
    <p class="status_number" @click="$router.push({ name: 'nodeList' })">
      {{ node_count }}
    </p>
    <p class="status_name">
      节点总数
    </p>
  </div>
  <div class="status">
    <p class="status_number cursor-pointer text-green-darken-2" @click="$router.push({ name: 'nodeList', query: { search: 'status:online' } })">
      {{ node_online_count }}
    </p>
    <p class="status_name">
      在线中
    </p>
  </div>
  <div class="status">
    <p class="status_number cursor-pointer text-red-darken-2" @click="$router.push({ name: 'nodeList', query: { search: 'status:offline' } })">
      {{ node_offline_count }}
    </p>
    <p class="status_name">
      离线中
    </p>
  </div>
  <div class="status">
    <p class="status_number cursor-pointer text-yellow-darken-2" @click="$router.push({ name: 'nodeList', query: { search: 'status:warning' } })">
      {{ node_warning_count }}
    </p>
    <p class="status_name">
      告警中
    </p>
  </div>
</template>

<style scoped>
.status {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .status_number {
    font-size: 40px;
  }
}
</style>
