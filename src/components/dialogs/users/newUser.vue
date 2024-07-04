<script>
import axios from "axios";
import message from "@/scripts/utils/message";
import PermissionGroupTable from "@/components/tables/users/permissionGroupTable.vue";

export default {
  name: "newUser",
  components: {PermissionGroupTable},
  emits: ['close'],
  props: {
    flag: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      userName: null,
      realName: null,
      email: null,
      password: null,
      disable: false,
      permission: null
    }
  },
  methods: {
    submit() {
      /**
       * 新增用户
       */
      axios.post("/api/admin/userManager/addUser", {
        userName: this.userName,
        realName: this.realName,
        email: this.email,
        password: this.password,
        disable: this.disable,
        permission: this.permission
      }).then(res=>{
        const status = res.data.status
        if (status !== 1) {
          message.showApiErrorMsg(this, res.data.msg, status)
        } else {
          this.close()
        }
      }).catch(err=>{
        message.showApiErrorMsg(this, err.message)
      })
    },
    close() {
      this.$emit('close')
    }
  },
  watch: {
    flag(val) {
      if (!val) {
        this.userName = null
        this.realName = null
        this.email = null
        this.password = null
        this.disable = false
        this.permission = null
      }
    }
  }
}
</script>

<template>
  <v-dialog
    id="inputDialog"
    :model-value="flag"
    activator="parent"
    min-width="400px"
    width="auto"
    persistent
  >
    <v-card>
      <v-card-title>新增用户</v-card-title>
      <v-card-text>
        <v-text-field label="用户名" type="text" v-model="userName"></v-text-field>
        <v-text-field label="真实姓名" type="text" v-model="realName"></v-text-field>
        <v-text-field label="邮箱地址" type="email" v-model="email"></v-text-field>
        <v-text-field label="初始密码" type="password" v-model="password"></v-text-field>
        <div>
          <div class="text-caption">
            权限
          </div>
          <v-card>
            <v-card-text>
              <permission-group-table :select="permission" @update="args => {this.permission = args}"/>
            </v-card-text>
            <v-card-actions>
              <v-btn color="warning" :disabled="permission == null" @click="permission = null">
                清除已选择
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
        <v-switch color="primary" label="禁用用户" v-model="disable"></v-switch>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="close()">取消</v-btn>
        <v-btn color="success" @click="submit()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
