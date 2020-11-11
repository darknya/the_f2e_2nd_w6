<template>
  <div id="main">
    <Loading :active.sync="isLoading"></Loading>
    <Alert :active.sync="isAlert" :res-data.sync="bookingResData"></Alert>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Alert from '@/components/Alert.vue';

export default {
  components: {
    Footer,
    Alert,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    isAlert() {
      return this.$store.state.alert;
    },
    bookingResData() {
      return this.$store.state.bookingResData;
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/all.scss';
</style>
