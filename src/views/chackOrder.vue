<template>
  <div class="order-page">
    <div class="room-info" :style="{background: `no-repeat center / cover url(${roomImage})`}">
      <div class="title">
        <h2>{{roomData.room[0].name}}</h2>
      </div>
      <div class="info-short">
        <span class="guest">
          <img src="@/assets/icon_user.svg" alt="">
          {{roomData.room[0].descriptionShort.GuestMax}}
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
    </div>
    <div class="order-info">
      <div class="logo">
        <img src="@/assets/roompage_logo.svg" alt="">
      </div>
      <div class="title">
        <h2>Your Reservation</h2>
      </div>
      <div class="user-info">
        <form action="">
          <div class="user">
            <label for="user-name">Name</label>
            <input type="text" id="user-name" v-model="name">
            <label for="user-phone">Phone</label>
            <input type="text" id="user-phone" v-model="tel">
          </div>
          <div class="date">
            <vc-date-picker mode="range" v-model="pickDate" color="gray"
              :min-date="new Date(Math.floor(new Date()) + (1000*60*60*24))"
              :disabled-dates="roomData.booking.map((i) => i.date)"/>
            <span class="date-icon">
              <img src="@/assets/icon_calendar.svg" alt="">
            </span>
          </div>
        </form>
      </div>
      <div class="gurp">
      <div class="total-price">
        <p>total: ${{ (totalDayNight.weekday*roomData.room[0].normalDayPrice) +
              (totalDayNight.weekend*roomData.room[0].holidayPrice) }}</p>
      </div>
      <button class="btn" @click="postBookingRoom" :disabled="formValidation">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickDate: null,
      name: '',
      tel: '',
      telError: true,
    };
  },
  created() {
    this.getPickDate();
  },
  watch: {
    pickDate() {
      this.$store.dispatch('getTotalNight', this.pickDate);
    },
  },
  methods: {
    getPickDate() {
      this.pickDate = this.$store.state.pickDateRange;
    },
    setPickDate() {
      this.$store.dispatch();
    },
    postBookingRoom() {
      const vm = this;
      const data = {
        name: this.name,
        tel: this.tel,
        date: this.toDateArry,
        roomId: this.$route.params.roomID,
      };
      vm.$store.dispatch('bookingRoom', data);
      vm.$router.push('/');
    },
  },
  computed: {
    roomData() {
      return this.$store.state.roomData;
    },
    roomImage() {
      return this.$store.state.roomData.room[0].imageUrl[0];
    },
    totalDayNight() {
      return this.$store.state.totleNight;
    },
    toDateArry() {
      if (!this.pickDate) {
        return [];
      }
      const dateStart = this.pickDate.start;
      let totalNight = parseInt((this.pickDate.end - this.pickDate.start)
          / 1000 / 60 / 60 / 24, 10);
      if (Math.floor(this.pickDate.start) === Math.floor(this.pickDate.end)) totalNight = 1;
      const dateArry = [];
      for (let i = 0; i < totalNight; i += 1) {
        dateArry.push(new Date(dateStart.getTime() + (1000 * 60 * 60 * 24 * i) + (3600000 * 8))
          .toISOString().slice(0, 10));
      }
      return dateArry;
    },
    formValidation() {
      const RegStr = /^\s+|\s+$/g;
      const nameError = RegStr.test(this.name) || !this.name;
      const RegNum = /^\d+$/;
      const telError = !RegNum.test(this.tel);
      const pickDateError = !this.pickDate;
      return nameError || telError || pickDateError;
    },
  },
};
</script>

<style lang="scss">
  .order-page {
    display: flex;
    font-size: 1.5rem;
    .room-info {
      width: 45%;
      height: 100vh;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12% 0 3% 0;
    }

    .order-info {
      width: 55%;
      padding: 0 15%;
      text-align: center;
      .logo {
        margin: 15% 0;
      }
      .title {
        margin: 20% 0;
      }
      .user {
        text-align: start;
      }
      #user-phone, #user-name {
        display: block;
        width: 80%;
        border: none;
        border-bottom: 2px solid #495156;
        outline: none;
        font-size: 1rem;
        &:focus {
          border-bottom: 2px solid #000;
        }
      }
      .date {
        position: relative;
        width: 100%;
        margin: 50px 0;
        .date-icon {
          height: 100%;
          position: absolute;
          right: 0;
          bottom: 3px;
        }
        input {
          width: 100%;
          outline: none;
          border: none;
          border-bottom: 2px solid #495156;
          border-radius: 0;
          padding: 0;
          font-size: 1.2rem;
        }
      }
      .gurp {
        text-align: end;
      }
    }
  }

  @media (max-width: 768px) {
    .order-page {
      flex-direction: column;
      .room-info {
        width: 100%;
        height: 40vh;
      }
      .order-info {
        width: 100%;
      }
    }
  }
</style>
