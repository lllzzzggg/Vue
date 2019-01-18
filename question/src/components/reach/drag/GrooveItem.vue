<!--  -->
<template>
  <div class="groove-item">
    <p v-if="type === 'text' && grooveContent.tip !== ''" class="groove-tip">{{ grooveContent.tip }}</p>
    <p v-if="type === 'img'" class="item-text">{{ grooveContent.tip }}</p>
    <drag-item v-if="grooveContent.content !== ''"
      :type="type"
      :grooveType="grooveType"
      :pre-url="preUrl"
      :is-tip="grooveContent.tip !== ''"
      :finish-status="grooveContent.finishStatus"
      :is-small="false"
      :is-draged-in="true"
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
    grooveContent: [ Object ]
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
  .wh(2rem, 1.5rem);
  width:  2rem;
  height: 1.5rem;
  background-color: #fff;
  border: 0.02rem dashed #FF9E8D;
  border-radius: 5px;
  position: relative;

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

  .item-text {
    width: 100%;
    height: 100%;
    color: #B76558;
    font-size: 0.28rem;
    line-height: 1.0;
    font-weight: 700;
    text-align: left;
    padding: 0.1rem;
    margin: 0;
  }
}
</style>
