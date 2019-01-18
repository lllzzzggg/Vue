<!--  -->
<template>
  <div class="drag-groove">
    <div v-if="grooveType.indexOf('area') === -1" class="groove-center" :class="'center-' + grooves.length">
      <p class="center-text">{{ center.center }}</p>
    </div>
    <div v-if="grooveType.indexOf('area') === -1" class="groove-list" :class="'center-' + grooves.length">
      <template v-if="grooves.length < 6">
          <groove-item
            v-for="(item, index) in grooves"
            :key="index"
            :type="type"
            :pre-url="preUrl"
            :grooveType="grooveType"
            :ref="'groove' + index"
            :class="'groove-item' + index"
            :groove-content="item"></groove-item>
      </template>
      <template v-if="grooves.length >= 6">
        <groove-item-small
            v-for="(item, index) in grooves"
            :key="index"
            :type="type"
            :pre-url="preUrl"
            :grooveType="grooveType"
            :ref="'groove' + index"
            :class="'groove-item' + index"
            :groove-content="item">
        </groove-item-small>
      </template>
    </div>
    <div v-if="grooveType.indexOf('area') !== -1" class="groove-center center-both">
      <div class="groove-left">
        <p class="groove-title">{{ center.left }}</p>
        <ul class="groove-items">
          <li class="groove-item"
              v-for="(item, index) in grooveLeft"
              :ref="'groove' + (grooveLeft.length * 2 - index - 1)"
              :name="'groove' + (grooveLeft.length * 2 - index - 1)"
              :key="index">
            {{ item.content }}
            <drag-item
              v-if="item.content !== ''"
              :content="item"
              :is-drag-area="true"
              :type="type"
              :pre-url="preUrl"
              :grooveType="grooveType"
              :disable-drag="true"
              :is-draged-in="true"></drag-item>
          </li>
        </ul>
      </div>
      <div class="groove-right">
        <p class="groove-title">{{ center.right }}</p>
        <ul class="groove-items">
          <li class="groove-item"
              v-for="(item, index) in grooveRight"
              :ref="'groove' + index"
              :name="'groove' + index"
              :key="index">
            <drag-item
              v-if="item.content !== ''"
              :content="item"
              :is-drag-area="true"
              :type="type"
              :pre-url="preUrl"
              :grooveType="grooveType"
              :disable-drag="true"
              :is-draged-in="true"></drag-item>
            <div v-if="grooveType === 'area-arrow'" class="arrow"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { originUrl, dragIn, wrong, oh, oh1, great } from '../../../utils/audios.js'
