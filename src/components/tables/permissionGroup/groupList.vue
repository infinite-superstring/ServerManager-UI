<script>
import dialogs from "@/scripts/utils/dialogs";
import permission from "@/scripts/apis/permission";
import localConfigUtils from "@/scripts/utils/localConfigUtils";
import NotData from "@/components/emptyState/notData.vue";
import message from "@/scripts/utils/message";

/**
 * 权限组列表
 */

export default {
  name: "GroupList",
  components: {NotData},
  emits: [
    /**
     * 动作
     */
    "action",
    /**
     * 列表更新
     */
    "updateData"
  ],
  props: {
    permissionGroupList: {
      /**
       * 权限组列表数据
       */
      type: Array,
      required: true
    }
  },
  methods: {
    delGroup(groupId) {
      /**
       * 删除权限组
       */
      dialogs.confirm("您确定要删除这个组吗", "该操作无法撤销，请谨慎操作", 'warning')
        .then(async (value) => {
          if (value) {
            const user_info = localConfigUtils.load_userinfo()
            const web_config = localConfigUtils.load_web_config()
            let otp_code = ""
            if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
              await dialogs.showVerifyOTP_Dialog().then(res => otp_code = res)
            }
            await permission.deleteGroup(this, groupId, otp_code).then(() => {
              this.$emit("updateData")
            })
          }
        })
    },
    async updateStatus(gid, value) {
      await permission.editGroup(this, gid, {disable: value}).then(()=>{
        if (value) {
          message.showSuccess(this, "权限组已禁用")
        } else {
          message.showSuccess(this, "权限组已启用")
        }
      })
      this.$emit("updateData")
    }
  }
}
</script>

<template>
  <v-table v-if="permissionGroupList.length > 0">
    <thead>
    <tr>
      <th class="text-left">
        ID
      </th>
      <th class="text-left">
        权限组名
      </th>
      <th class="text-left">
        创建者
      </th>
      <th class="text-left">
        创建时间
      </th>
      <th class="text-left">
        状态
      </th>
      <th class="text-left">
        操作
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="item in permissionGroupList"
      :key="item.id"
    >
      <td>{{ item.id }}</td>
      <td>{{ item.name }}
        <v-icon
          icon="mdi:mdi-square-edit-outline"
          size="x-small"
          @click="$emit('action','rename', item.id)"/>
      </td>
      <td>{{ item.creator ? item.creator : "未知" }}</td>
      <td>{{ item.createdAt ? item.createdAt : "未知" }}</td>
      <td>
        <v-checkbox
          hide-details
          v-model="item.disable"
          :value="false"
          @change="updateStatus(item.id, !$event.target.checked)"
        />
      </td>
      <td>
        <v-btn
          variant="text"
          color="primary"
          size="small"
          @click="$emit('action','edit', item.id)">
          编辑
        </v-btn>
        <v-btn
          variant="text"
          color="error"
          size="small"
          @click="delGroup(item.id)">
          删除
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <not-data v-else/>
</template>

<style scoped>

</style>
