<script>
import message from "@/scripts/utils/message";
import axios from "axios";
import objectUtils from "@/scripts/utils/objectUtils";

export default {
  name: "selectNode",
  computed: {
    objectUtils() {
      return objectUtils
    }
  },
  props: {
    value: {

    },
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
      axios.post('/api/node_manager/getBaseNodeList', {
        page: page_index,
        page_size: page_size,
        search: search
      }).then((res) => {
        if (res.data.status === 1) {
          this.nodeListData = res.data.data.PageContent
        } else {
          console.warn(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(err.message)
      })
    }
  },
  mounted() {
    this.getNodeBaseList()
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
    @update:model-value="select => $emit('update', objectUtils.object_select_value_to_list(select.map(({uuid})=>({uuid})), 'uuid'))"
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
