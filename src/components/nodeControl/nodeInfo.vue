<script>
import format from "@/scripts/utils/format";

export default {
  name: "nodeInfo",
  computed: {
    format() {
      return format
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
    <v-chip v-for="tag in node_base_info.node_tags" :key="tag" base-color="secondary" size="x-small">{{ tag }}</v-chip>
  </p>
  <div id="system_info" v-if="node_base_info.node_system_info">
    <v-divider/>
    <p>主机名：{{ node_base_info.node_system_info.hostname }}</p>
    <p>操作系统类型：{{ node_base_info.node_system_info.system_type }}</p>
    <p>操作系统版本：{{ node_base_info.node_system_info.system_version }}
      (Build:{{ node_base_info.node_system_info.system_build_version }})
    </p>
    <p>处理器架构：{{ node_base_info.node_system_info.cpu_architecture }}</p>
    <p>启动时间：{{ node_base_info.node_system_info.system_boot_time }}</p>
    <v-divider/>
    <p>核心数：{{ node_base_info.node_system_info.core_count }}</p>
    <p>线程数：{{ node_base_info.node_system_info.processor_count }}</p>
    <p>内存：{{ format.formatBytes(node_base_info.node_system_info.memory_total) }}</p>
    <p>交换空间：{{ format.formatBytes(node_base_info.node_system_info.swap_total) }}</p>
  </div>
</template>

<style scoped>

</style>
