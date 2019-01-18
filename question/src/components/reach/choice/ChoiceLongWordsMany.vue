<template>
  <div class="choice">
    <BgLongWordsQuestion
        class="size-question"
        :content="question"
        :classUrl="classUrl"
        :imgUrl=" imgUrl + lookUrl"
      >
    </BgLongWordsQuestion>
    <SelectLongWordsMany
      class="size-select"
      :selectOptions="selectOptions"
      :rightArr="rightArr"
    >
    </SelectLongWordsMany>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BgLongWordsQuestion from '../choiceComponents/BgLongWordsQuestion'
import SelectLongWordsMany from '../choiceComponents/SelectLongWordsMany'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLongWords',
  components: {
    BgLongWordsQuestion,
    SelectLongWordsMany
  },
  mixins: [choiceMount],
  created () {
    this.question = this.getQuestionData.question
    this.lookUrl = this.getQuestionData.lookUrl
    this.selectOptions = this.getQuestionData.selectOptions
    this.rightArr = this.getQuestionData.rightArr
  },
  data () {
    return {
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

.size-select{
  margin-top: .2rem;
}
</style>
