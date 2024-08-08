<script>
import node_group from "@/scripts/apis/node_group";
import SelectNode from "@/components/input/selectNode.vue";
import node_group_use_rules from "@/components/input/nodeGroupsUseRules.vue";
import SelectUser from "@/components/input/selectUser.vue";

export default {
  name: "editGroup",
  components: {SelectUser, node_group_use_rules, SelectNode},
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
      console.log("name：", this.group_name)
      console.log("leader：", this.group_leader)
      console.log("nodes：", this.node_list)
      console.log("rules：", this.rules)
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.getGroupInfo()
      }
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
          label="请选择节点"
          :value="node_list"
          @update="value=>node_list=value"
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
