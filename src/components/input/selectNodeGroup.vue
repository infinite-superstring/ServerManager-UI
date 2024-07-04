<script>
import message from "@/scripts/utils/message";
import axios from "axios";
import objectUtils from "@/scripts/utils/objectUtils";

export default {
  name: "selectNodeGroup",
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
    searchNodeGroup(search = "", page_index = 1, page_size = 20) {
      axios.post('/api/node_manager/node_group/getGroupList', {
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
    @update:search="value => searchNodeGroup(value)"
    @update:model-value="select => $emit('update', select)"
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
  </v-autocomplete>
</template>

<style scoped>
</style>
