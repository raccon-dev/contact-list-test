import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import { store } from './store/'

import Home from './components/Home.vue'
import ContactSelfInfo from './components/ContactSelfInfo.vue'

Vue.use(VueRouter);


const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/contact/:id',
      name: 'contact',
      component: ContactSelfInfo
    }
  ]
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
