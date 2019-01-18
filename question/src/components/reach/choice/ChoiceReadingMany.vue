<template>
  <div class="choice">
    <div class="reading-left">
      <BgReading :readingText="readingText" :imgUrl=" imgUrl + lookUrl" :classUrl="classUrl"></BgReading>
    </div>
    <div class="reading-right">
      <BgReadingQuestion :question="question" :classUrl="classUrl"></BgReadingQuestion>
      <SelectReadingMany class="size-selects"
          :selectOptions="selectOptions"
          :rightArr="rightArr"
      >
      </SelectReadingMany>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BgReading from '../choiceComponents/BgReading'
import BgReadingQuestion from '../choiceComponents/BgReadingQuestion'
import SelectReadingMany from '../choiceComponents/SelectReadingMany'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceReading',
  components: {
    BgReading,
    SelectReadingMany,
    BgReadingQuestion
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.readingText = this.getQuestionData.readingText
    this.lookUrl = this.getQuestionData.lookUrl
    this.selectOptions = this.getQuestionData.selectOptions
    this.rightArr = this.getQuestionData.rightArr
  },
  data () {
    return {
      readingText: {},
      question: '',
      lookUrl: '',
      selectOptions: [],
      rightArr: []
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  },
  methods: {
    playRadio () {
      console.log('播放题干音频')
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.reading-left{
  width: 5.12rem;
  height: 5.89rem;

  float: left;
  margin-top: 0.63rem;
}
.reading-right{
  width: 5.12rem;

  float: left;
  // margin: 0 auto;
  margin-top: 0.63rem;
  margin-left: -.3rem;

  .size-selects{
    width: 4.79rem;
    height: 5rem;
    margin: 0 auto;
    margin-top: .3rem;
  }
}

</style>
