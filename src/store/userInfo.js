import {defineStore} from 'pinia'
import axios from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";

export const useUserStore = defineStore('UserInfo', {
  state: () => ({
    init: false,
    email: null,
    group: null,
    id: null,
    enableOTP: false,
    realName: null,
    userName: null,
    isNewUser: false,
    permissions: []
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        axios.get("/api/userInfo/getInfo").then(res => {
          const data = res.data.data
          this.id = data.id
          this.userName = data.userName
          this.realName = data.realName
          this.enableOTP = data.enableOTP
          this.group = data.group
          this.email = data.email
          this.permissions = data.permissions
          resolve()
        }).catch(err => {
          console.error(err)
          reject(err)
        })
      })
    },
    login(username, password) {
      /**
       * 登录
       * @param username 用户名
       * @param password 密码
       * @return Promise
       */
      return new Promise((resolve, reject) => {
        axios.post("/api/auth/login", {"username": username, "password": password}).then(res => {
          const res_data = res.data
          switch (res_data.status) {
            case 1:
              sessionStorage.setItem('loginStatus', "true");
              if (!res_data?.data) {resolve(); return this.getUserInfo()}
              this.id = res_data.data.id
              this.userName = res_data.data.userName;
              this.realName = res_data.data.realName;
              this.email = res_data.data.email;
              this.enableOTP = res_data.data.enableOTP;
              this.group = res_data.data.group;
              this.permissions = res_data.data.permissions;
              this.isNewUser = res_data.data.isNewUser;
              this.init = true
              resolve()
              break;
            default:
              message.showWarning(this, res_data.msg)
              reject()
              break;
          }
        }).catch(err => {
          console.error(err);
          message.showApiErrorMsg(this, err.message)
          reject(err)
        })
      })
    },
    logout() {
      /**
       * 登出系统
       * @return Promise
       */
      return new Promise((resolve, reject) => {
        if (!this.userName) {
          reject()
        }
        axios.get("/api/auth/logout").then(res => {
          let data = res.data
          switch (data.status) {
            case 1:
              this.$reset()
              sessionStorage.setItem('loginStatus', 'false');
              resolve()
              break;
            case 0:
              message.showError(this, data.msg)
              reject()
              break
          }
        }).catch(err => {
          if (err.response.status === 403) {
            sessionStorage.setItem('loginStatus', "false");
            this.$reset()
          } else {
            console.error(err)
            message.showApiErrorMsg(this, err.message)
            reject(err)
          }
        })
      })
    },
    async login_status() {
      /**
       * 验证用户登录状态
       * @return Boolean
       */
      let status
      await axios.get('/api/auth/getUserLoginStatus').then(res => {
        if (res.data.status !== 1) {
          sessionStorage.setItem('loginStatus', "false");
          status = false
        } else {
          sessionStorage.setItem('loginStatus', "true");
          status = true
        }
      }).catch(err => {
        if (err.response.status === 403) {
          sessionStorage.setItem('loginStatus', "false");
        } else {
          console.error(err)
        }
        status = false
      })
      return status
    },

  },
  persist: true
})

