<template>
  <div class="bg">
     <div class="toTerm" @click="gobackTo()"></div>
    <div v-show="completed" class="toReport" @click="goReport"></div>
    <div class="container">
      <ModuleImg class="module"
        v-for="(item, index) in lists"
        :key="item.moduleName"
        :content="item"
        :module-score="item.score"
        :indexProp="index"
        @click.native=" index <= moduleIndexCan && goQuestion(item.moduleName, index)"
      ></ModuleImg>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModuleImg from '../../components/reach/module/ModuleImg'

export default {
  name: 'modulePage',
  components: {
    ModuleImg
  },
  data () {
    return {
      module: 0,
      lists: []
    }
  },
  computed: {
    ...mapState(['moduleData', 'moduleIndex', 'moduleIndexCan', 'moduleScore', 'modulePageIndex', 'completed', 'moduleName', 'moduleCompleted'])
  },
  methods: {
    ...mapActions(['setLists', 'setModuleIndex', 'setMode', 'setGame', 'setModuleName', 'setModulePageIndex', 'setModuleAverage', 'setModuleCompleted', 'resetSaveData', 'resetModuleScore', 'resetLocalData']),
    goQuestion (module, index) {
      this.setModuleIndex({
        moduleIndex: index
      })
      this.setModuleName({
        moduleName: module
      })
      this.setModulePageIndex({
        modulePageIndex: {
          ['page_index_' + this.moduleIndex]: 0
        }
      })
      this.resetModuleScore({
        score: 0
      })
      this.setModuleCompleted(false)
      this.$router.push({
        name: 'reachQuestion'
      })
    },
    goReport () {
      this.$router.push({
        name: 'reachReport'
      })
    },
    gobackTo () {
      let url = localStorage.getItem('homePage')
      if (this.completed) {
        this.$router.push({
          name: 'reachReport'
        })
      } else {
        window.location.href = url
      }
    },
    getItemLength (arr) { // 去掉学单词不用统计分数的题型
      let len = arr.length
      for (let i = 0; i < arr.length; i++) {
        if (arr.type === 'LearnWord') {
          len--
        }
      }
      return len
    }
  },
  created () {
    this.lists = this.moduleData.lists
    for (let i = 0; i < this.lists.length; i++) {
      let item = this.lists[i]
      if (this.moduleScore[item.moduleName + '_score'] && this.moduleCompleted) {
        item.score = Math.round(this.moduleScore[item.moduleName + '_score'] / this.getItemLength(item.questionList))
      } else {
        item.score = 0
      }
      this.setModuleAverage({
        saveModule: {
          key: item.moduleName,
          value: item.score
        }
      })
    }
    this.setMode({
      mode: this.moduleData.mode || 'preview'
    })
    this.setGame({
      game: this.moduleData.game
    })
    this.setLists({
      lists: this.moduleData.lists
    })
    this.resetSaveData()// 重置保留的数据为[]
    this.resetLocalData()
  }
}
</script>

<style lang="less" scoped>
.bg{
  position: relative;
  width: 100%;
  height: 100%;
  background:  linear-gradient(#13002E, #321147);
  background-size: cover;

  .toReport{
    width: 1.52rem;
    height: .5rem;
    background: url('../../assets/images/reach/module/toReport.png') no-repeat;
    background-size: 1.52rem .5rem;

    position: absolute;
    bottom: .3rem;
    left: 5.12rem - .76rem;
  }

  .toTerm{
    width: .6rem;
    height: .6rem;
    background: url('../../assets/images/reach/home/btn.png') no-repeat;
    background-size: .6rem .6rem;

    position: absolute;
    top: .2rem;
    left: .2rem;
    z-index: 3;

    &:hover {
      cursor: pointer;
    }
  }

  .container {
    width: 10.24rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .module {
      display: inline-block;
      margin: .3rem .5rem .1rem;
      width: 2rem;
      height: 2rem;

      &.current {
        background: #09bb07;
      }
    }
  }
}

</style>
