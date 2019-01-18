<!--  -->
<template>
  <div class="title-content">
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: [ String ]
  },
  data () {
    return {}
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.title-content {
  .wh(100%, 1.28rem);
  padding-top: 0.78rem;
  box-sizing: content-box;

  .title {
    .wh(70%, 100%);
    padding: 0.08rem 0.16rem;
    margin: 0 15%;
    border: 0.03rem solid #ff9e8d;
    border-radius: 0.05rem;
    text-align: left;
    line-height: 1;
    font-size: 0.32rem;
    font-weight: 700;
    box-sizing: border-box;
    background-color: #c46053;
    color: #ffffff;
  }
}
</style>
