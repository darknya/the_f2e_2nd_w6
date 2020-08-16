<template>
  <div class="room-page">
    <div class="room-banner">
      <div class="room-logo"></div>
      <div class="carousel">
        <img src="https://picsum.photos/1200/800/?random=1">
        {{this.$route.params.roomID}}
      </div>
    </div>
    <div class="room-content">
      <div class="room-info">
        <h2 class="info-title">Lorem, ipsum dolor</h2>
        <span class="title-icon"></span>
        <div class="info-body">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Reprehenderit, aspernatur!
            Omnis ut natus laborum voluptate hic neque ipsa quibusdam,
            esse commodi magni ea et aut iusto qui fugit ab fuga?
          </p>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
        </div>
        <div class="info-footer"></div>
      </div>
      <div class="room-booking"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomData: this.$route.params.roomID,
    };
  },
  created() {
    // this.$route.params.roomID
  },
};
</script>
