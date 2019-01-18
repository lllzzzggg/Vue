<template>
  <div>
    <div class="selects-layout"
        v-for="item in selectOptions"
        :key="item.key"
        @click="isClick && chose(item.key)"
    >
      <div class="bg-select">
          <span class="bg-select-white"></span>
          <img class="bg-select-img" :src='imgUrl + item.img'>
          <div class="bg-select-text">{{ item.text }}</div>
      </div>
      <div class="select-border"
          :class="{
            hasChosed: item.key === chosed && status === 0,
            answer_right: item.key === chosed && item.key === answer && status === 1 || status === 2 && item.key === answer,
            answer_wrong: item.key === chosed && item.key !== answer && status !== 0,
            animborder: item.key === chosed && animStart
            }">
          <span class="icon_right" v-show="item.key === chosed && item.key === answer && status !== 0"></span>
          <span class="icon_wrong" v-show="item.key === chosed && item.key !== answer && status !== 0"></span>
      </div>
    </div>
    <BtnSubmit
      :isSubmit="submitOK"
      @click.native=" submitOK && submit()"
    >
    </BtnSubmit>
  </div>
</template>
<script>
import BtnSubmit from '../choiceComponents/BtnSubmit'
import choiceSingle from './mixins/choiceSingle'

export default {
  name: 'SelectImgText',
  components: {
    BtnSubmit
  },
  props: {
    answer: String,
    selectOptions: Array
  },
  mixins: [choiceSingle]

}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
@import '../../../style/reach/choice/choice-imgText.less';
</style>
