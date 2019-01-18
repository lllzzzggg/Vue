<template>
    <div class="btn-size"
        :class="isSubmit ? 'submit' : 'unsubmit'"
        >
    </div>
</template>
<script>
export default {
  name: 'BtnSubmit',
  props: {
    isSubmit: Boolean
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/base.less';
.btn-size{
  // width: 1.15rem;
  // height: .52rem;
  // position: absolute;
  // left: 50%;
  // transform:  translateX(-50%);
  // margin-top: .1rem;

  // width: .69rem;
  // height: .69rem;
  // position: fixed;
  // bottom: 0.24rem;
  // right: .3rem;
  // z-index: 9;
  display: none;
}
.submit{
  background: url(../../../assets/images/reach/submit.png) no-repeat;
  // background: url("@{image-path}icon_right.png") no-repeat;
  background-size: 100%;
}
.unsubmit{
  // background: url("@{image-path}icon_right.png") no-repeat;
  background: url(../../../assets/images/reach/unsubmit.png) no-repeat;
  background-size: 100%;
}
</style>
