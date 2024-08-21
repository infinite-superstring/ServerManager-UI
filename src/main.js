/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import {registerPlugins} from '@/plugins'

// Components
import App from './App.vue'

// Composables
import {createApp} from 'vue'
import {useUserStore} from "@/store/userInfo";
import {useWebsiteSettingStore} from "@/store/webSiteSetting";



const app = createApp(App)

registerPlugins(app)
// checkInComponents(app)

app.mount('#app')


const userStore = useUserStore()
userStore.getUserInfo()
app.config.globalProperties.$user = userStore
const web_config = useWebsiteSettingStore()
web_config.updateServerConfig(true)
if (web_config.serverConfig.init) {
  app.config.globalProperties.$default_title = web_config.serverConfig.webSite_name
} else {
  app.config.globalProperties.$default_title = "ServerManager"
}

app.config.globalProperties.$web_config = web_config

export default app