import GrooveItem from './GrooveItem'
import GrooveItemSmall from './GrooveItemSmall'
import DragItem from './DragItem'
export default {
  props: {
    type: [ String ],
    grooveType: [ String ],
    grooves: [ Array ],
    center: [ Object ],
    localDataKey: [ String ],
    preUrl: [ String ]
  },
  data () {
    return {
      mode: '',
      title: '',
      grooveLeft: [],
      grooveRight: [],
      groovePositions: [],
      blankGrooves: [],
      dragData: [],
      dragRef: null,
      rootFontSize: 0,
      space: 0,
      finishTime: 0
    }
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'localData', 'moduleScore', 'choiceSubmit']),
    ...mapGetters([
      'getMode',
      'updatePosition1',
      'getDrag1',
      'getDragedList1',
      'getDragType'
    ]),
    hostUrl () {
      return originUrl
    }
  },
  components: {
    GrooveItem,
    GrooveItemSmall,
    DragItem
  },
  methods: {
    ...mapActions(['setLocalData', 'playAudio', 'setModuleScore', 'changeModulePageIndex', 'setIsSubit']),
    isCollision (drag) {
      let curRef = null
      let [x, y] = drag.split(',')
      for (let i = 0; i < this.groovePositions.length; i++) {
        let [ ref, left, top ] = this.groovePositions[i].split('|')
        let dragIn = this.calcArea(x, y, { left, top })
        if (dragIn) {
          curRef = ref
          let len = 0
          let extra = 0
          if (this.grooveType !== '') {
            let children = Array.prototype.slice.call(this.$refs[ref][0].children, 0)
            len = children.filter(child => child.className !== 'arrow').length
          } else {
            let children = Array.prototype.slice.call(this.$refs[ref][0].$el.children, 0)
            len = children.length
            let isHasTip = children.filter(child => child.nodeName === 'P').length !== 0
            extra = isHasTip ? 1 : 0
          }
          if (len > extra) {
            curRef = null
          }
          break
        }
      }
      return curRef
    },
    calcArea (x, y, groove) {
      let { left, top } = groove
      let width = 0
      let height = 0
      if (this.grooveType !== '') {
        width = 3
        height = 0.8
      } else if (this.grooves.length >= 6) {
        width = 2
        height = 0.8
      } else {
        width = 2
        height = 1.5
      }
      return (x > (left - 100) && x <= +left + width * this.rootFontSize) && (y > (top - 100) && y <= +top + height * this.rootFontSize)
    },
    validateDrags () {
      // 验证拖拽正确与否
      let draged = Object.assign({}, this.getDragedList)
      let score = 100
      this.dragData = []
      for (let i = 0; i < this.blankGrooves.length; i++) {
        let groove = this.grooveType !== '' ? this.$refs['groove' + this.blankGrooves[i]][0] : this.$refs['groove' + this.blankGrooves[i]][0].$el
        let dragItem = this.grooveType !== '' ? (groove.children[0].className === 'arrow' ? groove.children[1] : groove.children[0]) : (groove.children[0].nodeName === 'P' ? groove.children[1] : groove.children[0])
        let target = dragItem.getAttribute('target').split(',')
        let targetName = dragItem.getAttribute('name')
        this.dragData.push({ drag: targetName, groove: this.blankGrooves[i] })
        if (target.indexOf(this.blankGrooves[i] + '') !== -1) {
          draged[targetName] = 2
        } else {
          draged[targetName] = 1
          score = 0 // 有错误的就是0分
        }
      }
      this.$store.commit('SET_DRAGED_LIST1', { dragedList1: draged })
      if (this.mode === 'preview') {
        setTimeout(() => {
          this.backToDragList() // 预习题错误的返回到list中
        }, 1000)
      } else {
        let audio = ''
        if (score === 0) {
          audio = oh1
        } else {
          audio = great
        }
        this.playAudio({
          audioUrl: `${this.hostUrl}${audio}`
        })
        this.setModuleScore({ score: score })
        this.setLocalData({
          localData: {
            ...this.localData,
            [this.localDataKey]: this.dragData
          }
        })
      }
    },
    backToDragList () {
      let draged = Object.assign({}, this.getDragedList1)
      let dragBackList = []
      let hasWrong = false
      for (let i = 0; i < this.blankGrooves.length; i++) {
        let groove = this.grooveType !== '' ? this.$refs['groove' + this.blankGrooves[i]][0] : this.$refs['groove' + this.blankGrooves[i]][0].$el
        let dragItem = this.grooveType !== '' ? (groove.children[0].className === 'arrow' ? groove.children[1] : groove.children[0]) : (groove.children[0].nodeName === 'P' ? groove.children[1] : groove.children[0])
        let targetName = dragItem.getAttribute('name')
        if (draged[targetName] === 1) {
          hasWrong = true
          delete draged[targetName]
          dragBackList.push(dragItem)
        }
      }
      if (hasWrong) {
        this.setIsSubit(false)
        this.finishTime++
      }
      if (dragBackList.length === 0 && this.mode === 'preview') { // 预习情况下已经全部拖拽正确
        // 计算得分并加入到模块总分中
        let score = this.getScore()
        this.setModuleScore({ score: score })
        // play great
        this.playAudio({
          audioUrl: `${this.hostUrl}${great}`
        })
        this.setLocalData({
          localData: {
            ...this.localData,
            [this.localDataKey]: this.dragData
          }
        })
      } else {
        // play try again
        this.playAudio({
          audioUrl: `${this.hostUrl}${oh}`
        })
      }
      this.$store.commit('SET_DRAGED_LIST1', { dragedList1: draged })
      this.$store.commit('SET_DRAG_BACK_LIST1', { dragBackList1: dragBackList })
    },
    getScore () {
      switch (this.finishTime) {
        case 0:
          return 100
        case 1:
          return 80
        case 2:
          return 70
        default:
          return 60
      }
    }
  },
  watch: {
    localData (n) {
      if (n[this.localDataKey]) {
        setTimeout(() => {
          this.changeModulePageIndex()
        }, 300)
      }
    },
    updatePosition1 (n, o) {
      this.dragRef = this.isCollision(n)
      let draged = Object.assign({}, this.getDragedList1)
      if (this.dragRef) {
        this.getDrag1.style.top = ''
        this.getDrag1.style.left = ''
        // this.getDrag1.style.width = '2rem'
        // this.getDrag1.style.height = '1.5rem'
        let groove = this.grooveType !== '' ? this.$refs[this.dragRef][0] : this.$refs[this.dragRef][0].$el
        groove.appendChild(this.getDrag1)
        draged[this.getDrag1.name] = 3
        this.$store.commit('SET_DRAGED_LIST1', { dragedList1: draged })
        this.$store.commit('SET_COLLISION1', { collision1: true })
        // play dragin
        this.playAudio({
          audioUrl: `${this.hostUrl}${dragIn}`
        })
      } else {
        if (draged[this.getDrag1.name]) {
          delete draged[this.getDrag1.name]
          this.$store.commit('SET_DRAGED_LIST1', { dragedList1: draged })
        }
        // play dragin
        this.playAudio({
          audioUrl: `${this.hostUrl}${wrong}`
        })
        this.$store.commit('SET_COLLISION1', { collision1: false })
      }
      // 验证是否拖拽完毕
      if (this.space === Object.keys(this.getDragedList1).length) {
        this.setIsSubit(true)
      } else {
        this.setIsSubit(false)
      }
    },
    choiceSubmit (n, o) {
      if (n) {
        this.validateDrags()
      }
    }
  },
  mounted () {
    this.rootFontSize = parseInt(document.childNodes[1].style.fontSize)
    setTimeout(() => {
      for (let key in this.$refs) {
        let groove = this.grooveType !== '' ? this.$refs[key][0] : this.$refs[key][0].$el
        let pos = groove.getBoundingClientRect()
        this.groovePositions.push(`${key}|${pos.x || pos.left}|${pos.y || pos.top}`)
      }
    }, 1200) // 随窗口变换的时间加200毫秒
    if (this.grooveType.indexOf('area') !== -1) {
      this.grooveRight = this.grooves.slice(0, this.grooves.length / 2)
      this.grooveLeft = this.grooves.reverse().slice(0, this.grooves.length / 2)
      this.grooves.reverse() // 不修改grooves数组
    }
  },
  created () {
    this.mode = this.getMode
    for (let i = 0; i < this.grooves.length; i++) {
      if (this.grooves[i].content === '') {
        this.space++
        this.blankGrooves.push(i)
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.drag-groove {
  .wh(100%, 100%);
  .groove-center {
    .wh(70%, 100%);
    margin: 0 auto;
    background-repeat: no-repeat;

    &.center-both {
      .groove-left {
        margin-right: 1rem;
      }
    }

    &.center-both .groove-left,
    &.center-both .groove-right {
      display: inline-block;
      .wh(3rem, 100%);
      vertical-align: top;

      .groove-title {
        .wh(3rem, 0.5rem);
        padding: 0;
        margin: 0.1rem auto;
        font-size: 0.28rem;
        font-weight: 700;
        border: 5px solid #ff9889;
        box-sizing: border-box;
        line-height: 0.4rem;
        background: #d2594e;
        color: #fff;
      }

      .groove-items {
        padding: 0;
        list-style: none;

        li {
          position: relative;
          .wh(3rem, 0.8rem);
          margin-top: 0.3rem;
          border: 5px dashed #fff;
          box-sizing: border-box;
          background: #fbd3a0;

          .arrow {
            .ap(0, -1rem);
            width: 1rem;
            height: 0.8rem;
            background-image: url("../../../assets/images/reach/arrow.png");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: 80% 80%;
          }
        }
      }
    }

    &.center-2 {
      background-image: url("../../../assets/images/reach/center-2.png");
      background-size: 40% 50%;
      background-position: 30% center;

      .center-text {
        .ap(37%, 29%);
        .center-text();
      }
    }

    &.center-3 {
      background-image: url("../../../assets/images/reach/center-3.png");
      background-size: 40% 50%;
      background-position: 49% center;

      .center-text {
        .ap(45%, 45%);
        .center-text();
      }
    }

    &.center-4 {
      background-image: url("../../../assets/images/reach/center-4.png");
      background-size: 40% 50%;
      background-position: center center;

      .center-text {
        .ap(38%, 40%);
        .center-text();
      }
    }

    &.center-5 {
      background-image: url("../../../assets/images/reach/center-5.png");
      background-size: 70% 50%;
      background-position: center 30%;

      .center-text {
        .ap(26%, 40%);
        .center-text();
      }
    }

    &.center-6 {
      background-image: url("../../../assets/images/reach/center-6.png");
      background-size: 50% 50%;
      background-position: center center;

      .center-text {
        .ap(38%, 40%);
        .center-text();
      }
    }
  }

  .groove-list {
    width: 0.05rem;
    height: 0.05rem;
    position: absolute;
    top: 50%;
    left: 50%;

    &.center-2 {
      .groove-item0 {
        .ap(-1.7rem, 0.5rem);
      }
      .groove-item1 {
        .ap(0.15rem, 0.5rem);
      }
    }

    &.center-3 {
      .groove-item0 {
        .ap(-1.7rem, 1.4rem);
      }

      .groove-item1 {
        .ap(0.2rem, 1.4rem);
      }

      .groove-item2 {
        .ap(-0.8rem, -3.4rem);
      }
    }

    &.center-4 {
      .groove-item0 {
        .ap(-1.7rem, 1.4rem);
      }

      .groove-item1 {
        .ap(0.2rem, 1.4rem);
      }

      .groove-item2 {
        .ap(0.2rem, -3.45rem);
      }

      .groove-item3 {
        .ap(-1.7rem, -3.45rem);
      }
    }

    &.center-5 {
      .groove-item0 {
        .ap(-1.7rem, 1.3rem);
      }

      .groove-item1 {
        .ap(0.45rem, 1.3rem);
      }

      .groove-item2 {
        .ap(0.45rem, -1.05rem);
      }

      .groove-item3 {
        .ap(0.45rem, -3.35rem);
      }

      .groove-item4 {
        .ap(-1.7rem, -3.45rem);
      }
    }

    &.center-6 {
      .groove-item0 {
        .ap(-1.5rem, 1.5rem);
      }

      .groove-item1 {
        .ap(-0.4rem, 1.5rem);
      }

      .groove-item2 {
        .ap(0.75rem, 1.5rem);
      }

      .groove-item3 {
        .ap(0.75rem, -3.5rem);
      }

      .groove-item4 {
        .ap(-0.35rem, -3.5rem);
      }

      .groove-item5 {
        .ap(-1.45rem, -3.5rem);
      }
    }
  }
}
</style>
