<script>
import userList from "@/components/tables/users/userList.vue";
import axios from "axios";
import message from "@/scripts/utils/message";

import EditUserPermission from "@/components/dialogs/users/editUserPermission.vue";
import NewUser from "@/components/dialogs/users/newUser.vue";
import dialogs from "@/scripts/utils/dialogs";
import user from "@/scripts/apis/users";

export default {
  name: "user_manager_layout",
  components: {NewUser, EditUserPermission, userList},
  data() {
    return {
      search: "",
      userList: [],
      currentPage: 1,
      maxPage: null,
      newUser: {
        flag: false,
      },
      editUserName: {
        flag: false,
        uid: null
      },
      editUserRealName: {
        flag: false,
        uid: null
      },
      editUserPermission: {
        flag: false,
        uid: null
      },
      editUserEmail: {
        flag: false,
        uid: null
      },
      resetPassword: {
        flag: false,
        uid: null
      }
    }
  },
  methods: {
    getUserList(search = "", page = 1, pageSize = 20) {
      axios.post("/api/admin/userManager/getUserList", {
        page: page,
        pageSize: pageSize,
        search: search
      }).then(res => {
        const apiStatus = res.data.status
        if (apiStatus === 1) {
          const data = res.data.data
          this.userList = data.PageContent
          this.maxPage = data.maxPage
          this.currentPage = data.currentPage
        } else {
          message.showApiErrorMsg(this, res.data.msg, apiStatus)
        }
      }).catch(err => {
        message.showApiErrorMsg(this, err.message)
      })
    },
    editUser(uid, action, current_value = null) {
      /**
       * 编辑用户
       */
      switch (action) {
        // 编辑用户名
        case "editUsername":
          dialogs.showInput_Dialog(
            "编辑用户名",
            "请输入新用户名",
            "用户名应为3-20位字符",
            "text",
            true,
            current_value,
            20,
            3
          ).then(async value => {
            await user.updateUserInfo(this, uid, {userName: value})
            this.getUserList()
          })
          break
        // 编辑真实姓名
        case "editRealName":
          dialogs.showInput_Dialog(
            "编辑用户真实姓名",
            "请输入用户真实姓名",
            "真实姓名应为2-20位字符",
            "text",
            true,
            current_value,
            20,
            2
          ).then(async value => {
            await user.updateUserInfo(this, uid, {realName: value})
            this.getUserList()
          })
          break
        // 编辑邮箱
        case "editEmail":
          dialogs.showInput_Dialog(
            "编辑用户邮箱",
            "请输入用户邮箱地址",
            "",
            "email",
            true,
            current_value
          ).then(async value => {
            await user.updateUserInfo(this, uid, {email: value})
            this.getUserList()
          })
          break
        // 编辑权限
        case "editPermission":
          this.editUserPermission.uid = uid
          this.editUserPermission.flag = true
          break
        // 重置密码
        case "resetPassword":
          dialogs.showInput_Dialog(
            "重设用户密码",
            "请输入用户新密码",
            "",
            "password",
            true
          ).then(async value => {
            await user.updateUserInfo(this, uid, {password: value})
            this.getUserList()
          })
          break
      }
    },
    closeEditUserPermissionWindow() {
      /**
       * 关闭编辑用户权限组窗口
       */
      this.editUserPermission.uid = null
      this.editUserPermission.flag = false
      this.getUserList()
    },
    closeNewUserWindow() {
      /**
       * 关闭新建用户窗口
       * @type {boolean}
       */
      this.newUser.flag = false
      this.getUserList()
    }
  },
  mounted() {
    this.getUserList()
  },
  watch: {
    currentPage(val) {
      this.getUserList(this.search, val)
    },
    search(val) {
      this.getUserList(val)
      this.currentPage = 1
    },
  }
}
</script>

<template>
  <div class="toolsBar">
    <v-btn
      id="addUser"
      color="success"
      @click="newUser.flag = true">
      新增用户
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
  <user-List :user-list="userList" @action="editUser" @update="getUserList()"/>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>

  <div class="dialogs">
    <edit-user-permission
      :uid="editUserPermission.uid"
      :flag="editUserPermission.flag"
      @close="closeEditUserPermissionWindow()"/>
    <new-user
      :flag="newUser.flag"
      @close="closeNewUserWindow()"/>
  </div>

</template>

<style scoped>

</style>
