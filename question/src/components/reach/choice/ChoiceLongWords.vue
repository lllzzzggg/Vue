<template>
  <div class="choice">
    <BgLongWordsQuestion
        class="size-question"
        :content="question"
        :classUrl="classUrl"
        :imgUrl=" imgUrl + lookUrl"
    >
    </BgLongWordsQuestion>
    <SelectLongWords  class="size-select"
      :selectOptions="selectOptions"
      :answer="answer"
    >
    </SelectLongWords>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BgLongWordsQuestion from '../choiceComponents/BgLongWordsQuestion'
import SelectLongWords from '../choiceComponents/SelectLongWords'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLongWords',
  components: {
    BgLongWordsQuestion,
    SelectLongWords
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.lookUrl = this.getQuestionData.lookUrl
    this.selectOptions = this.getQuestionData.selectOptions
    this.answer = this.getQuestionData.answer
  },
  data () {
    return {
      question: '',
      lookUrl: '',
      selectOptions: [],
      answer: ''
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.size-select{
  margin-top: .2rem;
}
</style>
