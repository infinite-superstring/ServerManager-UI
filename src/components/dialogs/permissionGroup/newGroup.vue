<script>
import message from "@/scripts/utils/message.js"
import permission from "@/scripts/apis/permission";

export default {
  name: "NewGroup",
  emits: ["success", "exit"],
  props: {
    openWindow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newGroupName: "",
      newGroupStatus: "",
      permissionList: [],
      permissionSelect: [],
    }
  },
  watch: {
    openWindow(val) {
      if (val) {
        this.getPermissionList()
      }
    }
  },
  methods: {
    getPermissionList() {
      /**
       * 获取权限列表
       */
        console.log('get')
      permission.getPermissionList().then(data=>{
        console.log(data)
        this.permissionList = data
      })
    },
    reset() {
      /**
       * 重置
       * @type {string}
       */
      this.newGroupName = ""
      this.newGroupStatus = ""
      this.permissionSelect = []
    },
    submitNewGroup() {
      /**
       * 提交新增组
       */
      if (!this.newGroupName) {
        message.showError(this, '请输入权限组名')
        return
      }
      if (this.newGroupName.length < 3 && this.newGroupName.length > 20) {
        message.showError(this, "权限组名长度应在3-20位之间")
        return
      }
      if (this.permissionSelect.length < 1) {
        message.showError(this, '请选择权限')
        return
      }
      let permission_list = {}
      for (const permissionKey in this.permissionList) {
        permission_list[permissionKey] = this.permissionSelect.includes(permissionKey)
      }
      permission.addPermissionGroup(this.newGroupName, this.newGroupStatus, permission_list).then(()=>{
        message.showSuccess(this, `权限组${this.newGroupName}创建成功`)
        this.reset()
        this.$emit('success')
      })
    },
  }
}
</script>

<template>
  <v-dialog
    id="inputDialog"
    activator="parent"
    min-width="400px"
    width="auto"
    persistent
    :modelValue="openWindow"
  >
    <v-card>
      <v-card-title>新建权限组</v-card-title>
      <v-card-text>
        <v-text-field type="text" label="权限组名" v-model="newGroupName"></v-text-field>
        <v-switch label="启用权限组" v-model="newGroupStatus" color="primary"></v-switch>
        <v-card class="pa-1">
          <v-card-title>选择该组可使用的权限</v-card-title>
          <v-card-text>
            <v-table density="compact">
              <thead>
              <tr>
                <th class="text-left">
                  选择
                </th>
                <th class="text-left">
                  权限原名
                </th>
                <th class="text-left">
                  权限译名
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="(value, key) in permissionList"
                :key="key"
              >
                <td><input type="checkbox" :value="key" v-model="permissionSelect"></td>
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
              </tbody>
            </v-table>
          </v-card-text>
          <v-card-actions>
            <v-btn color="warning" :disabled="permissionSelect.length < 1" @click="permissionSelect = []">
              清空已选择
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submitNewGroup()">确定</v-btn>
        <v-btn color="error" @click="reset(); $emit('exit')">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
