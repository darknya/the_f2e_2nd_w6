<template>
  <div class="home">
    <div class="banner">
      <span class="banner-logo">
        <img src="@/assets/homepage_logo.svg" alt="">
      </span>
    </div>
    <div class="rooms">
      <router-link :to="{name: 'RoomPage', params: { roomID: room.id }}"
        class="room-card" v-for="(room) in rooms" :key="room.id">
        <img class="card-img" :src="room.imageUrl" alt="">
        <div class="card-title">{{room.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      this.$store.dispatch('getRooms');
    },
  },
  computed: {
    rooms() {
      return this.$store.state.rooms.items;
    },
  },
};
</script>

<style lang="scss">
.banner {
  width: 100%;
  height: 50vh;
  position: relative;
  background: bottom url('../assets/homepage_banner.svg');
  background-size: cover;
  .banner-logo {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 80%;
    img {
      width: 100%;
    }
  }
}
.rooms {
  display: flex;
  max-width: 1200px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
}
.room-card {
  position: relative;
  max-width: 25%;
  height: 300px;
  margin-bottom: 40px;
  &::after {
    content: '';
    position: absolute;
    height: 90%;
    left: 0;
    border-left: 8px solid rgba(0, 0, 0, 0.5);
  }
  .card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .card-title {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 10%;
    text-align: center;
    background: #FFF;
    padding-top: 10px;
    font-size: 1.1rem;
  }
  &:not(:nth-child(3n)) {
    margin-right: 80px;
  }
}
@media (max-width: 768px) {
  .room-card {
    max-width: 40%;
  }
  .room-card:not(:nth-child(3n)) {
    margin-right: 0;
  }
  .room-card:not(:nth-child(2n)) {
    margin-right: 10%;
  }
}

@media (max-width: 576px) {
  .room-card {
    max-width: 80%;
  }
  .room-card:not(:nth-child(2n)) {
    margin-right: 0;
  }
}
</style>
