<template>
  <div class="slideshow-container">
    <div class="slides fade" v-for="(item, index) in src" :key="index"
      :class="{hidden: active !== index}">
      <img :src="item">
    </div>
    <div class="prev" @click="changeImg(active - 1)">&#10094;</div>
    <div class="next" @click="changeImg(active + 1)">&#10095;</div>
    <div class="dots">
      <span class="dot" v-for="(item, index) in src" :key="index"
        :class="{active: index == active}" @click="changeImg(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SlideShow',
  props: ['src'],
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    changeImg(index) {
      this.active = (index + this.src.length) % this.src.length;
    },
  },
};
</script>

<style lang="scss">
  .slideshow-container {
    box-sizing: border-box;
    position: relative;
    margin: auto;
  }
  .hidden {
    display: none;
  }
  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    font-size: 2rem;
    padding: 0 10px;
    transition: .6s ease;
    user-select: none;
    &:hover {
      background: rgb(255, 255, 255);
    }
  }
  .next {
    right: 0;
  }
  .dots {
    position: absolute;
    bottom: 3px;
    right: 50%;
    transform: translateX(50%);
    .dot {
      cursor: pointer;
      width: .6rem;
      height: .6rem;
      margin: 0 .8rem;
      background-color: #aaa;
      border-radius: 50%;
      display: inline-block;
      transition: background .6s ease;
    }
    .active, .dot:hover {
      background: #888;
    }
    .fade {
      animation: 1.5s fade;
    }
    @keyframes fade {
      from {opacity: .4;}
      to {opacity: 1;}
    }
  }
</style>
