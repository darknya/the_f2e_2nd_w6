import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    rooms: [],
    roomData: null,
    isLoading: false,
    pickDateData: {
      date: [],
      roomId: '',
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    ROOMSDATA(state, datas) {
      state.rooms = datas;
    },
    ONEROOMDATA(state, onedata) {
      state.roomData = onedata;
    },
    UPPICKDATEDATA(state, pickDateData) {
      state.pickDateData = pickDateData;
    },
  },
  actions: {
    // updateLoading(context, status) {
    //   context.commit('LOADING', status);
    // },
    getRooms(context) {
      const api = `${process.env.VUE_APP_APIPATH}/rooms`;
      context.commit('LOADING', true);
      Vue.axios.get(api, {
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
        },
      }).then((res) => {
        context.commit('ROOMSDATA', res.data);
        context.commit('LOADING', false);
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
        context.commit('ONEROOMDATA', res.data);
        context.commit('LOADING', false);
      }).catch((err) => console.log(err));
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
        context.commit('LOADING', false);
      }).catch((err) => {
        console.log(err.response.data);
        context.commit('LOADING', false);
      });
    },
  },
  modules: {
  },
});
