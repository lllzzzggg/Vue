<template>
  <div class="choice">
    <ChoiceBgQuestion class="size-question" :content="question" :classUrl="classUrl"></ChoiceBgQuestion>
    <div class="selects-size">
      <SelectImgTextMany
          :selectOptions="selectOptions"
          :rightArr="rightArr"
      >
      </SelectImgTextMany>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceBgQuestion from '../choiceComponents/ChoiceBgQuestion'
import SelectImgTextMany from '../choiceComponents/SelectImgTextMany'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLookMany',
  components: {
    ChoiceBgQuestion,
    SelectImgTextMany
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.selectOptions = this.getQuestionData.selectOptions
    this.rightArr = this.getQuestionData.rightArr
  },
  data () {
    return {
      question: '',
      selectOptions: [],
      rightArr: []
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
</style>
