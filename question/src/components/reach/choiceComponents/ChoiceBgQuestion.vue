<template>
  <div class="bg-question">
      <div class="radio" @click="playRadio">
        <btn-speak :is-playing="isPlaying"></btn-speak>
      </div>
      <div class="bg-question-text">{{ content }}</div>
  </div>
</template>
<script>
import choiceAudio from './mixins/choiceAudio'

export default {
  name: 'ChoiceBgQuestion',
  props: {
    content: String,
    classUrl: String
  },
  mixins: [choiceAudio]
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.bg-question{
  margin: 0 auto;
  position: relative;
  width: 8.51rem;
  height: 1.2rem;
  background: #835AA0;
  border-radius: @borderWidth * 2;
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
    border-radius: @borderWidth * 2;
    z-index: -1;
  }
}
.bg-question-text{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  // margin: auto;

  line-height: .36rem;
  text-align: left;
  width: 6.17rem;
  // height: 1.08rem;
  font-size: @fontSize;
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
  left: .2rem;

  // width: 0.48rem;
  // height: 0.48rem;
  // background: url(../../../assets/images/reach/radio.png) no-repeat;
  // background-size: 100%;
}
</style>
