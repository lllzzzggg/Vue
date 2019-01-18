<template>
  <div class="position">
    <div class="bg"></div>
    <div class="guang" :class="{ 'rotateGuang': guangAnim }"></div>
    <div :class="{
      excellent:  score === 1,
      good:  score === 2,
      tryagain:  score === 3,
      anim: play
    }"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { originUrl, excellent, goodJob, keepTrying } from '../../../utils/audios.js'

export default {
  props: {
    animation: [ Boolean ],
    score: [ Number ]
  },
  data () {
    return {
      play: false,
      guangAnim: false
    }
  },
  computed: {
    hostUrl () {
      return originUrl
    }
  },
  watch: {
    animation (n) {
      if (n) {
        this.play = true
        this.guangAnim = true
        if (this.score === 1) {
          this.playRadio(excellent)
        } else if (this.score === 2) {
          this.playRadio(goodJob)
        } else {
          this.playRadio(keepTrying)
        }
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
// @import '../../../style/reach/base.less';
@import '../../../style/reach/keyframes.less';

.bg{
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
  position: absolute;
  top: 0rem;
  left: 0rem;
  z-index: 50;
}
.guang{
  position: absolute;
  top: 7%;
  left: 19%;
  z-index: 51;

  width: 6rem;
  height: 6rem;
  background: url('../../../assets/images/reach/anim/guang.png');
  background-size: 100% 100%;
}
.excellent{
  position: absolute;
  top: 20%;
  left: 22%;
  z-index: 52;

  width: 5.85rem;
  height: 3.33rem;
  background: url('../../../assets/images/reach/anim/excellent.png');
  background-size: 100% 100%;
}
.good{
  position: absolute;
  top: 25%;
  left: 33%;
  z-index: 52;

  width: 3.47rem;
  height: 2.87rem;
  background: url('../../../assets/images/reach/anim/good.png');
  background-size: 100% 100%;
}
.tryagain{
  position: absolute;
  top: 25%;
  left: 33%;
  z-index: 52;

  width: 3.47rem;
  height: 2.88rem;
  background: url('../../../assets/images/reach/anim/tryagain.png');
  background-size: 100% 100%;
}
.anim{
  animation: starShow .8s;
}
.rotateGuang{
  animation: rotate 3s linear infinite;
}

</style>
