<script>
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
  watch: {
    flag(val) {
      if (val) {
        this.m_flag = val
      } else {

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
      <v-card-title>节点组详细消息</v-card-title>
      <v-card-text>
        节点组ID: {{ group_id }}<br>
        节点组名: {{ group_name }}<br>
        节点组负责人: {{ group_leader }}<br>
        节点列表:
        <v-chip-group>
          <v-chip v-for="node in node_list" :key="node.uuid">{{ node.name }}</v-chip>
        </v-chip-group>
        <br>
        节点组介绍: {{ group_desc }}<br>
        <v-divider/>
        消息接收规则:
        <v-card class="pa-3" v-for="item in group_leader" :key="item.id">
          星期: {{ item.week }}
          <p>开始时间: {{ item.start_time }} —— 结束时间: {{ item.end_time }} </p>
          接收人:
          <v-chip-group>
            <v-chip v-for="user in item.users" :key="user.id">{{ user.userName }}</v-chip>
          </v-chip-group>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
