<template>
  <div class="">
    <div class="longwords-layout"
        v-for="item in selectOptions"
        :key="item.key"
        @click="isClick && chose(item.key)"
    >
      <div class="select-look-content" >
        <p class="bg-select-text">{{ item.text }}</p>
      </div>
      <div class="select-look-border"
          :class="{
            hasChosed: chosedArr.indexOf(item.key) >= 0 && status === 0,
            answer_right: chosedArr.indexOf(item.key) >= 0 && rightArr.indexOf(item.key) >= 0 && status === 1 || status === 2 && rightArr.indexOf(item.key) >= 0,
            answer_wrong: chosedArr.indexOf(item.key) >= 0 && rightArr.indexOf(item.key) < 0 && status !== 0,
            animborder: chosedArr.indexOf(item.key) >= 0 && animStart
          }">
        <span class="icon_right" v-show="chosedArr.indexOf(item.key) >= 0 && rightArr.indexOf(item.key) >= 0 && status !== 0 "></span>
        <span class="icon_wrong" v-show="chosedArr.indexOf(item.key) >= 0 && rightArr.indexOf(item.key) < 0 && status !== 0 "></span>
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
import choiceMultiple from './mixins/choiceMultiple'

export default {
  name: 'SelectLook',
  components: {
    BtnSubmit
  },
  props: {
    rightArr: Array,
    selectOptions: Array
  },
  mixins: [choiceMultiple]
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
@import '../../../style/reach/choice/choice-longwords.less';
</style>
