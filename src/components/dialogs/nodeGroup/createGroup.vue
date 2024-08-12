<script>
import SelectUser from "@/components/input/selectUser.vue";
import SelectNode from "@/components/input/selectNode.vue";
import node_group_use_rules from "@/components/input/nodeGroupsUseRules.vue";
import message from "@/scripts/utils/message";
import node_group from "@/scripts/apis/node_group";

export default {
  name: "createGroup",
  components: {node_group_use_rules, SelectNode, SelectUser},
  props: {
    flag: {
      type: Boolean
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
  },
  methods: {
    submit() {
      if (!this.group_name) {
        message.showError(this,"集群名不能为空")
        return
      }
      console.log(this.group_leader)
      if (!this.group_leader) {
        message.showError(this, "未选择集群负责人")
        return
      }
      if (this.group_nodes.length <= 0) {
        message.showError(this, "未选择节点")
        return
      }
      if (this.time_slot_recipient.length >= 0) {
        for (let i = 0; i < this.time_slot_recipient.length; i++) {
          const item = this.time_slot_recipient[i]
          if (item.users.length <= 0) {
            message.showError(this, `规则${i+1}使用者为空`)
            return
          }
          for (let j = 0; j < item.users.length; j++) {
            if (item.users[j] === this.group_leader) {
              message.showError(this, `规则${i+1}使用者与集群负责人重复`)
              return
            }
          }
          if (item.week.length <= 0) {
            message.showError(this, `规则${i+1}星期未选择`)
            return
          }
          if (!item.start_time) {
            message.showError(this, `规则${i+1}开始时间不能为空`)
            return
          }
          if (!item.end_time) {
            message.showError(this, `规则${i+1}结束时间不能为空`)
            return
          }
        }
      }
      node_group.create_group(
        this.group_name,
        this.group_desc,
        this.group_leader,
        this.group_nodes,
        this.time_slot_recipient,
      ).then(res => {
        message.showSuccess(this, res.data.msg)
        this.$emit("success")
        this.close()
      })
      this.$emit("success")
    },
    close(close=true) {
      this.group_name = ""
      this.group_desc = ""
      this.group_leader = null
      this.group_nodes = []
      this.time_slot_recipient = []
      if(close) this.$emit("close")
    },
  }
}
</script>

<template>
  <v-dialog
    activator="parent"
    min-width="600px"
    width="auto"
    persistent
    :model-value="flag"
  >
    <v-card>
      <v-card-title>创建新的集群</v-card-title>
      <v-card-text>
        <v-text-field type="text" label="集群名" v-model="group_name" max="20"></v-text-field>
        <v-text-field type="text" label="集群备注" v-model="group_desc" max="100"></v-text-field>
        <select-user label="集群负责人" :value="group_leader" @update:select_user="value => group_leader=value"></select-user>
        <select-node label="请选择节点，点击Tag取消选择" @update="value=>group_nodes=value"></select-node>
        <div>
          <div class="text-caption">
            权限规则
          </div>
          <node_group_use_rules :rules="time_slot_recipient"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" color="green">确定</v-btn>
        <v-btn @click="close" color="red">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
