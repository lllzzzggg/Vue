<template>
  <div class="subject clearfix">
    <div class="icon">
      <audio-comp></audio-comp>
    </div>
    <div class="text">
      <p>
        standards for the erasure of digitaltrace of ofsensitive data from your computer.
      </p>
    </div>
  </div>
</template>

<script>
import AudioComp from '../common/AudioComp'

export default {
  name: 'subjectComp',
  components: {
    AudioComp
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/reach/base.less';

.subject {
    position: relative;
    .wh(8.9rem, 1.26rem);
    margin: .7rem auto .35rem;
    border: .05rem solid #4076FE;
    border-radius: 5px;
    background: #835AA1;
    .icon {
      float: left;
      .wh(.51rem, .51rem);
      margin: .37rem .27rem;
      // &.audio {
      //   background-image: url("@{image-path}radio.png");
      //   background-position: center;
      //   background-size: .51rem .51rem;
      // }
    }
    .text {
      position: relative;
      float: right;
      .wh(7.5rem, 1.1rem);
      p {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin: 0;
        .line-overflow(3);
        font-size: .32rem;
        color: #F4F5F5;
      }
    }
  }
</style>
