<template>
  <div class="choice">
    <ChoiceBgQuestion class="size-question" :content="question" :classUrl="classUrl"></ChoiceBgQuestion>
    <ChoiceBgImage :imgUrl=" imgUrl + lookUrl" :type="false"></ChoiceBgImage>
    <div class="selects-size">
      <SelectLook
        :selectOptions="selectOptions"
        :answer="answer"
      >
      </SelectLook>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceBgQuestion from '../choiceComponents/ChoiceBgQuestion'
import ChoiceBgImage from '../choiceComponents/ChoiceBgImage'
import SelectLook from '../choiceComponents/SelectLook'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLook',
  components: {
    ChoiceBgQuestion,
    ChoiceBgImage,
    SelectLook
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
      answer: 'A'
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.selects-size{
  margin-top: -.1rem;
}
</style>
