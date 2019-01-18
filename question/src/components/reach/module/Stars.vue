<template>
    <div class="layout">
      <div class="star"
            v-for="n in num"
            :key="n"
      >
        <img class="stars-img" :src="[ n <= starNum ? require('../../../assets/images/reach/module/star.png') : require('../../../assets/images/reach/module/star-gray.png')]"/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'stars',
  props: {
    starNum: Number
  },
  data () {
    return {
      num: 5
    }
  }
}
</script>

<style lang="less" scoped>
.layout{
  width: 1.45rem;
  height: .52rem;
  position: relative;

  .star{
    position: absolute;
    margin-top: .15rem;
  }
  .loop(@index) when (@index <= 3) {
    .loop(@index + 1);
    .star:nth-of-type(@{index}) {
        top: @index * -.17rem;
        left: @index * .28rem;
    }
  }
  .loop(@index) when (@index <= 5) and (@index > 3) {
    .loop(@index + 1);
    .star:nth-of-type(@{index}) {
        top: (@index - 6) * .17rem;
        left: @index * .28rem;
    }
  }
  .loop(1);
}

.stars-img{
  width: .28rem;
  height: .28rem;
}
</style>
