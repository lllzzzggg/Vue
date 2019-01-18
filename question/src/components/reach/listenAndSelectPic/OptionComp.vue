<template>
  <div class="option">
        <div class="image"></div>
         <div class="wrong">
          <div class="error"></div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../style/reach/base.less';

.option {
      float: left;
      .wh(2.7rem, 1.8rem);
      margin-right: .26rem;
      margin-bottom: .26rem;
      border-radius: 10px;
      background: linear-gradient(to right bottom, #4B4B9B, #7F469A);
      // .image {
      //   position: absolute;
      //   top: 12px;
      //   left: 11px;
      //   .wh(250px, 175px);
      //   background: yellowgreen;
      // }
      // .correct {
      //   position: absolute;
      //   top: -5px;
      //   left: -5px;
      //   .wh(282px, 210px);
      //   border: 5px solid #00DE9E;
      //   border-radius: 15px;
      //   .right {
      //     position: absolute;
      //     top: -15px;
      //     left: -15px;
      //     z-index: 10;
      //     .wh(63px, 63px);
      //     background-image: url("@{image-path}right.png");
      //     background-repeat: no-repeat;
      //   }
      // }

      // .wrong {
      //   position: absolute;
      //   top: -5px;
      //   left: -5px;
      //   .wh(282px, 210px);
      //   border: 5px solid #FF0050;
      //   border-radius: 15px;
      //   .error {
      //     position: absolute;
      //     top: -15px;
      //     left: -15px;
      //     z-index: 10;
      //     .wh(63px, 63px);
      //     background-image: url("@{image-path}right.png");
      //     background-repeat: no-repeat;
      //   }
      // }

    }
</style>
