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

app.config.globalProperties.$default_title = "是不是原神害了你：服务器集群管理器"
app.config.globalProperties.$user = useUserStore()
app.config.globalProperties.$user.getUserInfo()
app.config.globalProperties.$web_config = useWebsiteSettingStore()
app.config.globalProperties.$web_config.updateServerConfig(true)


export default app
