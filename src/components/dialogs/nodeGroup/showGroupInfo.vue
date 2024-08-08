<script>
import node_group from "@/scripts/apis/node_group";

export default {
  name: "showGroupInfo",
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
  emits: ['close'],
  data: () => {
    return {
      m_flag: false,
      group_id: null,
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
        this.group_id = data.group_id
        this.group_name = data.group_name
        this.group_leader = data.group_leader
        this.group_desc = data.group_desc
        this.node_list = data.node_list
        this.rules = data.rules
      })
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.m_flag = val
        this.getGroupInfo()
      }
    },
    m_flag(val) {
      if (!val) {
        this.$emit('close')
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
    v-model="m_flag"
  >
    <v-card>
      <v-card-title>集群详细消息</v-card-title>
      <v-card-text>
        集群ID: {{ group_id }}<br>
        集群名: {{ group_name }}<br>
        集群负责人: {{ group_leader?.userName }} (uid: {{group_leader?.id}})<br>
        节点列表:
        <div>
          <v-chip class="ma-1" color="primary" size="small" v-for="node in node_list" :key="node.uuid">
            {{ node.name }}
          </v-chip>
        </div>
        <br>
        <div v-if="group_desc">
          集群介绍: {{ group_desc }}<br>
        </div>
        <v-divider/>
        集群权限规则:
        <v-card
          class="pa-3 rules"
          v-for="item in rules"
          :key="item.id">
          星期:
          <span
            class="week"
            v-for="week in item.week"
            :key="week">
            {{ week }}
          </span>
          <p>开始时间: {{ item.start_time }} —— 结束时间: {{ item.end_time }} </p>
          <div>
            用户:
            <span
              class="user"
              v-for="user in item.users"
              :key="user"
              :title="user.userName"
            >
              <v-icon icon="mdi-account-circle-outline" size="small" color="primary"/> {{ user.userName }}
            </span>
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.rules {
  margin-top: 10px;
}

.week {
  padding: 5px;
  font-size: 0.9em;
}

.user {
  margin-right: 10px;
}
</style>
