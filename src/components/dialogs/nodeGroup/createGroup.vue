<script>
import SelectUser from "@/components/input/selectUser.vue";
import SelectNode from "@/components/input/selectNode.vue";
import Message_recipient_rules from "@/components/input/messageRecipientRules.vue";
import message from "@/scripts/utils/message";
import axios from "axios";

export default {
  name: "createGroup",
  components: {Message_recipient_rules, SelectNode, SelectUser},
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
        message.showError(this,"节点组名不能为空")
        return
      }
      console.log(this.group_leader)
      if (!this.group_leader) {
        message.showError(this, "未选择节点负责人")
        return
      }
      if (this.group_nodes.length <= 0) {
        message.showError(this, "未选择节点")
        return
      }
      if (this.time_slot_recipient.length <= 0) {
        message.showError(this, "每个节点组至少有一条消息发送规则")
      } else {
        for (let i = 0; i < this.time_slot_recipient.length; i++) {
          const item = this.time_slot_recipient[i]
          if (item.users.length <= 0) {
            message.showError(this, `规则${i+1}消息接收人为空`)
            return
          }
          for (let j = 0; j < item.users.length; j++) {
            if (item.users[j] === this.group_leader) {
              message.showError(this, `规则${i+1}消息接收人与节点组负责人重复`)
              return
            }
          }
          if (item.week.length <= 0) {
            message.showError(this, `规则${i+1}星期未选择`)
            return
          }
          if (!item.start_time) {
            message.showError(this, `规则${i+1}开始时间为空`)
            return
          }
          if (!item.end_time) {
            message.showError(this, `规则${i+1}结束时间为空`)
            return
          }
        }
      }
      axios.post("/api/node_manager/node_group/createGroup", {
        group_name: this.group_name,
        group_desc: this.group_desc,
        group_leader: this.group_leader,
        group_nodes: this.group_nodes,
        rules: this.time_slot_recipient
      }).then(res => {
        if (res.data.status !== 1) {
          return message.showError(this, res.data.msg)
        }
        message.showSuccess(this, res.data.msg)
        this.$emit("success")
      }).catch(err=>{
        console.error(err)
        message.showApiErrorMsg(this, err.message)
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
      <v-card-title>创建新的节点组</v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            节点组名
          </div>
          <v-text-field type="text" v-model="group_name" max="20"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            节点组介绍
          </div>
          <v-text-field type="text" v-model="group_desc" max="100"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            组负责人
          </div>
          <select-user :value="group_leader" @update:select_user="value => group_leader=value"></select-user>
        </div>
        <div>
          <div class="text-caption">
            选择节点
          </div>
          <select-node @update="value=>group_nodes=value"></select-node>
        </div>
        <div>
          <div class="text-caption">
            消息发送规则
          </div>
          <message_recipient_rules :rules="time_slot_recipient"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="submit" color="green">提交</v-btn>
        <v-btn @click="close" color="red">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
