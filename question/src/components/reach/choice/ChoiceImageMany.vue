<template>
  <div class="choice">
    <ChoiceBgQuestion class="size-question" :content="question" :classUrl="classUrl"></ChoiceBgQuestion>
    <div class="selects-size">
      <SelectImageMany
          :selectOptions="selectOptions"
          :rightArr="rightArr"
      >
      </SelectImageMany>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceBgQuestion from '../choiceComponents/ChoiceBgQuestion'
import SelectImageMany from '../choiceComponents/SelectImageMany'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'Choiceimage',
  components: {
    ChoiceBgQuestion,
    SelectImageMany
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.selectOptions = this.getQuestionData.selectOptions
    this.rightArr = this.getQuestionData.rightArr
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  },
  data () {
    return {
      question: '',
      selectOptions: [],
      rightArr: []
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
</style>
