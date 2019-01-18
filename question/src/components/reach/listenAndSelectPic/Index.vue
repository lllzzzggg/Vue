<template>
  <div class="container">
    <!-- 题干部分 -->
    <subject-comp></subject-comp>
    <!-- 选项区域 -->
    <div class="option-area clearfix">
     <option-comp v-for="i in 5" :key="i">

     </option-comp>
    </div>
  </div>
</template>

<script>
import OptionComp from './OptionComp'
import SubjectComp from './SubjectComp'

export default {
  name: 'listenAndSelectPic',
  components: {
    SubjectComp,
    OptionComp
  }
}
</script>

<style lang="less" scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  .option-area {
    width: 9rem;
    margin: 0 auto;
  }
}
</style>
