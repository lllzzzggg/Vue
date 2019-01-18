<template>
    <div>
      <div class="module">
        <Stars class="module-stars" :starNum="4"></Stars>
        <img class="module-img" :src="muduleImg"/>
        <p class="module-text">{{ content.moduleName }}</p>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Stars from './Stars'

export default {
  name: 'module',
  components: {
    Stars
  },
  props: {
    content: Object,
    indexProp: Number
  },
  data () {
    return {
      lists: []
    }
  },
  computed: {
    ...mapState(['moduleIndex']),
    muduleImg () {
      const moduleImg = this.content.type
      if (this.indexProp <= this.moduleIndex) {
        return require(`../../../assets/images/reach/module/${moduleImg}.png`)
      } else {
        return require(`../../../assets/images/reach/module/gray/${moduleImg}.png`)
      }
    }
  },
  created () {
    // console.log(moduleData)
    // this.lists = moduleData.lists
    // this.setMode({
    //   mode: moduleData.mode
    // })
    // this.setLists({
    //   lists: moduleData.lists
    // })
  },
  methods: {
    ...mapActions(['setLists', 'setModuleIndex', 'setMode'])
  }
}
</script>

<style lang="less" scoped>
.module {
  width: 2rem;
  height: 2rem;
  position: relative;

  .module-stars{
    position: absolute;
  }
  .module-img{
    width: 1.45rem;
    height: 1.60rem;
  }

  .module-text{
    margin: 0 auto;
    height: .28rem;
    font-size: .2rem;
    color: #FFFFFF;
    font-family: PingFangSC-Regular;
    font-weight:400;
  }

  &.current {
    background: #09bb07;
  }
}
</style>
