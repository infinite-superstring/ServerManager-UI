<script>
import ToolsBar from "@/components/nodeList/toolsBar.vue";
import nodeList from "@/components/nodeList/nodeList.vue";
import addNode from "@/components/dialogs/node/addNode.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import node_manager from "@/scripts/node/node_manager";
import {useWebsiteSettingStore} from "@/store/webSiteSetting";

export default {
  name: "node_list_layout",
  computed: {
    node_manager() {
      return node_manager
    }
  },
  components: {ToolsBar, nodeList, addNode},
  emits: ['show_token'],
  data() {
    return {
      add_node: false,
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
      this.getNodeList(1, val)
    },
    currentPage(val) {
      this.getNodeList(val, this.search)
    }
  },
  mounted() {
    this.getNodeList()
    this.displayMode = useWebsiteSettingStore().viewMode.nodeList
  },
  methods: {
    getNodeList(page = 1, search = "") {
      axios.post('/api/node_manager/getNodeList',{
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
      }).catch(err=>{
        console.error(err)
        message.showApiErrorMsg(this, err.message)
      })
      return false
    }
  }
}
</script>

<template>
  <tools-bar
    @action:addNode="add_node=true"
    @action:search="args => {search=args}"
    @action:switch_display_mode = "args => {displayMode=args}"
    :search="search"
  />
  <node-list
    :nodeList="nodeListData"
    :display-mode="displayMode"
    @action:click_tag="args => search = `tag:${args}`"
    @action:del_node="args => node_manager.del_node(this, args, res => getNodeList())"
    @action:reset_token="args => node_manager.reset_token(this, args, res => $emit('show_token', 'reset_token', res))"
  />
  <div class="dialogs">
    <add-node
      :flag="add_node"
      @close="add_node = false"
      @success="args => {$emit('show_token', 'new_node', args); getNodeList()}"
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
