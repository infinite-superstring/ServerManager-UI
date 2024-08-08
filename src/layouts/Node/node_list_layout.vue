<script>
import ToolsBar from "@/components/nodeList/toolsBar.vue";
import nodeList from "@/components/nodeList/nodeList.vue";
import addNode from "@/components/dialogs/node/addNode.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import node_manager from "@/scripts/apis/node_manager";
import EditNode from "@/components/dialogs/node/editNode.vue";

export default {
  name: "node_list_layout",
  computed: {
    node_manager() {
      return node_manager
    }
  },
  components: {EditNode, ToolsBar, nodeList, addNode},
  emits: ['show_token'],
  data() {
    return {
      add_node: false,
      edit_node: {
        flag: false,
        uuid: null
      },
      token_alert: false,
      search: "",
      currentPage: 1,
      maxPage: null,
      nodeListData: [],
      displayMode: ""
    }
  },
  watch: {
    search(val) {
      this.getNodeList(val, 1)
    },
    currentPage(val) {
      this.getNodeList(this.search, val)
    }
  },
  mounted() {
    this.search = this.$route.query.search
    this.getNodeList(this.search, 1)
    this.displayMode = this.$web_config.viewMode.nodeList
  },
  methods: {
    getNodeList(search = "", page = 1) {
      axios.post('/api/node_manager/getNodeList', {
        page: page,
        search: search
      }).then((res) => {
        if (res.data.status === 1) {
          this.maxPage = res.data.data.maxPage
          this.currentPage = res.data.data.currentPage
          this.nodeListData = res.data.data.PageContent
          return true
        } else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.message)
      })
      return false
    },
    switch_display_mode(mode) {
      this.$web_config.viewMode.nodeList = mode
      this.displayMode = mode
    }
  }
}
</script>

<template>
  <tools-bar
    @action:addNode="add_node=true"
    @action:search="args => {search=args}"
    @action:switch_display_mode="args => {switch_display_mode(args)}"
    :search="search"
  />
  <node-list
    :nodeList="nodeListData"
    :display-mode="displayMode"
    @action:click_tag="args => search = `tag:${args}`"
    @action:click_status="args => search = `status:${args}`"
    @action:del_node="args => node_manager.del_node(this, args, res => getNodeList())"
    @action:reset_token="args => node_manager.reset_token(this, args, (token,serverToken) => $emit('show_token', 'reset_token', {token,serverToken}))"
    @action:edit="args => {edit_node.uuid = args; edit_node.flag = true}"
  />
  <div class="dialogs">
    <add-node
      :flag="add_node"
      @close="add_node = false"
      @success="args => {$emit('show_token', 'new_node', args); getNodeList(search, currentPage)}"
    />
    <edit-node
      :flag="edit_node.flag"
      :uuid="edit_node.uuid"
      @close="edit_node.flag = false; edit_node.uuid = null"
      @success="getNodeList(search, currentPage)"
    />
  </div>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<style scoped>

</style>
