<template>
  <div class="choice">
    <div class="reading-left">
      <BgReading
        :readingText="readingText"
        :imgUrl=" imgUrl + lookUrl"
        :classUrl="classUrl"
        :play="plays"
        :stopAudio="stop"
      >
      </BgReading>
    </div>
    <div class="reading-right">
      <BgReadingQuestion
        :question="question"
        :play="plays"
        :classUrl="classUrl"
        :stopAudio="stop"
      >
      </BgReadingQuestion>
      <SelectReading class="size-selects"
        :selectOptions="selectOptions"
        :answer="answer"
      >
      </SelectReading>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BgReading from '../choiceComponents/BgReading'
import BgReadingQuestion from '../choiceComponents/BgReadingQuestion'
import SelectReading from '../choiceComponents/SelectReading'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceReading',
  components: {
    BgReading,
    SelectReading,
    BgReadingQuestion
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.readingText = this.getQuestionData.readingText
    this.lookUrl = this.getQuestionData.lookUrl
    this.selectOptions = this.getQuestionData.selectOptions
    this.answer = this.getQuestionData.answer
  },
  data () {
    return {
      readingText: {},
      question: '',
      lookUrl: '',
      selectOptions: [],
      answer: '',
      plays: true
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  },
  methods: {
    stop (a) {
      alert(a)
      this.plays = a
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
