<script>
import objectUtils from "@/scripts/utils/objectUtils";
import node_group from "@/scripts/apis/node_group";

export default {
  name: "selectNodeGroup",
  computed: {
    objectUtils() {
      return objectUtils
    }
  },
  props: {
    label: {
      type: String,
      default: "选择集群"
    },
    add_group: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update'],
  data: () => {
    return {
      select: [],
      nodeListData: []
    }
  },
  methods: {
    searchNodeGroup(search = "") {
      node_group.get_node_group_list(search).then((res) => {
        this.nodeListData = res.data.data.PageContent
        console.log(this.nodeListData)
      })
    },
    open_group_manager_page() {
      let routeData = this.$router.resolve({
        name: "nodeGroupEdit"
      });
      window.open(routeData.href, '_blank');
    },
  },
  mounted() {
    this.searchNodeGroup()
  }
}
</script>

<template>
  <v-autocomplete
    v-model="select"
    :items="nodeListData"
    item-title="group_name"
    item-value="group_id"
    color="primary"
    :label="label"
    :hide-details="hideDetails"
    @update:search="value => searchNodeGroup(value)"
    @update:model-value="select => {$emit('update', select); console.log(select)}"
    auto-select-first
  >
    <template v-slot:selection="data">
      <v-chip
        :key="data.item"
        :model-value="data.selected"
        size="small"
        color="primary"
      >
        {{ data.item.title }}
      </v-chip>
    </template>
    <template v-slot:append v-if="add_group">
      <v-btn icon title="新增节点组" variant="plain" @click="open_group_manager_page">
        <v-icon icon="mdi:mdi-plus"/>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<style scoped>
</style>
