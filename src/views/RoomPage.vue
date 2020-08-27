<template>
  <div class="room-page" v-if="roomData">
    <div class="room-banner">
      <div class="banner-logo"><img src="@/assets/roompage_logo.svg" alt=""></div>
      <div class="banner-carousel">
        <SlideShow :src="roomData.room[0].imageUrl"/>
      </div>
    </div>
    <div class="room-content">
      <div class="room-info">
        <h2 class="info-title">
          {{roomData.room[0].name}}
          <span class="title-icon"> 0000</span>
          <span class="title-icon"> 0000</span>
        </h2>
        <div class="info-body">
          <p class="body-description">
            {{roomData.room[0].description}}
          </p>
          <p>Check-in: {{roomData.room[0].checkInAndOut.checkInEarly}}
            ~ {{roomData.room[0].checkInAndOut.checkInLate}}
            / Check-out: {{roomData.room[0].checkInAndOut.checkOut}}
          </p>
          <p>
            Weekday(Mon - Thu): ${{roomData.room[0].normalDayPrice}}
            / Weekend(Fri - Sun): ${{roomData.room[0].holidayPrice}}
          </p>
        </div>
        <div class="info-amenities">
          <ul>
            <li v-for="(item, index) in roomData.room[0].amenities"
              :key="index" :style="{opacity: item ? 1 : 0.4}"><img :src="getIcon(index)" alt="">
              {{index}}</li>
          </ul>
        </div>
      </div>
      <div class="room-booking">
        <!-- <img src="https://fakeimg.pl/300x300/777"> -->
        <vc-date-picker :rows="1" mode="range" :min-date="new Date()"
          v-model="bookingDates"
          color="gray"
          :disabled-dates='roomData.booking.map((i) => i.date)'
          is-inline />
        <div class="price-block">
          <div class="normalday">
            <span>Weekday:</span>
            <span>{{totalDayNight.weekday}}
              {{totalDayNight.weekday > 1 ? "nights" : "night"}}</span>
          </div>
          <div class="holiday">
            <span>Weekend:</span>
            <span>{{totalDayNight.weekend}}
              {{totalDayNight.weekend > 1 ? "nights" : "night"}}</span>
          </div>
          <div class="total-price">
            <p>Total: </p>
            <p>${{(totalDayNight.weekday*roomData.room[0].normalDayPrice) +
              (totalDayNight.weekend*roomData.room[0].holidayPrice)}}</p>
          </div>
        </div>
        <router-link to="/order">
          <button class="btn order-btn" @click="bookingRoom()">Order</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SlideShow from '@/components/SlideShow.vue';

export default {
  components: {
    SlideShow,
  },
  data() {
    return {
      bookingDates: {
        start: null,
        end: null,
      },
      totalDayNight: {},
    };
  },
  created() {
    this.getOneRoom();
  },
  watch: {
    bookingDates() {
      this.totalDayNight = this.getTotalNight();
    },
  },
  methods: {
    getOneRoom() {
      this.$store.dispatch('getOneRoom', this.$route.params.roomID);
    },
    // 解決Vue動態圖片顯示 參考: https://stackoverflow.com/questions/40491506/vue-js-dynamic-images-not-working/47480286#47480286
    getIcon(iconName) {
      const images = require.context('@/assets/');
      try {
        return images(`./icon_${iconName}.svg`);
      } catch (error) {
        return images('./icon_error-outline.svg');
      }
    },
    getTotalNight() {
      if (!this.bookingDates) {
        return {
          weekday: 0,
          weekend: 0,
        };
      }
      const startDay = this.bookingDates.start.getDay();
      const endDay = this.bookingDates.end.getDay();
      const totalNight = parseInt((this.bookingDates.end - this.bookingDates.start)
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
      return {
        weekday,
        weekend,
      };
    },
    bookingRoom() {
      const data = {
        date: this.toDateArry,
        roomId: this.$route.params.roomID,
      };
      this.$store.dispatch('upDataPickDateData', data);
    },
  },
  computed: {
    roomData() {
      return this.$store.state.roomData;
    },
    toDateArry() {
      const dateEnd = this.bookingDates.end;
      const totalNight = this.totalDayNight.weekday + this.totalDayNight.weekend;
      const dateArry = [];
      for (let i = 0; i < totalNight; i += 1) {
        dateArry.push(new Date(dateEnd - new Date(1000 * 60 * 60 * 24 * i))
          .toISOString().slice(0, 10));
      }
      return dateArry;
    },
  },
};
</script>

<style lang="scss">
  .room-banner {
    position: relative;
    width: 100%;
    .banner-carousel {
      width: 100%;
      img {
        width: 100%;
        height: 60vh;
        object-fit: cover;
      }
    }
    .banner-logo {
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1;
    }
  }

  .room-content {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.2rem 1.2rem;
    .room-info {
      width: 55%;
      .info-title, .info-body, .info-amenities{
        margin-bottom: 1.8rem;
      }
    }
    .room-booking {
      width: 45%;
    }
  }

  .info-amenities {
    ul {
      width: 100%;
      list-style: none;
      background-color: rgba(248, 248, 248, 0.71);
      display: flex;
      flex-wrap: wrap;
      padding: 2rem .5rem;
      // overflow: hidden;
      li {
        padding: 8px;
        width: 25%;
      }
    }
  }
  .room-booking {
    display: flex;
    flex-direction: column;
    // justify-content: flex-end;
    align-items: flex-end;
  }
  .price-block {
    margin: 1.3rem 0;
    >:nth-child(n) {
      display: flex;
      justify-content: space-between;
      padding: .1rem 0;
      &:last-child {
        margin-top: 10px;
      }
      >:nth-child(1) {
        margin: 0 5px 0 0;
      }
    }
  }
  .btn {
    font-size: 1.1rem;
    letter-spacing: 1px;
    color: #FFF;
    padding: 8px 35px;
    border: none;
    outline: none;
    border-radius: 25px;
    background-color: #495156;
    margin: .8rem 0;
    &:hover {
      box-shadow: 1px 1px 5px 0 #495156;
    }
  }
@media (max-width: 768px) {
  .info-amenities ul li {
    width: 33%;
  }
}

@media (max-width: 576px) {
  .room-content {
    flex-direction: column;
    .room-info {
      width: 100%;
    }
    .room-booking {
      width: 100%;
    }
  }
  .info-amenities ul li {
    width: 50%;
  }
}
</style>
