<!--  -->
<template>
  <div class="groove-item">
    <p v-if="grooveContent.tip !== ''" class="groove-tip">{{ grooveContent.tip }}</p>
    <drag-item v-if="grooveContent.content !== ''"
      :type="type"
      :grooveType="grooveType"
      :pre-url="preUrl"
      :is-tip="grooveContent.tip !== ''"
      :finish-status="grooveContent.finishStatus"
      :is-draged-in="true"
      :is-small="true"
      :disable-drag="true"
      :content="grooveContent"></drag-item>
  </div>
</template>

<script>
import DragItem from './DragItem'
export default {
  props: {
    type: [ String ],
    grooveType: [ String ],
    preUrl: [ String ],
    grooveContent: [ Object ],
    isSmall: [ Boolean ]
  },
  data () {
    return {
    }
  },
  components: {
    DragItem
  }
}

</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
.groove-item {
  width:  2rem;
  height: 0.8rem;
  background-color: #fff;
  border: 2px dashed #FF9E8D;
  border-radius: 5px;

  .groove-tip {
    .wh(1.8rem, 0.4rem);
    .ap(-0.4rem, 0.08rem);
    background-color: #FDE5B6;
    border-radius: 3px;
    font-size: 0.2rem;
    font-weight: 700;
    line-height: 0.4rem;
    text-align: center;
    color: #B76558;
    z-index: 1000;
  }
}
</style>
