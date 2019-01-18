<template>
  <div class="btn-container" @click="anim">
    <div class="circle" v-show="stopAnim">
      <div class="wrapper right">
          <div ref="circle-right" class="circle-progress right-circle" :class="{'active': stopAnim}"></div>
      </div>
      <div class="wrapper left">
          <div ref="circle-left" class="circle-progress left-circle" :class="{'active': stopAnim}"></div>
      </div>
    </div>
    <div class="fill-circle" v-show="hasClicked && !stopAnim"></div>
    <div class="btn btn-record" :class="{'record': !stopAnim, 'stop': stopAnim}"></div>
  </div>
</template>

<script>
export default {
  props: {
    time: [ Number ],
    stopAnim: [ Boolean ],
    hasClicked: [ Boolean ]
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    anim () {
      this.$refs['circle-right'].style['animation-duration'] = this.time + 's'
      this.$refs['circle-right'].style['-webkit-animation-duration'] = this.time + 's'
      this.$refs['circle-left'].style['animation-duration'] = this.time + 's'
      this.$refs['circle-left'].style['-webkit-animation-duration'] = this.time + 's'
    }
  },
  watch: {
    stopAnim (n) {
      if (n) {
        this.$refs['circle-right'].style['animation-duration'] = this.time + 's'
        this.$refs['circle-right'].style['-webkit-animation-duration'] = this.time + 's'
        this.$refs['circle-left'].style['animation-duration'] = this.time + 's'
        this.$refs['circle-left'].style['-webkit-animation-duration'] = this.time + 's'
      }
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
.btn-container{
  .wh(0.8rem, 0.8rem);
  margin: 0 0.1rem;
  position: relative;
  .btn-record {
    .wh(0.8rem, 0.8rem);
    .ap(0, 0);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    z-index: 5;

    &.record {
      background-image: url("../../../assets/images/reach/record.png");
    }

    &.stop {
      background-image: url("../../../assets/images/reach/stop.png");
    }
  }
  .fill-circle {
    .wh(0.8rem, 0.8rem);
    .ap(0, 0);
    border: 0.05rem solid rgba(255, 211, 0, 0.8);
    border-radius: 50%;
    z-index: 10;
  }

  .circle {
    .wh(0.8rem, 0.8rem);
    .ap(0, 0);
    z-index: 10;

    .wrapper {
      .wh(0.4rem, 0.8rem);
      position: absolute;
      top: 0;
      overflow: hidden;

      &.right {
        right: 0;
      }
      &.left {
        left: 0;
      }

      .circle-progress {
        .wh(0.8rem, 0.8rem);
        border: 0.05rem solid transparent;
        border-radius: 50%;
        position: absolute;
        top: 0;
        transform: rotate(-135deg);
        transform-origin: center center;

        &.right-circle {
          border-top: 0.05rem solid rgba(255, 211, 0, 0.8);
          border-right: 0.05rem solid rgba(255, 211, 0, 0.8) ;
          right: 0;

          &.active{
            animation-name: circle-animation-right;
            animation-timing-function: linear;
            animation-iteration-count: 1;
          }
        }
        &.left-circle {
          border-bottom: 0.05rem solid rgba(255, 211, 0, 0.8);
          border-left: 0.05rem solid rgba(255, 211, 0, 0.8) ;
          left: 0;
          &.active {
            animation-name: circle-animation-left;
            animation-timing-function: linear;
            animation-iteration-count: 1;
          }
        }
      }

    }
  }
}

@keyframes circle-animation-right {
  0% {
    transform: rotate(-135deg)
  }
  50%,100%{
    transform: rotate(45deg)
  }
}
@keyframes circle-animation-left {
  0%,50% {
    transform: rotate(-135deg)
  }
  100%{
    transform: rotate(45deg)
  }
}

</style>
