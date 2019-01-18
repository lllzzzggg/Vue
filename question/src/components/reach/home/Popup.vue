<template>
  <div class="bg-pop">
    <div class="shadow"></div>
    <div class="popup">
      <p class="btn-close" @click="$emit('popClose')"></p>
      <div class="pop-content">
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
</template>

<script>
export default {
  name: 'popup',
  props: {
    content: [ Object ]
  },
  data () {
    return {
      isMore: false,
      introduceText: '',
      goalText: '',
      moreTitle: '',
      moreContent: '',
      startY: 0,
      moveY: 0
    }
  },
  created () {
    this.introduceText = this.content.introduceText
    this.goalText = this.content.goalText
  },
  methods: {
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
.bg-pop{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.shadow{
  width: 100%;
  height: 100%;
  background: #333333;
  opacity: 0.8;

  position: absolute;
  top: 0;
  left: 0;
}
.popup{
  width: 5.36rem;
  height: 4.98rem;
  background: url(../../../assets/images/reach/home/bg_pop.png) no-repeat;
  background-size: 100% 100%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.pop-content{
  width: 4.49rem;
  height: 2.85rem;
  margin: 1.6rem auto 0;
  color: #3C2E14;
  font-size: .24rem;
  font-family: PingFangSC-Semibold;
}
.box{
  width: 4.62rem;
  height: 1.3rem;
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
    -webkit-line-clamp: 3;
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
    // font-weight: 600;
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
    // font-weight: 600;
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
.moreShow{
  width: 4.49rem;
  height: 2.65rem;
  margin: 0 auto;
  position: relative;
  // background: #f00;

  .moreTitle{
    text-align: left;
    margin: .32rem 0 0 .1rem;
  }

  .moreContent{
    height: 2.65rem;
    margin: 0 0 0 .1rem;
    text-align: left;
    text-overflow: ellipsis;
    overflow-y: scroll;

    &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
      background-color: #FFFFFF;
    }
    &::-webkit-scrollbar { //滚动条的宽度
      width: .03rem;
    }
    &::-webkit-scrollbar-thumb {//滚动条的设置
      background-color: #FF9D0E;
    }
  }
}
.btn-close{
  width: .64rem;
  height: .72rem;
  background: url(../../../assets/images/reach/home/close.png) no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-top: .5rem;
}
</style>
