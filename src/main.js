import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import ElementPlus from 'element-plus'
//import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(ElementPlus)
createApp(App).use(store).mount('#app')
