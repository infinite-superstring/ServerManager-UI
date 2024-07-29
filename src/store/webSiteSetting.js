import {defineStore} from 'pinia'
import axios from "@/scripts/utils/axios";
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
