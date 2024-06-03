<script>

import TimeInput from "@/components/input/timeInput.vue";
import Time_range_selection from "@/components/input/timeRangeSelection.vue";
import SelectUser from "@/components/input/selectUser.vue";
import SelectNode from "@/components/input/selectNode.vue";

export default {
  name: "createGroup",
  components: {SelectNode, SelectUser, Time_range_selection, TimeInput},
  props: {
    flag: {
      type: Boolean,
      default: true
    }
  },
  emits: ['close', 'success'],
  data: () => {
    return {
      group_name: "",
      group_desc: "",
      group_leader: null,
      group_nodes: [],
      time_slot_recipient: [],
      other_data: {
        user_list: {
          search: "",
          currentPage: 1,
          maxPage: null,
          data: []
        },
        node_list: {
          search: "",
          currentPage: 1,
          maxPage: null,
          data: []
        }
      }
    }
  }
}
</script>

<template>
  <v-dialog
    activator="parent"
    min-width="600px"
    width="auto"
    persistent
    :modelValue="flag"
  >
    <v-card>
      <v-card-title>创建新的节点组</v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            节点组名
          </div>
          <v-text-field type="text" v-model="nodeName"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            组负责人
          </div>
          <select-user value=1 />
        </div>
        <div>
          <div class="text-caption">
            选择节点
          </div>
          <select-node></select-node>
        </div>
        <div>
          <div class="text-caption">
            时间范围
          </div>
          <time_range_selection/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn>确定</v-btn>
        <v-btn>取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
