import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import '@/plugins/registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
sync(store, router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
