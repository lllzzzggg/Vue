<template>
  <div class="choice">
    <ChoiceBgQuestion class="size-question" :content="question" :classUrl="classUrl"></ChoiceBgQuestion>
    <ChoiceBgImage :imgUrl=" imgUrl + lookUrl" :type="false"></ChoiceBgImage>
     <div class="selects-size">
      <SelectLookMany
          :selectOptions="selectOptions"
          :rightArr="rightArr"
      >
      </SelectLookMany>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ChoiceBgQuestion from '../choiceComponents/ChoiceBgQuestion'
import ChoiceBgImage from '../choiceComponents/ChoiceBgImage'
import SelectLookMany from '../choiceComponents/SelectLookMany'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLookMany',
  components: {
    ChoiceBgQuestion,
    ChoiceBgImage,
    SelectLookMany
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
.selects-size{
  margin-top: -.1rem;
}
</style>
