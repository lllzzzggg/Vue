<template>
  <div class="choice">
    <ChoiceBgQuestion class="size-question" :content="question" :classUrl="classUrl"></ChoiceBgQuestion>
    <div class="selects-size">
      <SelectImgText
        :selectOptions="selectOptions"
        :answer="answer"
      >
      </SelectImgText>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceBgQuestion from '../choiceComponents/ChoiceBgQuestion'
import SelectImgText from '../choiceComponents/SelectImgText'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceImgText',
  components: {
    ChoiceBgQuestion,
    SelectImgText
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.selectOptions = this.getQuestionData.selectOptions
    this.answer = this.getQuestionData.answer
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  },
  data () {
    return {
      question: '',
      selectOptions: [],
      answer: ''
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
</style>
