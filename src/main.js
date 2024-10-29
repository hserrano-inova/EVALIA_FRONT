//npm install --save axios bootstrap bootstrap-icons vuejs-smart-table

//https://bootswatch.com/minty/
//https://icons.getbootstrap.com/
//https://getbootstrap.com/docs/5.0/examples/dashboard/
//https://icons.getbootstrap.com/

import './assets/bootstrap.min.css'
import './assets/custom.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SmartTable from 'vuejs-smart-table'

import App from './App.vue'
import router from './router'
import i18n from './i18n';

const app = createApp(App)

app.use(i18n);
app.use(createPinia())
app.use(router)
app.use(SmartTable)

app.mount('#app')
