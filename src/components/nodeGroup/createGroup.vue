<script>

import TimeInput from "@/components/timeInput.vue";
import Time_range_selection from "@/components/timeRangeSelection.vue";
import SelectUser from "@/components/selectUser.vue";

export default {
  name: "createGroup",
  components: {SelectUser, Time_range_selection, TimeInput},
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
            时间范围
          </div>
          <time_range_selection/>
        </div>
<!--        <v-card>-->
<!--          <v-row-->
<!--            align="center"-->
<!--            justify="space-around"-->
<!--          >-->
<!--            <v-col style="width: 350px; flex: 0 1 auto;">-->
<!--              <v-time-picker-->
<!--                v-model="start"-->
<!--                :max="end"-->
<!--                title="开始时间"-->
<!--              ></v-time-picker>-->
<!--            </v-col>-->
<!--            <v-col style="width: 350px; flex: 0 1 auto;">-->
<!--              <v-time-picker-->
<!--                v-model="end"-->
<!--                :min="start"-->
<!--                title="结束时间"-->
<!--              ></v-time-picker>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-card>-->
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
