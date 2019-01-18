<template>
  <div class="bg">
    <div class="content">
      <span class="btn-goBack" @click="goBackTo()"></span>
      <p class="title">Lesson{{ lessonCover.lesson }} {{ modeType }}</p>
      <div class="show">
        <div class="left">
          <Stars class="left-star" :starNum="starsNum"></Stars>
          <div class="left-text" >
            <p>掌握程度 ：{{ level }}</p>
            <p>所用时长 ：{{ times }}分钟</p>
            <p>最终成绩 ：{{ score }}</p>
            <p>薄弱环节 ：{{ weakness }}</p>
          </div>
          <p class="left-btn" @click="goModule()">Try Again</p>
        </div>
        <div class="right">
          <p class="explain" @click="popShow()">简介说明</p>
          <div class="right-chart">
            <ChartDadar
              :moduleName="moduleName"
              :moduleScore="moduleScore"
            ></ChartDadar>
          </div>
          <p v-show="allStudent" class="right-text">已有{{ complete }}名学生完成本次预习，其中最高得分{{ topScore }}</p>
        </div>
      </div>
    </div>
    <Popup style="position: absolute;"
           :content="lessonCover"
            v-show="pop"
            @popClose="popShow()"
    ></Popup>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Stars from '@/components/reach/home/Stars'
import ChartDadar from '@/components/reach/home/ChartDadar'
import Popup from '@/components/reach/home/Popup'
import { goBack } from '@/utils/'

export default {
  name: 'reportPage',
  components: {
    Stars,
    Popup,
    ChartDadar
  },
  data () {
    return {
      score: 0,
      mode: '',
      endTime: '',
      complete: 123,
      topScore: 100,
      allStudent: false,
      pop: false,
      moduleName: [],
      moduleScore: []
    }
  },
  created () {
    this.moduleName = this.arrMap(this.moduleAverage, 'key')
    this.moduleScore = this.arrMap(this.moduleAverage, 'value')
    this.moduleScore.forEach((item) => {
      this.score += item
    })
    this.score = (this.score / this.moduleScore.length).toFixed(1)
    this.endTime = new Date().getTime()
  },
  computed: {
    ...mapState(['lessonCover', 'moduleAverage']),
    starsNum () {
      return Math.round(this.score / 100 * 5)
    },
    modeType () {
      let name
      if (this.mode === 'preview') {
        name = 'Playthrough'
      } else {
        name = 'Checkpoint'
      }
      return name
    },
    level () {
      let levelText = ''
      if (this.starsNum <= 2) {
        levelText = '待提高'
      } else if (this.starsNum === 3) {
        levelText = '中等'
      } else if (this.starsNum === 4) {
        levelText = '优秀'
      } else if (this.starsNum === 5) {
        levelText = '完美'
      }
      return levelText
    },
    times () {
      let times = 0
      if (this.lessonCover.startTime && this.lessonCover.startTime.getTime()) {
        times = Math.floor((this.endTime - this.lessonCover.startTime.getTime()) / (1000 * 60))
      }
      return times
    },
    weakness () {
      let a = new Array(...this.moduleScore)
      let min = a.sort()[0]
      let minName = []
      if (min < 60) {
        for (let i = 0; i < this.moduleAverage.length; ++i) {
          if (this.moduleAverage[i].value === min) {
            minName.push(this.moduleAverage[i].key)
          }
        }
      } else {
        minName = ['无']
      }
      return minName.join(',')
    }
  },
  methods: {
    ...mapActions(['setModuleCompleted']),
    popShow () {
      this.pop = !this.pop
    },
    arrMap (arr, key) {
      const newArr = arr.map((item) => {
        return item[key]
      })
      return newArr
    },
    goModule () {
      this.setModuleCompleted(false)
      this.$router.push({
        name: 'reachModule'
      })
    },
    goBackTo () {
      goBack()
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(180deg,#3F009A, #AB3BF0);
}
.content{
  width: 10.24rem;
  height: 7.68rem;
  margin: 0 auto;
  position: relative;

   .title{
    width: auto;
    height: .28rem;
    color: #FFFFFF;
    font-size: .3rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;

    position: absolute;
    top: .1rem;
    left: 1.21rem;
  }

  .show{
    width: 8.82rem;
    height: 6.19rem;
    background: url('../../assets/images/reach/home/bg.png') no-repeat;
    background-size: 100% 100%;

    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);

    .left{
      margin-top: .5rem;
      display: inline-block;
      width: 2.7rem;
      height: 5.37rem;
      vertical-align: middle;
    }
    .right{
      margin: .8rem 0 0 .3rem;
      display: inline-block;
      width: 4.92rem;
      height: 3.69rem;
      font-size: .24rem;
      color: #3C2E14;
      vertical-align: middle;
      background: url('../../assets/images/reach/home/bg_right.png') no-repeat;
      background-size: 100% 100%;
      position: relative;
    }
  }
}
.left-star{
  margin-top: 1rem;
}
.left-text{
  width: 2.3rem;
  height: 2.14rem;
  color: #826944;
  text-align: center;
  font-size: .22rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  margin: .6rem auto 0;
}
  .left-text > p{
    margin: .09rem auto;
    text-align: left;
  }
.left-btn{
  margin: 0 auto;
  width: 1.82rem;
  height: .64rem;
  background: url('../../assets/images/reach/home/button.png') no-repeat;
  background-size: 100% 100%;

  font-size: .24rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: #FFFFFF;
  line-height: .57rem;
}
.explain{
  width: .8rem;
  height: .35rem;
  color: #F9F1D1;
  font-size: .18rem;
  text-align: right;
  line-height: .35rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  background: url('../../assets/images/reach/home/explain.png') no-repeat;
  background-size: 100% 100%;

  position: absolute;
  top: -.7rem;
  right: -.23rem;
}
.right-chart{
  height: 3.69rem;
}
.right-text{
  font-size: .17rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;

  margin: 0 auto;
}
.btn-goBack{
  display: block;
  width: .6rem;
  height: .6rem;
  background: url('../../assets/images/reach/home/btn.png') no-repeat;
  background-size: 100% 100%;

  position: absolute;
  top: .3rem;
  left: .4rem;
}
</style>
