<!--  -->
<template>
  <div class="btn-wrapper" @click="anim">
      <div class="btn btn-check"></div>
      <div class="shadow-circle" v-show="isActive" :class="{'active': isActive}"></div>
  </div>
</template>

<script>
export default {
  props: {
    isActive: [ Boolean ]
  },
  data () {
    return {
    }
  },
  methods: {
    anim () {
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
.btn-wrapper {
  .wh(0.8rem, 0.8rem);
  position: relative;
  .btn-check {
    .wh(0.5rem, 0.5rem);
    .ap(0.15rem, 0.15rem);
    background-image: url("../../../assets/images/reach/check.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }

  .shadow-circle {
    .wh(0.5rem, 0.5rem);
    .ap(0.15rem, 0.15rem);
    border: 1px solid #FFD300;
    border-radius: 50%;
    box-shadow: 0 0 0.06rem #FFD300;

    &.active {
      animation: shadow-animate 1s linear infinite;
    }
  }
}

@keyframes shadow-animate {
  0% {
    transform: scale(1, 1);
    opacity: 1;
  }
  100% {
    transform: scale(1.4, 1.4);
    opacity: 0;
  }
}
</style>
