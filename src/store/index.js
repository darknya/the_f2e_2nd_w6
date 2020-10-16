import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    rooms: [],
    roomData: null,
    isLoading: false,
    pickDateRange: {
      start: null,
      end: null,
    },
    pickDateData: {
      date: [],
      roomId: '',
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    SETROOMSDATA(state, datas) {
      state.rooms = datas;
    },
    SETONEROOMDATA(state, onedata) {
      state.roomData = onedata;
    },
    UPPICKDATEDATA(state, pickDateData) {
      state.pickDateData = pickDateData;
    },
    UPPICKDATE(state, pickDate) {
      state.pickDateRange = pickDate;
    },
  },
  actions: {
    getRooms({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/rooms`;
      commit('LOADING', true);
      Vue.axios.get(api, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
        },
      }).then((res) => {
        commit('SETROOMSDATA', res.data);
        commit('LOADING', false);
      });
    },
    getOneRoom(context, roomId) {
      const api = `${process.env.VUE_APP_APIPATH}/room/${roomId}`;
      context.commit('LOADING', true);
      Vue.axios.get(api, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
        },
      }).then((res) => {
        context.commit('SETONEROOMDATA', res.data);
        context.commit('LOADING', false);
      }).catch((err) => console.log(err));
    },
    upBookingDate({ commit }, data) {
      commit('UPPICKDATE', data);
    },
    upDataPickDateData(context, data) {
      context.commit('UPPICKDATEDATA', data);
    },
    bookingRoom(context, payload) {
      const api = `${process.env.VUE_APP_APIPATH}/room/${payload.roomId}`;
      const data = {
        name: payload.name,
        tel: payload.tel,
        date: payload.date,
      };
      const headers = {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
          accept: 'application/json',
        },
      };
      context.commit('LOADING', true);
      Vue.axios.post(api, data, headers).then((res) => {
        console.log(res);
        context.dispatch('getOneRoom', payload.roomId);
        context.commit('LOADING', false);
      }).catch((err) => {
        console.log(err.response.data);
        context.commit('LOADING', false);
      });
    },
  },
  getters: {

  },
  modules: {
  },
});
