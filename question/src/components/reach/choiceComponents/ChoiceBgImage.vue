<template>
    <div class="bg-image"
        :class="[ type ? 'big-size' : '']"
    >
        <img class="image-content" :src="imgUrl"/>
        <div class="headset" v-show="type">
          <span class="left"></span>
          <span class="right"></span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ChoiceBgImage',
  props: {
    imgUrl: String,
    type: Boolean
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';
.bg-image{
  position: relative;
  margin: .1rem auto;
  width: 3.01rem;
  height: 2.08rem;
  border-radius: @borderWidth * 2;
  background: linear-gradient(90deg, #35368B , #692D83);
}
.image-content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  margin: 0 auto;
  width: 2.77rem;
  height: 1.83rem;
}
.big-size{
  width: 4.94rem;
  height: 3.41rem;
  margin-top: .77rem;
  border-radius: @borderWidth * 6;
  position: relative;

  .image-content{
    width: 4.46rem;
    height: 2.91rem;
  }

  .headset{
    width: 100%;
    height: 3.39rem;

    .left,.right{
      position: absolute;
      display: inline-block;
      width: 1.91rem;
      height: 3.39rem;
    }

    .left{
      top: 1rem;
      left: -1.91rem;
      background: url(../../../assets/images/reach/learn_left.png) no-repeat;
      background-size: 100%;
    }
    .right{
      top: 1rem;
      right: -1.91rem;
      background: url(../../../assets/images/reach/learn_right.png) no-repeat;
      background-size: 100%;
    }
  }
}
</style>
