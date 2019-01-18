<!--  -->
<template>
  <div class="sprite">
    <div class="sprite-ip" :class="{'active': isActive}"></div>
    <div class="num" :class="{ 'line-height-pc': isWcr }">{{ num }}</div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: [ Boolean ],
    num: [ Number ]
  },
  data () {
    return {
      isWcr: navigator.userAgent.indexOf('VIPX') > -1
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
.sprite {
  .ap(50%, 50%);
  .wh(0.64rem, 0.64rem);
  border-radius: 0.6rem;
  background-color: rgba(49, 17, 83, 1);
  transform: translate(-50%, -50%);

  .sprite-ip {
    .wh(0.79rem, 0.69rem);
    .ap(-0.03rem, -0.07rem);
    background-image: url('../../../assets/images/reach/sprite-ip.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;

    &.active {
      transform-origin: center 85%;
      animation-name: sprite-animation;
      animation-duration: 1.2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
  }

  .num {
    position: absolute;
    bottom: 0;
    right: 0;
    .wh(0.2rem, 0.2rem);
    border: 2px solid #fff;
    border-radius: 0.2rem;
    background-color: #ff0037;
    font-size: 0.12rem;
    font-weight: 700;
    text-align: center;
    line-height: 0.18rem;
    color: #fff;

    &.line-height-pc {
      line-height: 1.2;
    }
  }
}

@keyframes sprite-animation {
  0% {
    transform: rotate(0)
  }
  10% {
    transform: rotate(0)
  }
  20% {
    transform: rotate(5deg)
  }
  30% {
    transform: rotate(-5deg)
  }
  40% {
    transform: rotate(5deg)
  }
  50% {
    transform: rotate(-5deg)
  }
  60% {
    transform: rotate(5deg)
  }
  70% {
    transform: rotate(-5deg)
  }
  80% {
    transform: rotate(5deg)
  }
  90% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(0)
  }
}
</style>
