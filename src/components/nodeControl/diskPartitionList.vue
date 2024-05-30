<script>
import format from "@/scripts/utils/format";
import calculate from "@/scripts/utils/calculate";

export default {
  name: "diskPartitionList",
  computed: {
    calculate() {
      return calculate
    },
    format() {
      return format
    }
  },
  props: {
    partition_list: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      usages: {}
    }
  },
  unmounted() {
    this.usages = {}
  },
  methods: {
    usage_color(usage) {
      if (usage < 30) return 'green'
      else if (usage > 30 && usage < 70) return "secondary"
      else if (usage > 70) return 'red'
    }
  },
  watch: {
    partition_list(val) {
      for (let i = 0; i < this.partition_list.length; i++) {
        const partition = this.partition_list[i]
        this.usages[partition.device] = calculate.calculate_percentage(partition.used, partition.total, 1)
      }
    }
  }
}
</script>

<template>
  <v-list v-if="partition_list">
    <v-list-item
      v-for="partition in partition_list"
      :key="partition"
    >
      <v-progress-linear
        v-model="usages[partition.device]"
        :color="usage_color(usages[partition.device])"
        height="25"
      >
        <template v-slot:default="{ value }">
          <strong>{{ calculate.calculate_percentage(partition.used, partition.total, 1) }}%</strong>
        </template>
      </v-progress-linear>
      <br>
      {{ partition.device === partition.mount_point ? `挂载点：${partition.mount_point}` : `设备：${partition.device} 挂载点：${partition.mount_point}` }} 文件系统：{{ partition.fs_type }} 总量：{{ format.formatBytes(partition.total) }} 可用：{{ format.formatBytes(partition.used) }}
    </v-list-item>
  </v-list>
</template>

<style scoped>
.v-list {
  overflow: hidden;
  max-height: 300px;
}
.v-list:hover {
  overflow-y: auto;
}

.v-list-item {
  padding: 4px 0 !important;
}
</style>
