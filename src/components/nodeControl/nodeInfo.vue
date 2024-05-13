<script>
export default {
  name: "nodeInfo",
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
  <p>节点操作系统类型：{{ node_base_info.node_system_type }}</p>
  <p>节点操作系统版本：{{ node_base_info.node_system_version }}
    (Build:{{ node_base_info.node_system_build_version }})
  </p>
  <p>启动时间：{{ node_base_info.node_system_boot_time }}</p>
  <v-divider/>
  <p>节点内存：{{ node_base_info.node_memory_total }}</p>
  <p>节点交换空间：{{ node_base_info.node_swap_total }}</p>
</template>

<style scoped>

</style>
