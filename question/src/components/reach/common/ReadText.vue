<!--  -->
<template>
  <div class="drag-title">
    <div class="btn-play" v-if="audio && audio !== ''" @click="play()"></div>
    <div class="text-container" v-if="texts && texts.length !== 0">
      <ul
        class="text-list"
        :class="{ 'audio-width': audio && audio !== ''}"
        :style="[{ width: 8* texts.length + 'rem' },{ left: scrollLeft }]"
        @touchstart.stop.prevent="touchstart"
        @mousedown="touchstart"
        @touchmove.stop.prevent="touchmove"
        @mousemove.stop.prevent="touchmove"
        @touchend="touchend"
        @mouseup="touchend">
        <li v-for="(text, index) in texts" :key="index">{{ text }}</li>
      </ul>
    </div>
    <p v-if="text && text !==''" :class="{ 'audio-width': audio && audio !== ''}">{{ text }}</p>
    <ul class="text-point" v-show="texts && texts.length > 1">
      <li v-for="(text, index) in texts" :key="index" :class="{ active: isActive === index}"></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    audio: [String],
    texts: [Array],
    text: [String],
    width: [String],
    readHeight: [String]
  },
  data () {
    return {
      isActive: 0,
      pageX: 0,
      moveX: 0,
      scrollLeft: 0
    }
  },
  methods: {
    play () {
      // play audio
      console.log('play audio: ' + this.audio)
    },
    touchstart (e) {
      this.pageX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
    },
    touchmove (e) {
      this.moveX = e.changedTouches ? e.changedTouches[0].pageX : e.pageX
    },
    touchend () {
      let distance = this.moveX - this.pageX
      if (distance > 0) {
        this.isActive--
        if (this.isActive <= 0) {
          this.isActive = 0
        }
      } else {
        this.isActive++
        if (this.isActive >= this.texts.length) {
          this.isActive = this.texts.length - 1
        }
      }

      this.scrollLeft = `-${this.isActive * 8}rem`
      this.$emit('changeIndex', this.isActive)
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.drag-title {
  position: relative;
  .wh(80%, 1.2rem);

  margin: 0 auto;
  font-size: 0.32rem;
  font-weight: 700;
  text-align: left;
  line-height: 1;
  border: 3px solid #311068;
  border-radius: 0.15rem;
  background: #835ba1;
  color: #fff;

  .btn-play {
    display: inline-block;
    .wh(10%, 100%);
    vertical-align: top;
    background-image: url("../../../assets/images/reach/play.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 0.5rem 0.5rem;
  }

  .text-container {
    position: relative;
    .wh(8rem, 100%);
    padding: 0.1rem;
    overflow: hidden;

    .text-list {
      display: inline-block;
      .ap(0, 0);
      .wh(8rem, 100%);
      padding: 0;
      margin: 0;
      list-style: none;
      transition: left .2s ease-in-out;

      &.audio-width {
        left: 10%;
        width: 90%;
      }

      li {
        float: left;
        padding: 0.1rem;
        .wh(8rem, 100%);
        box-sizing: border-box;
      }
    }
  }

  .text-point {
    position: absolute;
    bottom: 12%;
    left: 50%;
    min-width: 0.5rem;
    height: 0.1rem;
    padding: 0;
    margin: 0;
    list-style: none;
    transform: translate(-50%, 0);

    li {
      display: inline-block;
      .wh(0.1rem, 0.1rem);
      margin: 0.1rem;
      border-radius: 0.1rem;
      background: #fff;

      &.active {
        transform: scale(1.5, 1.5);
      }
    }
  }
  p {
    display: inline-block;
    position: absolute;
    top: 50%;
    margin: 0;
    padding: 0;
    width: 100%;
    transform: translate(0, -50%);

    &.audio-width {
      width: 90%;
    }
  }

  &:after {
    position: absolute;
    top: -0.05rem;
    left: -0.05rem;
    bottom: -0.05rem;
    right: -0.05rem;
    border-radius: 0.15rem;
    background: linear-gradient(45deg, #58e6ff, #4076ff, #8d69d5, #58e6ff);
    z-index: -1;
    content: "";
  }
}
</style>
