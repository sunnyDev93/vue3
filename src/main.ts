/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'
import '@core/scss/template/index.scss'
import '@layouts/styles/index.scss'
import '@styles/styles.scss'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowDown19, faArrowsLeftRight, faBusSimple, faCar, faClipboardList, faGears, faHouse, faMagnifyingGlass, faMotorcycle, faQrcode, faTractor, faTrademark, faTruck, faUser, faVanShuttle } from '@fortawesome/free-solid-svg-icons'

library.add(faUser, faCar, faMotorcycle, faBusSimple, faTruck, faTractor, faVanShuttle, faArrowsLeftRight, faGears, faHouse, faQrcode, faMagnifyingGlass, faArrowDown19, faClipboardList, faTrademark)

/* add font awesome icon component */
loadFonts()

// Create vue app
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedState)

app.component('FontAwesomeIcon', FontAwesomeIcon)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

// Use plugins
app.use(vuetify)
app.use(ElementPlus, {
  size: 'large',
})
app.use(pinia)
app.use(router)

// Mount vue app
app.mount('#app')
