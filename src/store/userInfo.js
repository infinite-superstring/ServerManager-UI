import {defineStore} from 'pinia'
import axios from "axios";
import message from "@/scripts/utils/message";

export const useUserStore = defineStore('UserInfo', {
  state: () => ({
    email: null,
    group: null,
    id: null,
    realName: null,
    userName: null,
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
          const data = res.data
          switch (data.status) {
            case 1:
              localStorage.setItem('loginStatus', "true");
              resolve()
              break;
            default:
              message.showWarning(this, data.msg)
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
              localStorage.setItem('loginStatus', 'false');
              resolve()
              break;
            case 0:
              message.showError(this, data.msg)
              reject()
              break
          }
        }).catch(err => {
          console.error(err)
          message.showApiErrorMsg(this, err.message)
          reject(err)
        })
      })
    },
    login_status() {
      /**
       * 验证用户登录状态
       * @return Boolean||Promise
       */
      const Status = localStorage.getItem('loginStatus') ? JSON.parse(localStorage.getItem('loginStatus')) : null
      console.log(Status)
      if (Status === true) {
        return true
      } else if (Status === false) {
        return false
      }
      return new Promise((resolve, reject) => {
        axios.get('/api/auth/getUserLoginStatus').then(res => {
        if (res.data.status !== 1) {
          localStorage.setItem('loginStatus', "false");
          resolve(false)
        } else {
          localStorage.setItem('loginStatus', "true");
          resolve(false)
        }
      }).catch(err => {
        console.error(err)
        reject(err)
      })
      })
    },
    check_user_permission(permission) {
      /**
       * 检查用户是否拥有该权限
       * @param permission 权限名
       * @return boolean
       */
      if (this.permissions.length <= 0) {
        return false
      }
      if (this.permissions.includes("all")) {
        return true
      }
      return this.permissions.includes(permission)
    }
  },
  persist: true,
})
