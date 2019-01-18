<template>
    <div>
      <div class="module">
        <Stars class="module-stars" :starNum="starNum"></Stars>
        <img class="module-img" :src="muduleImg"/>
        <p class="module-text">{{ moduleName }}</p>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Stars from './Stars'

export default {
  name: 'moduleImg',
  components: {
    Stars
  },
  props: {
    content: Object,
    indexProp: Number,
    moduleScore: Number
  },
  data () {
    return {
      lists: [],
      starNum: 0
    }
  },
  computed: {
    ...mapState(['moduleIndexCan']),
    muduleImg () {
      if (this.content.type) {
        const moduleImg = this.content.type
        if (this.indexProp <= this.moduleIndexCan) {
          return require(`../../../assets/images/reach/module/${moduleImg}.png`)
        } else {
          return require(`../../../assets/images/reach/module/gray/${moduleImg}.png`)
        }
      } else {
        return require(`../../../assets/images/reach/module/gray/Learn.png`)
      }
    },
    moduleName () {
      return this.content.moduleName.replace(/_/g, ' ')
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
  mounted () {
    this.starNum = this.getScoreNumber()
  },
  methods: {
    ...mapActions(['setLists', 'setModuleIndex', 'setMode']),
    getScoreNumber () {
      if (this.moduleScore >= 90) {
        return 5
      } else if (this.moduleScore >= 80 && this.moduleScore < 90) {
        return 4
      } else if (this.moduleScore >= 60 && this.moduleScore < 80) {
        return 3
      } else if (this.moduleScore >= 40 && this.moduleScore < 60) {
        return 2
      } else if (this.moduleScore > 0 && this.moduleScore < 40) {
        return 1
      } else {
        return 0
      }
    }
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
