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
            <input type="text" id="user-name" v-model="userInfo.name">
            <label for="user-phone">Phone</label>
            <input type="text" id="user-phone" v-model="userInfo.tel">
          </div>
          <div class="date">
            <vc-date-picker mode="range" :min-date="new Date()" v-model="pickDate" color="gray"
              :disabled-dates="roomData.booking.map((i) => i.date)"/>
            <span class="icon-date">
              <img src="" alt="">
            </span>
          </div>
        </form>
      </div>
      <div class="gurp">
      <div class="total-price">
        <p>total: $99,999</p>
      </div>
      <button class="btn" @click="postBookingRoom">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickDate: {},
      userInfo: {
        name: '',
        tel: '',
      },
    };
  },
  created() {
    this.getPickDate();
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
        name: this.userInfo.name,
        tel: this.userInfo.tel,
        date: this.$store.state.pickDateData.date,
        roomId: this.$store.state.pickDateData.roomId,
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
        width: 100%;
        padding: 50px 0;
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
