<template>
  <div class="bg-question">
      <img class="longwords-img" :src="imgUrl"/>
      <div class="radio" @click="playRadio">
        <btn-speak :is-playing="isPlaying"></btn-speak>
      </div>
      <div class="bg-question-text">{{ content }}</div>
  </div>
</template>
<script>
import choiceAudio from './mixins/choiceAudio'

export default {
  name: 'BgLongWordsQuestion',
  props: {
    content: String,
    imgUrl: String,
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
  width: 9.38rem;
  height: 2.33rem;
  background: #835AA0;
  border-radius: @borderWidth * 7;
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
    border-radius: @borderWidth * 7;
    z-index: -1;
  }
}
.longwords-img{
  width: 2.94rem;
  height: 1.91rem;

  position: absolute;
  top: 50%;
  left: .2rem;
  transform: translateY(-50%);
}
.bg-question-text{
  margin: 0 auto;
  position: absolute;
  top: 50%;
  right: .44rem;
  transform: translateY(-50%);
  // margin: auto;

  line-height: .36rem;
  text-align: left;
  width: 5.01rem;
  // height: 1.08rem;
  font-size: @fontSize;
  font-family: @fontFamily;
  font-weight: 500;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow:hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
.radio{
  position: absolute;
  top: 50%;
  left: 3.1rem;
  transform: translateY(-50%);
}
</style>
