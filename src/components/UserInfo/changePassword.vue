<script>
import message from "@/scripts/utils/message.js"
import axios from "axios";
import localConfigUtils from "@/scripts/utils/localConfigUtils";
import dialogs from "@/scripts/utils/dialogs";
import {updatePasswordApi} from "@/scripts/apis/users";

export default {
  name: "changePassword",
  data: () => {
    return {
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      PasswordRules: [
        value => {
          if (value?.length >= 6) return true
          return "密码必须大于或等于6个字符"
        }
      ],
      newPasswordRules: [
        value => {
          if (value?.length >= 6 && value === this.newPassword) {
            return true
          } else if (value !== this.newPassword) {
            return "两次输入的密码不一致"
          } else {
            return "密码必须大于或等于6个字符"
          }
        }
      ]
    }
  },
  methods: {
    async changePassword() {
      const user_info = localConfigUtils.load_userinfo()
      const web_config = localConfigUtils.load_web_config()
      let otp_code = ""
      if (web_config.serverConfig.forceOTP_Bind || user_info.enableOTP) {
        await dialogs.showVerifyOTP_Dialog().then(res => otp_code = res)
      }

      updatePasswordApi({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword2,
        code: otp_code
      }).then(res => {
        const apiStatus = res.data.status
        if (apiStatus === 1) {
          message.showSuccess(this, "密码修改成功")
          this.oldPassword = ""
          this.newPassword = ""
          this.newPassword2 = ""
        } else {
          message.showError(this, res.data.msg)
        }
      }).catch(err => {
        message.showApiErrorMsg(this, err.message)
      })
    }
  }
}
</script>

<template>
  <v-card title="修改密码">
    <v-card-text>
      <v-container>
        <v-row>
          <v-text-field label="原密码" type="password" v-model="oldPassword" :rules="PasswordRules" clearable
                        variant="solo"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="新密码" type="password" v-model="newPassword" :rules="PasswordRules" clearable
                        variant="solo"></v-text-field>
        </v-row>
        <v-row>
          <v-text-field label="重复一次新密码" type="password" v-model="newPassword2" :rules="newPasswordRules"
                        clearable variant="solo"></v-text-field>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="success" @click="changePassword()">保存修改</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.v-row > div {
  width: 100%;
}
</style>
