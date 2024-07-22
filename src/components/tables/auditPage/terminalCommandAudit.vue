<script>
import NotData from "@/components/emptyState/notData.vue";
import terminal_command_audit from "@/scripts/apis/audit/terminal_command_audit";

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
    async load_terminal_record(item) {
      const node_type = item?.node_type
      switch (node_type) {
        case "node_select": {
          return terminal_command_audit.load_node_terminal_user_list(
            item.id
          ).then((res) => {
            item.children.push(...res.data.data)
          })
        }
        case "user_select": {
          return terminal_command_audit.load_user_terminal_session_list(
            item.id.node_uuid,
            item.id.user_id
          ).then((res) => {
            console.log(res.data)
            item.children.push(...res.data.data)
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
      terminal_command_audit.open_download_session_window(node_uuid, session_uuid)
    }
  },
  created() {
    terminal_command_audit.load_node_list().then(res => {this.data = res})
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
