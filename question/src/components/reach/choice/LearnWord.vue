<template>
  <div>
    <ChoiceBgImage :imgUrl="imgUrl + lookUrl" :type="true"></ChoiceBgImage>
    <BgLearnWords class="position-words" :content="word" :classUrl="classUrl"></BgLearnWords>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ChoiceBgImage from '../choiceComponents/ChoiceBgImage'
import BgLearnWords from '../choiceComponents/BgLearnWords'
import choiceMount from './mixins/choiceMount'

export default {
  name: 'ChoiceLook',
  components: {
    ChoiceBgImage,
    BgLearnWords
  },
  mixins: [choiceMount],
  created () {
    this.audio = this.getQuestionData.audio
    this.word = this.getQuestionData.word
    this.lookUrl = this.getQuestionData.lookUrl
  },
  mounted () {
    this.changeModulePageIndex()
  },
  data () {
    return {
      word: [],
      lookUrl: ''
    }
  },
  computed: {
    ...mapGetters(['getQuestionData'])
  },
  methods: {
    ...mapActions(['setSaveData', 'playAudio', 'changeModulePageIndex'])
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';

.position-words{
  margin-top: .2rem;
}
</style>
