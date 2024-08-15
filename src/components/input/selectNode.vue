<script>
import objectUtils from "@/scripts/utils/objectUtils";
import node_manager from "@/scripts/apis/node_manager";

export default {
  name: "selectNode",
  computed: {
    objectUtils() {
      return objectUtils
    }
  },
  props: {
    value: {},
    label: {
      type: String,
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
    getNodeBaseList(search = "", page_index = 1, page_size = 20) {
      node_manager.get_base_node_list(
        search,
        page_index,
        page_size
      ).then((res) => {
        this.nodeListData = res.data.data.PageContent
      })
    }
  },
  mounted() {
    this.getNodeBaseList()
    // if (this.value) this.select = this.value
  },
  watch: {
    value(val) {
      if (val && val !== this.select) {
        this.select = val
        console.log(this.select)
      }
    },
    select(val) {
      console.log(this.select)
    }
  }
}
</script>

<template>
  <v-autocomplete
    v-model="select"
    :items="nodeListData"
    item-title="name"
    item-value="uuid"
    color="primary"
    :label="label"
    @update:search="value => getNodeBaseList(value)"
    @update:model-value="select => {$emit('update', objectUtils.object_select_value_to_list(select.map(({uuid})=>({uuid})), 'uuid'))}"
    multiple
    return-object
    auto-select-first
  >
    <template v-slot:item="{ item, props }">
      <v-list-item v-bind="props" :disabled="item.raw.group">
        <template v-slot:append v-if="item.raw.group">
          <span style="color: red">已拥有组</span>
        </template>
      </v-list-item>
    </template>
    <template v-slot:selection="data">
      <v-chip
        :key="data.item"
        :model-value="data.selected"
        size="small"
        color="primary"
        @click:close="select.splice(data.index, 1)"
        closable
      >
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-autocomplete>
</template>

<style scoped>
</style>
