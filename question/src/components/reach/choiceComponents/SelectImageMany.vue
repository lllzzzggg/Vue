<template>
  <div>
    <div :class="[ selectOptions.length <= 4 ? 'images-layout' : 'images-layouts']"
        v-for="item in selectOptions"
        :key="item.key"
        @click="isClick && chose(item.key)"
    >
      <div class="bg-select">
          <img class="bg-select-img" :src='imgUrl + item.img'>
      </div>
      <div class="select-border"
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
  name: 'SelectImgText',
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
@import '../../../style/reach/choice/choice-image.less';

.images-layout{
  display: inline-block;
  margin: .2rem .7rem 0;
}
.images-layouts{
  display: inline-block;
  margin: .2rem .2rem 0;
}
</style>
