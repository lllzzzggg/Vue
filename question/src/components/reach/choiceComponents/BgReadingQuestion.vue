<template>
  <div class="bg-question">
    <div class="radio" @click="playRadio()">
      <btn-speak :is-playing="isPlaying && play"></btn-speak>
    </div>
    <div class="question-content">{{ question }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import BtnSpeak from '../common/BtnSpeak'

export default {
  name: 'BgReadingQuestion',
  props: {
    question: String,
    classUrl: String,
    play: Boolean
  },
  components: {
    BtnSpeak
  },
  mounted () {
    this.playRadio()
  },
  data () {
    return {
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
  computed: {
    ...mapState(['stopChoiceAudio']),
    ...mapGetters(['getQuestionData'])
  },
  methods: {
    ...mapActions(['playAudio']),
    playRadio () {
      this.$emit('stopAudio', true)
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
  width: 4.87rem;
  height: 1.15rem;
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
.question-content{
  position: absolute;
  top: 50%;
  transform: translate(0,-50%);
  margin-left: .6rem;

  width: 4.09rem;
  // height: 1.02rem;
  font-size: @fontSize;
  line-height: .36rem;
  text-align: left;
  font-family: @fontFamily;
  font-weight: 500;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow:hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.radio{
  position: absolute;
  top: .2rem;
  left: -.1rem;

  // width: 0.8rem;
  // height: 0.8rem;
  // background: url(../../../assets/images/reach/radio.png) no-repeat;
  // background-size: 100%;
}
</style>
