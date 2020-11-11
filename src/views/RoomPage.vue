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
        <div class="info-title">
          <h2 class="title">{{roomData.room[0].name}}</h2>
        </div>
        <div class="info-short">
            <span class="guest">
              <img src="@/assets/icon_user.svg" alt="">
              {{numOfPeople}}
            </span>
            <span class="bed">
              <img src="@/assets/icon_bed.svg" alt="">
              {{`${roomData.room[0].descriptionShort.Bed[0]}*${roomData.room[0]
                .descriptionShort.Bed.length}`}}
            </span>
            <span class="bath">
              <img src="@/assets/icon_bath.svg" alt="">
              {{roomData.room[0].descriptionShort['Private-Bath']}}
            </span>
            <span class="footage">
              <img src="@/assets/icon_size.svg" alt="">
              {{roomData.room[0].descriptionShort.Footage}} ㎡
            </span>
        </div>
        <div class="info-body">
          <p class="body-description">
            {{roomData.room[0].description}}
          </p>
          <p>Check-in: {{roomData.room[0].checkInAndOut.checkInEarly}}
            ~ {{roomData.room[0].checkInAndOut.checkInLate}}
            / Check-out: {{roomData.room[0].checkInAndOut.checkOut}}
          </p>
          <p>
            Weekday(Mon - Thu) : ${{roomData.room[0].normalDayPrice}}
            / Weekend(Fri - Sun) : ${{roomData.room[0].holidayPrice}}
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
        <vc-date-picker :rows="1" mode="range"
          :min-date="new Date(Math.floor(new Date()) + (1000*60*60*24))"
          v-model="pickDate"
          color="gray"
          :disabled-dates="roomData.booking.map((i) => i.date)"
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
        <router-link :to="{name: 'ChackOrder',
        params: { roomID : this.$route.params.roomID }}">
          <button class="btn order-btn" @click="upBookingRoom()">Order</button>
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
      pickDate: {
        start: null,
        end: null,
      },
    };
  },
  created() {
    this.getOneRoom();
  },
  watch: {
    pickDate() {
      this.$store.dispatch('getTotalNight', this.pickDate);
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
    upBookingRoom() {
      this.$store.dispatch('upBookingDate', this.pickDate);
    },
  },
  computed: {
    roomData() {
      return this.$store.state.roomData;
    },
    totalDayNight() {
      return this.$store.state.totleNight;
    },
    numOfPeople() {
      let people = `${this.roomData.room[0].descriptionShort.GuestMin} - ${this
        .roomData.room[0].descriptionShort.GuestMax}`;
      if (this.roomData.room[0].descriptionShort.GuestMax === 1) {
        people = '1';
      }
      return people;
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
      .info-title {
        width: 100%;
      }
      .info-short {
        display: flex;
        flex-wrap: wrap;
        &>:nth-child(-n+3) {
          margin: 0 1.6rem 0 0;
        }
        img {
          vertical-align: middle;
        }
      }
      .info-short, .body-description, .info-body, .info-amenities{
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

@media (max-width: 768px) {
  .info-amenities ul li {
    width: 33%;
  }
  .room-content {
    .info-title {
      flex-direction: column;
    }
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
