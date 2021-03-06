import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VCalendar from 'v-calendar';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Main from './Main.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount('#app');
