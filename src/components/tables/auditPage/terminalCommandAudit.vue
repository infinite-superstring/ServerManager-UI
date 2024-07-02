<script>
import axios from "@/scripts/utils/axios";

export default {
  name: "TerminalCommandAudit",
  data() {
    return {
      open: null,
      active: {},
      data: [],
      model: null
    }
  },
  methods: {
    load_node_list() {
      axios.get("/api/admin/auditAndLogger/terminalRecord/loadNodeList").then(res => {
        this.data = res.data.data
        console.log(this.data)
      }).catch(err => {
        console.log(err)
      })
    },
    async load_terminal_record(item) {
      console.log(item)
      const node_type = item?.node_type
      switch (node_type) {
        case "node_select": {
          return axios.get('/api/admin/auditAndLogger/terminalRecord/loadUserList', {
            params: {
              node_uuid: item.id
            }
          }).then((res) => {
            console.log(res.data)
            item.children.push(...res.data.data)
          }).catch(err => {
            console.log(err)
          })
        }
        case "user_select": {
          return axios.get('/api/admin/auditAndLogger/terminalRecord/loadSessionList', {
            params: {
              node_uuid: item.node_uuid,
              user_id: item.id
            }
          }).then((res) => {
            console.log(res.data)
            item.children.push(...res.data.data)
          }).catch(err => {
            console.error(err)
          })
        }
      }
      return new Promise(resolve => {
        resolve(true)
      })
    },
    download_session() {

    }
  },
  created() {
    this.load_node_list()
  },
  watch: {
    active(newVal) {
      console.log(newVal)
      console.log(this.model)
    }
  }
}
</script>

<template>
  <v-row
    class="pa-4"
    justify="space-between"
  >
    <v-col cols="4">
      <v-treeview
        v-model:activated="active"
        v-model:opened="open"
        :items="data"
        :load-children="load_terminal_record"
        open-strategy="single"
        active-strategy="leaf"
        color="warning"
        density="compact"
        item-title="name"
        item-value="id"
        activatable
        slim
        return-object
      >
        <template v-slot:prepend="{ item }">
          <v-icon v-if="item?.node_type === 'node_select'">
            mdi-server
          </v-icon>
          <v-icon v-if="item?.node_type === 'user_select'">
            mdi-account
          </v-icon>
          <v-icon v-if="item?.node_type === 'select_session'">
            mdi-console
          </v-icon>
        </template>
      </v-treeview>
    </v-col>
    <v-divider vertical></v-divider>
    <v-col
      class="d-flex text-center justify-center"
    >
      <div
        v-if="active.length < 1"
        class="text-h6 text-grey-lighten-1 font-weight-light"
        style="align-self: center;"
      >
        请选择要查看的会话
      </div>
      <div
        v-if="active.length > 0"
        class="d-flex flex-column align-center justify-center">
        <v-icon size="100" color="primary">
          mdi-download
        </v-icon>
        <v-btn @click="download_session">下载会话文件</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
