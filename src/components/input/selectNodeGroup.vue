<script>
import objectUtils from "@/scripts/utils/objectUtils";
import node_group from "@/scripts/apis/node_group";

export default {
  name: "selectNodeGroup",
  expose: ['reset', 'setSelect'],
  computed: {
    objectUtils() {
      return objectUtils
    }
  },
  props: {
    value: {},
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
    },
    modelValue: {
      type: String,
      default: ""
    }
  },
  emits: ['update', 'update:modelValue'],
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
    reset() {
      console.log('清空选择')
      this.select = []
    },
    open_group_manager_page() {
      let routeData = this.$router.resolve({
        name: "nodeGroupEdit"
      });
      window.open(routeData.href, '_blank');
    },
    selectUpdateValue() {
      console.log(this.select)
      this.$emit('update', this.select)
      this.$emit('update:modelValue', this.select)
    },
    setSelect(value) {
      this.select = value
    }
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
    @update:model-value="selectUpdateValue"
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
      <v-btn icon title="新增集群" variant="plain" @click="open_group_manager_page">
        <v-icon icon="mdi:mdi-plus"/>
      </v-btn>
    </template>
  </v-autocomplete>
</template>

<style scoped>
</style>
