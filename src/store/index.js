import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    rooms: [],
    roomData: null,
    isLoading: false,
    alert: false,
    pickDateRange: {
      start: null,
      end: null,
    },
    totleNight: {},
    bookingResData: {
      status: 400,
      data: {
        message: '',
      },
    },
  },
  mutations: {
    LOADING(state, status) {
      state.isLoading = status;
    },
    ALERT(state, status) {
      state.alert = status;
    },
    SETROOMSDATA(state, datas) {
      state.rooms = datas;
    },
    SETONEROOMDATA(state, onedata) {
      state.roomData = onedata;
    },
    UPPICKDATE(state, pickDate) {
      state.pickDateRange = pickDate;
    },
    TOTLENIGHT(state, nights) {
      state.totleNight = nights;
    },
    BOOKINGRESDATA(state, resData) {
      state.bookingResData = resData;
    },
  },
  actions: {
    alert({ commit }, payload) {
      commit('ALERT', payload);
    },
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
    bookingRoom({ commit, dispatch }, payload) {
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
      commit('LOADING', true);
      Vue.axios.post(api, data, headers).then((res) => {
        // console.log(res);
        const { status } = res;
        dispatch('getOneRoom', payload.roomId);
        commit('BOOKINGRESDATA', { status });
        commit('ALERT', true);
        commit('LOADING', false);
      }).catch((err) => {
        // console.log(err.response);
        const { status } = err.response;
        const resMsg = err.response.data.message;
        commit('BOOKINGRESDATA', { status, resMsg });
        commit('ALERT', true);
        commit('LOADING', false);
      });
    },
    getTotalNight({ commit }, pickDate) {
      if (!pickDate) {
        commit('TOTLENIGHT', {
          weekday: 0,
          weekend: 0,
        });
      } else {
        const startDay = pickDate.start.getDay();
        const endDay = pickDate.end.getDay();
        const totalNight = parseInt((pickDate.end - pickDate.start)
            / 1000 / 60 / 60 / 24, 10);
        let weekday = 0;
        let weekend = 0;
        if (totalNight <= 6) { // 小於6夜
          if (startDay > endDay) { // 跨週
            weekend += 2;
            if (startDay === 6) { // 起始日為周六要減一夜
              weekend -= 1;
            }
          } else if (endDay === 6) { // 同一週 且結束日為周六
            weekend += 1;
          }
          weekday = totalNight - weekend; // 總夜 - 周末夜 = 一般夜
        } else { // 大於6個晚上
          const fullWeekEnd = ((totalNight - (7 - startDay + endDay)) / 7) * 2; // 去頭尾兩週的周末夜
          weekend += fullWeekEnd;
          if (startDay === 6) weekend += 1; // 將頭尾兩周的周末夜加回
          if (endDay === 6) weekend += 1;
          if (startDay <= 5) {
            weekend += 2;
          }
          weekday = totalNight - weekend;
        }
        commit('TOTLENIGHT', {
          weekday,
          weekend,
        });
      }
    },
  },
  getters: {

  },
  modules: {
  },
});
