<template>
  <div>
    <div class="selects-y"
      v-for="item in selectOptions"
      :key="item.key"
      @click="isClick && chose(item.key)"
    >
      <div class="select-look-content" >
        <p class="bg-select-text">{{ item.text }}</p>
      </div>
      <div class="select-look-border"
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
    <BtnSubmit class="btn-position"
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
  name: 'SelectReading',
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
@import '../../../style/reach/choice/choice-reading.less';
</style>
