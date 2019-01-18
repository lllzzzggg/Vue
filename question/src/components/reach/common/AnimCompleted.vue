<template>
  <div>
    <div class="bg"></div>
    <div class="guang" :class="{ 'rotateGuang': guangAnim }"></div>
    <div class="complete" :class="{
      anim: play
    }">
      <div class="star">
        <img class="stars-img"
             v-for="n in num"
             :key="n"
             :src="[ n <= score ? require('../../../assets/images/reach/anim/star.png') : require('../../../assets/images/reach/anim/star-gray.png')]"/>
      </div>
      <p class="complete-text">{{ completeText }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { originUrl, end } from '../../../utils/audios.js'

export default {
  props: {
    animation: [ Boolean ],
    score: [ Number ]
  },
  data () {
    return {
      play: false,
      num: 5,
      guangAnim: false
    }
  },
  computed: {
    hostUrl () {
      return originUrl
    },
    completeText () {
      let textCom = ''
      switch (this.score) {
        case 0:
          textCom = 'Don\'t give up!'
          break
        case 1:
          textCom = 'Keep trying!'
          break
        case 2:
          textCom = 'Keep trying!'
          break
        case 3:
          textCom = 'Good job'
          break
        case 4:
          textCom = 'Excellent!'
          break
        case 5:
          textCom = 'Perfect!'
          break
        default:
          textCom = 'Don\'t give up!'
      }
      return textCom
    }
  },
  watch: {
    animation (n) {
      if (n) {
        this.play = true
        this.guangAnim = true
        this.playRadio(end)
      } else {
        this.play = false
        this.guangAnim = false
      }
    }
  },
  methods: {
    ...mapActions(['playAudio']),
    playRadio (audio) {
      this.play = true
      this.playAudio({
        audioUrl: `${this.hostUrl}${audio}`,
        cb: () => {
          this.play = false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../../style/reach/keyframes.less';

.bg{
  width: 100%;
  height: 100%;
  background: #000;
  // opacity: 0.7;
  position: absolute;
  top: 0rem;
  left: 0rem;
}
.guang{
  position: absolute;
  top: 7%;
  left: 19%;

  width: 6rem;
  height: 6rem;
  background: url('../../../assets/images/reach/anim/guang.png');
  background-size: 100% 100%;
}
.complete{
  width: 3.16rem;
  height: 2.17rem;
  position: absolute;
  top: 33%;
  left: 34%;

  background: url('../../../assets/images/reach/anim/bg-complete.png');
  background-size: 100% 100%;

  .complete-text{
    margin: 1.63rem auto 0 auto;
    color: #fff;
    font-size: .3rem;
    font-weight: 500;
    // -webkit-text-stroke-width: .01rem;
    // -webkit-text-stroke-color: red;
  }
}
.star{
  position: relative;
  margin: .9rem 0 0 -.5rem;
}
.stars-img{
  position: absolute;
  width: .53rem;
  height: .55rem;
}
.loop(@index) when (@index < 3) {
  .loop(@index + 1);
  .stars-img:nth-of-type(@{index}) {
      top: @index * -.52rem;
      left: @index * .6rem;
  }
}
.loop(@index) when (@index = 3) {
  .loop(@index + 1);
  .stars-img:nth-of-type(@{index}) {
      top: @index * -.45rem;
      left: @index * .6rem;
  }
}
.loop(@index) when (@index <= 5) and (@index > 3) {
  .loop(@index + 1);
  .stars-img:nth-of-type(@{index}) {
      top: (@index - 6) * .52rem;
      left: @index * .6rem;
  }
}
.loop(1);

.anim{
  animation: starShow .8s;
}
.rotateGuang{
  animation: rotate 2.5s linear;
  animation-iteration-count: infinite;
}
</style>
