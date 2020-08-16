import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rooms: [],
    isLoading: false,
  },
  mutations: {
  },
  actions: {
    getRooms() {
      const vm = this;
      const api = process.env.VUE_APP_APIPATH;
      vm.axios.get(api, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
        },
      }).then((res) => {
        vm.rooms = res.data;
      });
    },
  },
  modules: {
  },
});
