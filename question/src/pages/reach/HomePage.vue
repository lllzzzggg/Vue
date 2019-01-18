<template>
  <div class="bg">
    <!-- <img :src="gifUrl"/> -->
    <div class="content">
      <span class="btn-goBack" @click="goBackTo()"></span>
      <p class="title">Lesson{{ lessonNum }} {{ modeType }}</p>
      <div class="show">
        <div class="left">
          <p class="left-title">{{ title }}</p>
          <img class="left-img" :src="img" />
          <p class="left-btn" @click="goModule()">Start</p>
        </div>
        <div class="right">
          <div class="box" v-show="!isMore">
            <div class="btn-more" @click="showMore(1)">
              <span class="more">more</span>
              <div class="triangle arrow">
                <div class="content"></div>
              </div>
            </div>
            <p class="more-title">Introduction</p>
            <p class="more-content">{{ introduceText }}</p>
          </div>

          <div class="box" v-show="!isMore">
            <div class="btn-more" @click="showMore(2)">
              <span class="more">more</span>
              <div class="triangle arrow">
                <div class="content"></div>
              </div>
            </div>
            <p class="more-title">Objectives</p>
            <p class="more-content">{{ goalText }}</p>
          </div>

          <div class="moreShow" v-show="isMore">
            <div class="btn" @click="showMore">
                <span class="more">fewer</span>
                 <div class="triangle arrow">
                  <div class="content"></div>
                </div>
              </div>
            <p class="moreTitle">{{ moreTitle }}</p>
            <p class="moreContent">{{ moreContent }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import moduleData from '../../utils/moduleData-review'
import { originUrl } from '@/utils/audios.js'
import { hiddenBtn, goBack } from '@/utils/'

export default {
  name: 'homePage',
  data () {
    return {
      isMore: false,
      mode: '',
      game: '',
      lessonNum: 0,
      title: '',
      img: '',
      gifUrl: require('../../assets/images/reach/home/reading.gif'),
      introduceText: '',
      goalText: '',
      moreTitle: '',
      moreContent: '',
      startY: 0,
      moveY: 0
    }
  },
  created () {
    const fileUrl = this.$route.query.fileUrl || ''
    localStorage.setItem('homePage', window.location.href)
    if (fileUrl !== '') {
      axios.get(fileUrl)
        .then(res => {
          if (res && res.data) {
            this.setModuleFile(res.data)
          }
        })
    } else {
      this.setModuleFile(moduleData)
      console.error('没有指定配置文件，请在url后面添加fileURL，指定正确的配置文件')
    }
    hiddenBtn()
  },
  computed: {
    imgUrl () {
      return `${originUrl}${this.game}/Cover/img/${this.img}`
    },
    modeType () {
      let name
      if (this.mode === 'preview') {
        name = 'Playthrough'
      } else {
        name = 'Checkpoint'
      }
      return name
    }
  },
  methods: {
    ...mapActions(['setCover', 'setModuleData', 'setGameName']),
    setModuleFile (moduleData) {
      this.setModuleData({
        moduleData: moduleData
      })
      const lessons = moduleData.game.substring(moduleData.game.length - 2)
      this.lessonNum = parseInt(lessons)
      this.title = moduleData.cover.title
      this.img = moduleData.cover.imgUrl
      this.introduceText = moduleData.cover.introduceText
      this.goalText = moduleData.cover.goalText
      this.gama = moduleData.game
      this.mode = moduleData.mode
      this.setCover({
        lesson: this.lessonNum,
        introduceText: this.introduceText,
        goalText: this.goalText,
        startTime: new Date()
      })
    },
    goModule () {
      this.$router.push({
        name: 'reachModule'
      })
    },
    goBackTo () {
      goBack()
    },
    showMore (e) {
      this.isMore = !this.isMore
      if (e === 1) {
        this.moreTitle = 'Introduction'
        this.moreContent = this.introduceText
      } else {
        this.moreTitle = 'Objectives'
        this.moreContent = this.goalText
      }
      this.moreRoll()
    },
    moreRoll () {
      if (window.navigator.userAgent.indexOf('OS X') >= 0 && this.isMore) {
        const scrollSize = document.querySelector('.moreContent')
        scrollSize.addEventListener('touchstart', (e) => {
          this.startY = e.targetTouches[0].pageY
          e.preventDefault()
        }, { passive: false })

        scrollSize.addEventListener('touchmove', (e) => {
          this.moveY = e.touches[0].pageY
          if (this.startY - this.moveY > 10) {
            scrollSize.scrollTop += 5
          } else if (this.moveY - this.startY > 10) {
            scrollSize.scrollTop -= 5
          }
          e.preventDefault()
        }, { passive: false })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg{
  width: 100%;
  height: 100%;
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
    background-size: 8.82rem 6.19rem;

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
      height: 4.29rem;
      font-size: .24rem;
      color: #3C2E14;
      vertical-align: middle;
      background: url('../../assets/images/reach/home/bg_right.png') no-repeat;
      background-size: 100% 100%;
    }
  }
}
.left-title{
  height: .23rem;
  font-size: .24rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: #3C2E14;
  line-height: .24rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  margin-top: 1rem;
}
.left-img{
  width: 2.22rem;
  height: 2.14rem;
  border-radius: .2rem;
}
.left-btn{
  margin: .46rem auto 0;
  width: 1.82rem;
  height: .64rem;
  background: url('../../assets/images/reach/home/button.png') no-repeat;
  background-size: 1.82rem .64rem;

  font-size: .34rem;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: #FFFFFF;
  line-height: .57rem;
}
.btn-goBack{
  display: block;
  width: .6rem;
  height: .6rem;
  background: url('../../assets/images/reach/home/btn.png') no-repeat;
  background-size: .6rem .6rem;

  position: absolute;
  top: .3rem;
  left: .4rem;
}
.moreShow{
  width: 4.62rem;
  height: 3.51rem;
  margin: 0 auto;
  position: relative;
  // background: #f00;

  .moreTitle{
    text-align: left;
    margin: .32rem 0 0 .1rem;
  }

  .moreContent{
    height: 3rem;
    margin: 0 0 0 .1rem;
    text-align: left;
    text-overflow: ellipsis;
    overflow-y: scroll;

    &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color: #E1D5A6;
    }
    &::-webkit-scrollbar { //滚动条的宽度
      width: .03rem;
    }
    &::-webkit-scrollbar-thumb {//滚动条的设置
      background-color: #F9F1D1;
    }
  }
}
.btn{
  width: 1rem;
  height: .3rem;
  position: absolute;
  top: 0rem;
  right: 0rem;

  .more{
    width: .6rem;
    height: .3rem;
    font-size: .24rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #E96A16;
    line-height: .3rem;
  }

  .arrow{
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-bottom: -.01rem;
    transform: rotate(180deg);
  }
}
.box{
  width: 4.62rem;
  height: 1.45rem;
  margin: 0rem auto;
  position: relative;

  .more-title{
    text-align: left;
    margin: .32rem 0 0 .1rem;
  }
  .more-content{
    margin: 0 0 0 .1rem;
    text-align: left;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    }
}
.btn-more{
  width: 1rem;
  height: .3rem;
  position: absolute;
  top: 0rem;
  right: 0rem;

  .more{
    width: .6rem;
    height: .3rem;
    font-size: .24rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #E96A16;
    line-height: .3rem;
  }

  .arrow{
    display: inline-block;
    width: .2rem;
    height: .2rem;
    margin-bottom: -.07rem;
  }
}

.triangle .content{
  width: .07rem;
  height: .07rem;
  border:#E96A16 solid;
  border-width: .03rem .03rem 0 0;
  transform: rotate(135deg);
  margin-bottom: .1rem;
  margin: 0 auto;
}
</style>
