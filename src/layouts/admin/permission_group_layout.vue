<script>
import group_list from "@/components/tables/permissionGroup/groupList.vue"
import axios from "axios";
import NewGroup from "@/components/dialogs/permissionGroup/newGroup.vue";
import EditGroupInfo from "@/components/dialogs/permissionGroup/editGroupInfo.vue";
import EditGroupName from "@/components/dialogs/permissionGroup/editGroupName.vue";
import permission from "@/scripts/apis/permission";
import message from "@/scripts/utils/message";

export default {
  name: "permission_group_layout",
  components: {EditGroupName, EditGroupInfo, NewGroup, group_list},
  data: () => {
    return {
      currentPage: 1,
      maxPage: null,
      search: "",
      permissionGroups: [],
      flag: {
        newGroup: false
      },
      editGroupPermission: {
        flag: false,
        gid: null
      },
      editGroupName: {
        flag: false,
        gid: null,
      }
    }
  },
  methods: {
    // 获取用户列表
    getPermissionGroupList(search = "", page = 1, pageSize = 20) {
      /**
       * 获取用户列表
       */
      axios.post("/api/admin/permissionManager/getPermissionGroups", {
        page: page,
        pageSize: pageSize,
        search: search
      }).then(res => {
        const apiStatus = res.data.status
        if (apiStatus === 1) {
          const data = res.data.data
          const PageContent = data.PageContent
          this.maxPage = data.maxPage
          this.currentPage = data.currentPage
          this.permissionGroups = PageContent
        } else {
          this.showApiErrorMsg(res.data.msg, apiStatus)
        }
      }).catch(err => {
        console.error(err)
        this.showApiErrorMsg(err.message)
      })
    },
    // 动作
    action(action, groupId = null) {
      /**
       * 操作
       */
      switch (action) {
        case "rename":
          /**
           * 重命名
           */
          this.editGroupName.gid = groupId
          this.editGroupName.flag = true
          break
        case "edit":
          /**
           * 编辑权限组
           */
          this.editGroupPermission.gid = groupId
          this.editGroupPermission.flag = true
          break
      }
    },
    // 恢复初始值
    restore_init(dialogName) {
      switch (dialogName) {
        case "updateGroupStatusDialog":
          this.updateGroupStatusDialog.flag = false
          this.updateGroupStatusDialog.value = null
          break
        case "editPermissionGroupDialog":
          this.editPermissionGroupDialog.flag = false
          this.editPermissionGroupDialog.gid = null
          this.editPermissionGroupDialog.name = null
          this.editPermissionGroupDialog.status = true
          this.editPermissionGroupDialog.permissionList = []
          this.editPermissionGroupDialog.selected = []
          break
      }
    },
    // 重命名组
    rename(groupId, newName) {
      permission.setPermissionGroup(this, groupId, {
        newName: newName
      }).then(() => {
        message.showSuccess(this, "重命名权限组成功")
        this.getPermissionGroupList(this.search, this.currentPage)
      })
    },
    // 更新权限组状态
    updateStatus(groupId, value) {
      axios.post("/api/admin/permissionManager/setPermissionGroup", {
        id: groupId,
        data: {
          disable: !value
        }
      }).then(res => {
        const apiStatus = res.data.status
        if (apiStatus === 1) {
          this.getPermissionGroupList(this.search, this.currentPage)
          this.restore_init('updateGroupStatusDialog')
        } else {
          this.showApiErrorMsg(res.data.msg, apiStatus)
        }
      }).catch(err => {
        console.error(err)
        this.showApiErrorMsg(err.message)
      })
    },
    closeEditGroupPermission() {
      this.editGroupPermission.gid = null
      this.editGroupPermission.flag = false
      this.getPermissionGroupList(this.search, this.currentPage)
    },
    closeEditGroupName() {
      this.editGroupName.gid = null
      this.editGroupName.flag = false
      this.getPermissionGroupList(this.search, this.currentPage)
    }
  },
  created() {
    this.getPermissionGroupList()
  },
  watch: {
    currentPage(val) {
      this.getPermissionGroupList(this.search, val)
    },
    search(val) {
      console.log(val)
      this.getPermissionGroupList(val)
      this.currentPage = 1
    }
  },
}
</script>

<template>
  <div class="toolsBar">
    <v-btn
      id="addUser"
      color="success"
      @click="flag.newGroup = true"
    >
      新增权限组
    </v-btn>
    <v-text-field
      id="searchUser"
      class="search"
      density="compact"
      label="搜索"
      variant="solo-filled"
      single-line
      hide-details
      v-model="search">
    </v-text-field>
  </div>
  <group_list
    @action="action"
    @updateData="getPermissionGroupList(search, currentPage)"
    :permission-group-list="permissionGroups"
  />
  <div class="dialogs">
    <new-group
      :open-window="flag.newGroup"
      @success="getPermissionGroupList();flag.newGroup = false"
      @exit="flag.newGroup = false"
    />
    <edit-group-info
      :gid="editGroupPermission.gid"
      :flag="editGroupPermission.flag"
      @close="closeEditGroupPermission()"
    />
    <edit-group-name
      :gid="editGroupName.gid"
      :flag="editGroupName.flag"
      @close="closeEditGroupName()"
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
