<script>
import node_group from "@/scripts/apis/node_group";
import SelectNode from "@/components/input/selectNode.vue";
import node_group_use_rules from "@/components/input/nodeGroupsUseRules.vue";
import SelectUser from "@/components/input/selectUser.vue";
import message from "@/scripts/utils/message";
import objectUtils from "@/scripts/utils/objectUtils";
import UploadFiles from "@/components/input/uploadFiles.vue";

export default {
  name: "editGroup",
  components: {UploadFiles, SelectUser, node_group_use_rules, SelectNode},
  props: {
    flag: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      group_name: null,
      group_leader: null,
      group_desc: null,
      node_list: [],
      rules: []
    }
  },
  methods: {
    getGroupInfo() {
      node_group.get_group_info(this.id).then(response => {
        const data = response.data.data
        this.group_name = data.group_name
        this.group_leader = data.group_leader
        this.group_desc = data.group_desc
        this.node_list = data.node_list
        this.rules = data.rules
      })
    },
    close() {
      this.group_name = null
      this.group_leader = null
      this.group_desc = null
      this.node_list = []
      this.rules = []
      this.$emit('close')
    },
    submit() {
      if (!this.group_name) return message.showWarning(this, '集群名不能为空')
      if (!this.group_leader) return message.showWarning(this, '未选择集群负责人')
      if (this.node_list.length <= 0) return message.showWarning(this, '未选择节点')
      if (this.rules.length > 0) {
        for (let i = 0; i < this.rules.length; i++) {
          let item = this.rules[i]
          if (item.users.length <= 0) {
            message.showError(this, `规则${i + 1}用户未选择`)
            return
          }
          if (item.week.length <= 0) {
            message.showError(this, `规则${i + 1}星期未选择`)
            return
          }
          if (!item.start_time) {
            message.showError(this, `规则${i + 1}开始时间不能为空`)
            return
          }
          if (!item.end_time) {
            message.showError(this, `规则${i + 1}结束时间不能为空`)
            return
          }
        }
      }
      let rules = []
      for (let i = 0; i < this.rules.length; i++) {
        let users = []
        for (let j = 0; j < this.rules[i].users.length; j++) {
          users.push(objectUtils.isPlainObject(this.rules[i].users[j]) ? this.rules[i].users[j].id : this.rules[i].users[j])
        }
        let week = []
        for (let j = 0; j < this.rules[i].week.length; j++) {
          week.push(objectUtils.isPlainObject(this.rules[i].week[j]) ? this.rules[i].week[j].value : this.rules[i].week[j])
        }
        rules.push({
          users,
          week,
          start_time: this.rules[i].start_time,
          end_time: this.rules[i].end_time
        })
      }
      node_group.editGroup(
        this.id,
        this.group_name,
        this.group_desc,
        this.group_leader.id,
        this.node_list,
        rules,
      ).then((r) => {
        this.$emit('success')
        message.showSuccess(this, r.data.msg)
      })
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.getGroupInfo()
      }
    },
    node_list: (v) => {
      console.log(v)
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
    :model-value="flag"
  >
    <v-card>
      <v-card-title>编辑集群: {{ group_name }}</v-card-title>
      <v-card-text>
        <v-text-field type="text" label="集群名" v-model="group_name" max="20" disabled></v-text-field>
        <v-text-field type="text" label="集群备注" v-model="group_desc" max="100"></v-text-field>
        <!--        <select-user-->
        <!--          label="集群负责人"-->
        <!--          :value="group_leader"-->
        <!--          @update:select_user="value => console.log(value)"-->
        <!--        />-->
        <select-node
          v-if="node_list.length > 0"
          label="请选择节点"
          v-model:select="node_list"
        />
        <div>
          <div class="text-caption">
            权限规则
          </div>
          <node_group_use_rules :rules="rules"/>
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
