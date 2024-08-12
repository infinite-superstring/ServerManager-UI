<script>
import node_group_list from "@/components/nodeGroup/group_list/groupList.vue";
import ToolsBar from "@/components/nodeGroup/group_list/toolsBar.vue";
import message from "@/scripts/utils/message";
import localConfigUtils from "@/scripts/utils/localConfigUtils";
import dialogs from "@/scripts/utils/dialogs";
import CreateGroup from "@/components/dialogs/nodeGroup/createGroup.vue";
import ShowGroupInfo from "@/components/dialogs/nodeGroup/showGroupInfo.vue";
import EditGroup from "@/components/dialogs/nodeGroup/editGroup.vue";
import node_group from "@/scripts/apis/node_group";

export default {
  name: "node_group_list_layout",
  components: {EditGroup, ShowGroupInfo, CreateGroup, ToolsBar, node_group_list},
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
      },
      editGroup: {
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
      node_group.get_node_group_list(search, page).then((res) => {
        this.maxPage = res.data.data.maxPage
        this.currentPage = res.data.data.currentPage
        this.groupListData = res.data.data.PageContent
      })
    },
    delGroup(id) {
      const user_info = localConfigUtils.load_userinfo()
      const web_config = localConfigUtils.load_web_config()
      dialogs.confirm("你确定要删除这个集群吗", "该操作无法撤销，请谨慎操作", 'warning').then(async value => {
        if (value) {
          let otp_code = ""
          console.log(user_info.enableOTP)
          if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
            await dialogs.showVerifyOTP_Dialog().then(res => otp_code = res)
          }
          node_group.delete_group(id, otp_code).then((res) => {
            message.showSuccess(this, res.data.msg)
            this.getNodeGroupList(this.currentPage, this.search)
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
    @action:show_info="id => {showGroupInfo.id = id; showGroupInfo.flag = true}"
    @action:edit="id => {editGroup.id = id; editGroup.flag = true}"
  />
  <div class="dialogs">
    <create-group
      :flag="createGroupFlag"
      @close="createGroupFlag=false"
      @success="getNodeGroupList"
    />
    <edit-group
      :id="editGroup.id"
      :flag="editGroup.flag"
      @success="getNodeGroupList(currentPage, search);editGroup.flag = false"
      @close="editGroup.flag = false; editGroup.id = null"
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
