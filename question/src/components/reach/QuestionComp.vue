<template>
  <div class="q-container">
    <div class="page-index">{{ pageIndex + 1 }} / {{ pageNum }}</div>
    <bg-comp></bg-comp>
      <div class="content" :class="{'pc-content': isWcr }">
        <transition name="fade-forward" v-if="direction === 'forward'">
          <component :is="currentQuestion.type" :key="pageIndex"></component>
        </transition>
        <transition name="fade-backward" v-if="direction === 'backward'">
          <component :is="currentQuestion.type" :key="pageIndex"></component>
        </transition>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BgComp from './common/BgComp'
import ListenAndSelectPic from './listenAndSelectPic/Index'
import Drag from './drag/Drag'
import DragOld from './drag/DragOld'
import Read from './read/Read'
import Speech from '@/components/reach/choice/Speech'
import LearnWord from '@/components/reach/choice/LearnWord'
import ChoiceLook from '@/components/reach/choice/ChoiceLook'
import ChoiceLookMany from '@/components/reach/choice/ChoiceLookMany'
import ChoiceImgText from '@/components/reach/choice/ChoiceImgText'
import ChoiceImgTextMany from '@/components/reach/choice/ChoiceImgTextMany'
import ChoiceReading from '@/components/reach/choice/ChoiceReading'
import ChoiceReadingMany from '@/components/reach/choice/ChoiceReadingMany'
import ChoiceImage from '@/components/reach/choice/ChoiceImage'
import ChoiceImageMany from '@/components/reach/choice/ChoiceImageMany'
import ChoiceLongWords from '@/components/reach/choice/ChoiceLongWords'
import ChoiceLongWordsMany from '@/components/reach/choice/ChoiceLongWordsMany'

export default {
  name: 'questionComp',
  data () {
    return {
      winWidth: {},
      direction: 'forward',
      pageNum: 0,
      isWcr: navigator.userAgent.indexOf('VIPX') > -1
    }
  },
  components: {
    BgComp,
    ListenAndSelectPic,
    Drag,
    DragOld,
    Read,
    Speech,
    LearnWord,
    ChoiceLook,
    ChoiceImage,
    ChoiceImgText,
    ChoiceReading,
    ChoiceLongWords,
    ChoiceLookMany,
    ChoiceImageMany,
    ChoiceImgTextMany,
    ChoiceReadingMany,
    ChoiceLongWordsMany
  },
  props: {
    currentQuestion: Object
  },
  beforeUpdate () {
    if (this.$store.state.prevPage <= this.$store.state.pageIndex) {
      this.direction = 'forward'
    } else {
      this.direction = 'backward'
    }
  },
  computed: {
    ...mapState(['pageIndex', 'moduleData', 'moduleIndex'])
  },
  mounted () {
    this.pageNum = this.moduleData.lists[this.moduleIndex].questionList.length
    const isWcr = navigator.userAgent.indexOf('VIPX') > -1
    if (isWcr) {
      // this.winWidth = 867
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/reach/base.less';

.fade-style();

.q-container {
  position: relative;
  text-align: center;
  .wh(100%, 100%);
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    .wh(100%, 100%);

    &.pc-content {
      width: 867px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .page-index {
    position: absolute;
    top: 0.1rem;
    right: 0.5rem;
    .wh(0.6rem, 0.4rem);
    font-size: 0.20rem;
    font-weight: 700;
    line-height: 0.4rem;
    color: #fff;
    z-index: 10;
  }
}

.fade-forward-enter {
  transform: translateX(1800px);
}
.fade-backward-enter {
  transform: translateX(-1800px);
}
.fade-forward-enter-active, .fade-backward-enter-active {
  transition: transform 1s linear;
}
</style>
