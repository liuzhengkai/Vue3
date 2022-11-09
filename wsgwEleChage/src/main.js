import { createApp } from 'vue'
import App from './App.vue'
import router from './utils/router/router.js'
import Varlet from '@varlet/ui'
import '@varlet/ui/es/style.js'

createApp(App).use(router).use(Varlet).mount('#app')
