import {defineStore} from 'pinia'
import axios from "@/scripts/utils/axios";


export const useWebsiteSettingStore = defineStore('WebsiteSetting', {
  state: () => {
    return {
      serverConfig: {
        init: false,
        forceOTP_Bind: null
      },
      viewMode: {
        nodeList: "SimpleView"
      }
    }
  },
  actions: {
    updateViewMode(page) {
      switch (page) {
        case "nodeList":
          this.viewMode.nodeList = this.viewMode.nodeList === "SimpleView" ? "AdvancedView" : "SimpleView"
          return this.viewMode.nodeList
      }
    },
    async updateServerConfig() {
      console.log(this.serverConfig)
      if (this.serverConfig.init){ return }
      return axios.get("/api/settings/getServerConfig").then((response) => {
        this.serverConfig = response.data.data
        this.serverConfig.init = true
      })
    }
  },
  persist: true
})
