<template>
  <div class="bg-question">
    <img class="reading-img" :src="imgUrl"/>
    <p class="reading-title">{{ readingText.title }}</p>
    <div class="radio" @click="playRadio()">
      <btn-speak :is-playing="isPlaying && !play"></btn-speak>
    </div>
    <div class="reading-content">{{ readingText.content }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import BtnSpeak from '../common/BtnSpeak'

export default {
  name: 'BgReading',
  props: {
    readingText: Object,
    imgUrl: String,
    classUrl: String,
    play: Boolean
  },
  components: {
    BtnSpeak
  },
  data () {
    return {
      startY: 0,
      moveY: 0,
      isPlaying: false
    }
  },
  watch: {
    stopChoiceAudio (n) {
      if (n) {
        this.isPlaying = false
      }
    }
  },
  mounted () {
    if (window.navigator.userAgent.indexOf('OS X') >= 0) {
      const scrollSize = document.querySelector('.reading-content')
      scrollSize.addEventListener('touchstart', (e) => {
        this.startY = e.targetTouches[0].pageY
        e.preventDefault()
      }, { passive: false })

      scrollSize.addEventListener('touchmove', (e) => {
        this.moveY = e.touches[0].pageY
        if (this.startY - this.moveY > 10) {
          scrollSize.scrollTop += 5
        } else if (this.moveY - this.startY > 10) {
          scrollSize.scrollTop -= 5
        }
        e.preventDefault()
      }, { passive: false })

      scrollSize.addEventListener('touchleave', (e) => {
        this.startY = 0
        this.moveY = 0
        console.log('leave')
        e.preventDefault()
      }, { passive: false })
    }
  },
  computed: {
    ...mapState(['stopChoiceAudio']),
    ...mapGetters(['getQuestionData'])
  },
  methods: {
    ...mapActions(['playAudio', 'stopChoiceAudios']),
    playRadio () {
      this.$emit('stopAudio', false)
      this.isPlaying = true
      this.playAudio({
        audioUrl: `${this.classUrl}/audio/${this.getQuestionData.readAudio}`,
        cb: () => {
          this.isPlaying = false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.bg-question{
  margin: 0 auto;
  position: relative;
  width: 4.35rem;
  height: 5.6rem;
  background: #835AA0;
  border-radius: @borderWidth * 5;
  padding: 0.02rem;
  box-sizing: border-box;

  &:after{
    content: '';
    position: absolute;
    top: -.05rem;
    left: -.05rem;
    bottom: -.05rem;
    right: -.05rem;
    background: linear-gradient(45deg,#58e6ff, #4076ff, #8d69d5, #58e6ff);
    border-radius: @borderWidth * 5;
    z-index: -1;
  }
}
.reading-img{
  width: 2.42rem;
  height: 1.59rem;
}
.reading-title{
  margin: 0 auto;
  width: 3.9rem;
  height: .3rem;
  text-align: center;
  font-family: @fontFamily;
  font-weight: 500;
  font-size: .29rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.reading-content{
  margin: .3rem auto 0 .63rem;
  width: 3.63rem;
  height: 3rem;

  line-height: .36rem;
  text-align: left;
  text-indent: .4rem;
  font-size: @fontSize;
  font-family: @fontFamily;
  font-weight: 500;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow-y:scroll;

  &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color: #986EB6;
  }
  &::-webkit-scrollbar { //滚动条的宽度
    width: .06rem;
  }
  &::-webkit-scrollbar-thumb {//滚动条的设置
    background-color: #5E2884;
  }
}
.radio{
  position: absolute;
  top: 2rem;
  left: .0rem;

  // width: 0.48rem;
  // height: 0.48rem;
  // background: url(../../../assets/images/reach/radio.png) no-repeat;
  // background-size: 100%;
}
</style>
