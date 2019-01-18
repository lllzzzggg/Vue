<template>
  <div class="bg-question">
      <p class="learn-words">{{ content[0] }}</p>
      <div class="bg-question-text" v-html="content[1]"></div>
      <div class="radio" @click="playRadio">
        <btn-speak style="margin:0 auto;" :is-playing="isPlaying"></btn-speak>
      </div>
  </div>
</template>
<script>
import choiceAudio from './mixins/choiceAudio'

export default {
  name: 'BgLearnWords',
  props: {
    content: Array,
    classUrl: String
  },
  mixins: [ choiceAudio ]
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.bg-question{
  margin: 0 auto;
  position: relative;
  width: 8.14rem;
  height: 1.9rem;
  background: #835AA0;
  border-radius: @borderWidth * 6;
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
    border-radius: @borderWidth * 6;
    z-index: -1;
  }
}
.learn-words{
  margin: 0 auto;
  margin-top: .1rem;
  height: .4rem;

  color: #F4F5F5;
  font-size: .35rem;
  line-height: .4rem;
  text-align: center;
  font-weight:500;
  // -webkit-text-stroke: .015rem #2ad4f3;
  // color: #2ad4f3;
}
.bg-question-text{
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  // margin: auto;

  line-height: .36rem;
  text-align: left;
  width: 6.76rem;
  // height: 1.08rem;
  color:#F4F5F5;
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
  top: 2.3rem;
  left: 50%;
  transform: translateX(-50%);

  // width: 0.75rem;
  // height: 0.75rem;
}
</style>
