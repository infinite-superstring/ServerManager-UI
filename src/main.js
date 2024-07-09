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



const app = createApp(App)

registerPlugins(app)
// checkInComponents(app)

app.mount('#app')

app.config.globalProperties.$default_title = "是不是原神害了你：服务器集群管理器"


export default app
