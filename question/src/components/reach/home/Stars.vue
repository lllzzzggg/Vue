<template>
  <div>
    <div class="stars">
      <img class="stars-img"
        v-for="n in num"
        :key="n"
       :src="[ n <= starNum ? require('../../../assets/images/reach/home/star.png') : require('../../../assets/images/reach/home/star_gray.png')]"/>
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
.stars-img{
  width: .48rem;
  height: .48rem;
}
</style>
