<script>
import user from "@/scripts/apis/users"
import confirmDialog from '@/scripts/utils/confirmDialog'
import users from "@/scripts/apis/users";
import NotData from "@/components/emptyState/notData.vue";

export default {
  name: "userList",
  components: {NotData},
  emits: ['action', 'update'],
  props: {
    userList: {
      type: Array,
      required: true
    }
  },
  methods: {
    delUser(uid) {
      /**
       * 删除用户
       */
      confirmDialog("操作确认", "确定要删除这个用户吗", async () => {
        users.deleteUser(this, uid).then(() => {
          this.$emit('update')
        })
      })
    },
    async updateUserStatus(uid, status) {
      await user.updateUserInfo(this, uid, {disable: status})
      this.$emit('update')
    }
  }
}
</script>

<template>
  <v-table v-if="userList.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        UID
      </th>
      <th class="text-left">
        用户名
      </th>
      <th class="text-left">
        真实姓名
      </th>
      <th class="text-left">
        邮箱
      </th>
      <th class="text-left">
        权限
      </th>
      <th class="text-left">
        启用
      </th>
      <th class="text-left">
        创建时间
      </th>
      <th class="text-left">
        上次登录时间
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in userList"
      :key="item.id"
    >
      <td>
        {{ item.id }}
      </td>
      <td>
        {{ item.userName }}
        <v-icon
          icon="mdi:mdi-square-edit-outline"
          size="x-small"
          @click="$emit('action', item.id, 'editUsername', item.userName)">
        </v-icon>
      </td>
      <td>
        {{ item.realName ? item.realName : "未设置" }}
        <v-icon
          icon="mdi:mdi-square-edit-outline"
          size="x-small"
          @click="$emit('action', item.id, 'editRealName', item.realName)">
        </v-icon>
      </td>
      <td>
        {{ item.email ? item.email : "未设置" }}
        <v-icon
          icon="mdi:mdi-square-edit-outline"
          size="x-small"
          @click="$emit('action', item.id, 'editEmail', item.email)">
        </v-icon>
      </td>
      <td>
        {{ item.permissionGroupID ? item.permissionGroupName : "无权限" }}
        <v-icon
          icon="mdi:mdi-square-edit-outline"
          size="x-small"
          @click="$emit('action', item.id, 'editPermission')">
        </v-icon>
      </td>
      <td>
        <v-checkbox
          hide-details
          v-model="item.disable"
          :value="false"
          @change="updateUserStatus(item.id, !$event.target.checked)"
        />
      </td>
      <td>
        {{ item.createdAt ? item.createdAt : "未知" }}
      </td>
      <td>
        {{ item.lastLoginTime ? `${item.lastLoginTime}（ip:${item.lastLoginIP}）` : "未登录" }}
      </td>
      <td class="action-btn">
        <v-btn variant="text" size="small" @click="$emit('action', item.id, 'resetPassword')">重置密码</v-btn>
        <v-btn variant="text" size="small" color="error" @click="delUser(item.id)">删除</v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>

</style>
