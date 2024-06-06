<script>
import ToolsBar from "@/components/nodeGroup/toolsBar.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import CreateGroup from "@/components/dialogs/nodeGroup/createGroup.vue";
import Node_group_list from "@/components/nodeGroup/groupList.vue";
import dialogs from "@/scripts/utils/dialogs";
import ShowGroupInfo from "@/components/dialogs/nodeGroup/showGroupInfo.vue";

export default {
  name: "node_group_edit_layout",
  components: {ShowGroupInfo, Node_group_list, CreateGroup, ToolsBar},
  data: () => {
    return {
      search: "",
      currentPage: 1,
      maxPage: null,
      groupListData: [],
      createGroupFlag: false,
      showGroupInfo: {
        flag: false,
        id: null
      }
    }
  },
  mounted() {
    this.getNodeGroupList()
  },
  methods: {
    getNodeGroupList(page = 1, search = "") {
      axios.post('/api/node_manager/node_group/getGroupList', {
        page: page,
        search: search
      }).then((res) => {
        if (res.data.status === 1) {
          this.maxPage = res.data.data.maxPage
          this.currentPage = res.data.data.currentPage
          this.groupListData = res.data.data.PageContent
        } else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.message)
      })
    },
    delGroup(id) {
      dialogs.confirm("你确定要删除这个节点组吗", "该操作无法撤销，请谨慎操作", 'warning').then(value => {
        if (value) {
          axios.post("/api/node_manager/node_group/delGroup", {
            group_id: id
          }).then((res) => {
            if (res.data.status === 1) {
              message.showSuccess(this, res.data.msg)
              this.getNodeGroupList(this.currentPage, this.search)
            } else {
              message.showError(this, res.data.msg)
            }
          }).catch(err => {
            console.error(err)
            message.showApiErrorMsg(this, err.message)
          })
        }
      })
    }
  },
  watch: {
    search(val) {
      this.getNodeGroupList(1, val)
    },
    currentPage(val) {
      this.getNodeGroupList(val, this.search)
    }
  }
}
</script>

<template>
  <tools-bar
    @action:create_group="createGroupFlag=true"
    @action:search="args => {search=args}"
    :search="search"
  />
  <node_group_list
    :value="groupListData"
    @action:del="id=>delGroup(id)"
    @action:edit=""
    @action:show_info="id => {showGroupInfo.id = id; showGroupInfo.flag = true}"
  />
  <div class="dialogs">
    <create-group
      :flag="createGroupFlag"
      @close="createGroupFlag=false"
      @success="getNodeGroupList"
    />
    <show-group-info
      :id="showGroupInfo.id"
      :flag="showGroupInfo.flag"
      @close="showGroupInfo.flag = false; showGroupInfo.id = null"
    />
  </div>
</template>

<style scoped>

</style>
