<!--  -->
<template>
  <div class="btn-wrapper" @click="anim">
    <div class="btn">
      <div class="btn-speak"></div>
      <div class="btn-speak1" :class="{'active': activeIndex >= 1}"></div>
      <div class="btn-speak2" :class="{'active': activeIndex >= 2}"></div>
      <div class="btn-speak3" :class="{'active': activeIndex >= 3}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isPlaying: [ Boolean ]
  },
  data () {
    return {
      activeIndex: 4,
      timer: null
    }
  },
  methods: {
    anim () {
    }
  },
  watch: {
    isPlaying (n) {
      if (n) {
        this.timer = setInterval(() => {
          if (this.activeIndex < 3) {
            this.activeIndex++
          } else {
            this.activeIndex = 0
          }
        }, 200)
      } else {
        this.activeIndex = 4
        clearInterval(this.timer)
      }
    }
  }

}

</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
.btn-wrapper {
  .wh(0.8rem, 0.8rem);
  position: relative;

  .btn {
    .wh(0.6rem, 0.6rem);
    .ap(0.1rem, 0.1rem);
    background-image: url('../../../assets/images/reach/speak/speak-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .btn-speak {
      .wh(0.32rem, 0.32rem);
      .ap(0.15rem, 0.14rem);
      background-image: url('../../../assets/images/reach/speak/speak.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .btn-speak1 {
      .wh(0.32rem, 0.32rem);
      .ap(0.13rem, 0.14rem);
      background-image: url('../../../assets/images/reach/speak/speak-1.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      opacity: 0;

      &.active {
        opacity: 1;
        transition: opacity .2s ease-in-out;
      }
    }

    .btn-speak2 {
      .wh(0.32rem, 0.32rem);
      .ap(0.13rem, 0.14rem);
      background-image: url('../../../assets/images/reach/speak/speak-2.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      opacity: 0;
      &.active {
        opacity: 1;
        transition: opacity .2s ease-in-out;
      }
    }

    .btn-speak3 {
      .wh(0.32rem, 0.32rem);
      .ap(0.13rem, 0.14rem);
      background-image: url('../../../assets/images/reach/speak/speak-3.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      opacity: 0;
      &.active {
        opacity: 1;
        transition: opacity .2s ease-in-out;
      }
    }
  }
}

</style>
