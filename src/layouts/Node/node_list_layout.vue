<script>
import ToolsBar from "@/components/nodeList/toolsBar.vue";
import nodeList from "@/components/nodeList/nodeList.vue";
import addNode from "@/components/dialogs/node/addNode.vue";
import node_manager from "@/scripts/apis/node_manager";
import EditNode from "@/components/dialogs/node/editNode.vue";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";
import SwitchViewsButton from "@/components/nodeList/SwitchViewsButton.vue";
import node_group from "@/scripts/apis/node_group";

export default {
  name: "node_list_layout",
  computed: {
    node_manager() {
      return node_manager
    }
  },
  components: {SwitchViewsButton, ToolsSelectBar, EditNode, ToolsBar, nodeList, addNode},
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
      displayMode: "",
      params: {},
      options: [
        {
          prop: 'status',
          label: '状态',
          optional: [
            {
              label: '在线',
              value: 'online'
            },
            {
              label: '离线',
              value: 'offline'
            },
            {
              label: '未初始化',
              value: 'uninitialized'
            }
          ],
          type: 'checkbox'
        },
        {
          prop: 'warning',
          label: '是否告警',
          optional: [
            {
              label: '是',
              value: true
            },
            {
              label: '否',
              value: false
            }
          ],
          type: 'radio'
        },
        {
          prop: 'auth_restriction',
          label: '登录限制',
          optional: [
            {
              label: '启用',
              value: true
            },
            {
              label: '禁用',
              value: false
            }
          ],
          type: 'radio'
        }
      ]
    }
  },
  watch: {
    search(val) {
      this.getNodeList(val, 1)
    },
    currentPage(val) {
      this.getNodeList(this.params.search, val)
    }
  },
  mounted() {
    this.params.search = this.$route.query.search
    this.getNodeList(this.params.search, 1)
    this.displayMode = this.$web_config.viewMode.nodeList
  },
  methods: {
    getNodeList(search = "", page = 1) {
      node_manager.getNodeListApi({...this.params, page}).then(res => {
        this.maxPage = res.data.data.maxPage
        this.currentPage = res.data.data.currentPage
        this.nodeListData = res.data.data.PageContent
        return true
      })
    },
    switch_display_mode(mode) {
      this.$web_config.viewMode.nodeList = mode
      this.displayMode = mode
    }
  }
}
</script>

<template>
  <!--  <tools-bar-->
  <!--    @action:addNode="add_node=true"-->
  <!--    @action:search="args => {search=args}"-->
  <!--    @action:switch_display_mode="args => {switch_display_mode(args)}"-->
  <!--    :search="search"-->
  <!--  />-->
  <ToolsSelectBar
    v-model="params"
    button-label="添加节点"
    search-label="按节点名搜索"
    @add-button-click="add_node=true"
    @search:input="getNodeList()"
    @option:click="getNodeList()"
    :options="options"
  >
    <template #append>
      <SwitchViewsButton @switch_display_mode="switch_display_mode"/>
    </template>
  </ToolsSelectBar>
  <node-list
    :nodeList="nodeListData"
    :display-mode="displayMode"
    @action:click_tag="args => params.search = `tag:${args}`"
    @action:click_status="args => params.search = `status:${args}`"
    @action:del_node="args => node_manager.del_node(this, args, res => getNodeList())"
    @action:reset_token="args => node_manager.reset_token(this, args, (token,serverToken) => $emit('show_token', 'reset_token', {token,serverToken}))"
    @action:edit="args => {edit_node.uuid = args; edit_node.flag = true}"
  />
  <div class="dialogs">
    <add-node
      :flag="add_node"
      @close="add_node = false"
      @success="args => {$emit('show_token', 'new_node', args); getNodeList(params.search, currentPage)}"
    />
    <edit-node
      :flag="edit_node.flag"
      :uuid="edit_node.uuid"
      @close="edit_node.flag = false; edit_node.uuid = null"
      @success="getNodeList(params.search, currentPage)"
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
