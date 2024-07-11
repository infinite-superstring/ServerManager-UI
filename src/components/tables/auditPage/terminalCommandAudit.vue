<script>
import axios from "@/scripts/utils/axios";
import NotData from "@/components/emptyState/notData.vue";

export default {
  name: "TerminalCommandAudit",
  components: {NotData},
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
              node_uuid: item.id.node_uuid,
              user_id: item.id.user_id
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
      const active = this.active[0]
      const node_uuid = active?.node_uuid
      const session_uuid = active?.session_uuid
      let params = {node_uuid: node_uuid, session_uuid: session_uuid}
      params = new URLSearchParams(params).toString()
      const url = `/api/admin/auditAndLogger/terminalRecord/downloadSessionRecord?${params}`
      const newWindow = window.open(url, '_blank');
      newWindow.focus();
    }
  },
  created() {
    this.load_node_list()
  },
  watch: {
    active(newVal) {
      console.log(newVal)
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
        v-if="data.length > 0"
        v-model:activated="active"
        v-model:opened="open"
        :items="data"
        :load-children="load_terminal_record"
        density="compact"
        item-title="name"
        item-value="id"
        activatable
        open-on-click
        transition
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
      <not-data v-else/>
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
        v-if="active.length > 0 && active[0]?.node_uuid && active[0]?.session_uuid"
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
