import {defineStore} from 'pinia'
import {getServerConfigApi} from "@/scripts/apis/setting";


export const useWebsiteSettingStore = defineStore('WebsiteSetting', {
  state: () => {
    return {
      serverConfig: {
        init: false,
        webSite_name: null,
        forceOTP_Bind: null
      },
      viewMode: {
        nodeAddMode: "Single",
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
        case "nodeAddMode":
          this.viewMode.nodeAddMode = this.viewMode.nodeAddMode === "Single" ? "Multiple" : "Single"
          return this.viewMode.nodeAddMode
      }
    },
    async updateServerConfig(force = false) {
      if (this.serverConfig.init && !force) return;
      return getServerConfigApi().then((response) => {
        this.serverConfig = response.data.data
        this.serverConfig.init = true
      })
    }
  },
  persist: true
})
