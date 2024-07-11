<script>
import axiosplus from "@/scripts/utils/axios";

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
      axiosplus.get('/api/node_manager/node_group/getGroupById?group_id=' + this.id)
        .then(res => {
          this.group_id = res.data.data.group_id
          this.group_name = res.data.data.group_name
          this.group_leader = res.data.data.group_leader
          this.group_desc = res.data.data.group_desc
          this.node_list = res.data.data.node_list
          this.rules = res.data.data.rules
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
        集群负责人: {{ group_leader }}<br>
        节点列表:
        <div>
          <v-chip color="primary" size="small" v-for="node in node_list" :key="node.uuid">
            {{ node.name }}
          </v-chip>
        </div>
        <br>
        集群介绍: {{ group_desc }}<br>
        <v-divider/>
        消息接收规则:
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
          接收人:
          <div>
            <v-chip
              color="primary"
              size="small"
              v-for="user in item.recipients"
              :key="user">
              {{ user }}
            </v-chip>
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
</style>
