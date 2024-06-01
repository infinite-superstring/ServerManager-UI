import {defineStore} from 'pinia'


export const useWebsiteSettingStore = defineStore('WebsiteSetting', {
  state: () => {
    return {
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
    }
  },
  persist: true
})
