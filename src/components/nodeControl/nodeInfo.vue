<script>
import bytesUtil from "@/scripts/utils/bytesUtil";

export default {
  name: "nodeInfo",
  computed: {
    bytesUtil() {
      return bytesUtil
    }
  },
  props: {
    node_base_info: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <p>节点名称：{{ node_base_info.node_name }}</p>
  <p>节点UUID：{{ node_base_info.node_uuid }}</p>
  <p v-if="node_base_info.node_description">节点备注：{{ node_base_info.node_description }}</p>
  <p v-if="node_base_info.node_tags.length !== 0">节点标签：
    <v-chip v-for="tag in node_base_info.node_tags" :key="tag" color="secondary" size="x-small">{{ tag }}</v-chip>
  </p>
  <v-divider/>
  <p>主机名：{{ node_base_info.node_hostname }}</p>
  <p>操作系统类型：{{ node_base_info.node_system_type }}</p>
  <p>操作系统版本：{{ node_base_info.node_system_version }}
    (Build:{{ node_base_info.node_system_build_version }})
  </p>
  <p>处理器架构：{{ node_base_info?.node_cpu_architecture }}</p>
  <p>启动时间：{{ node_base_info?.node_system_boot_time }}</p>
  <v-divider/>
  <p>核心数：{{ node_base_info.node_core_count }}</p>
  <p>线程数：{{ node_base_info.node_processor_count }}</p>
  <p>内存：{{ bytesUtil.formatBytes(node_base_info.node_memory_total) }}</p>
  <p>交换空间：{{ bytesUtil.formatBytes(node_base_info.node_swap_total) }}</p>
</template>

<style scoped>

</style>
