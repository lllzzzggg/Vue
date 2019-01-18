<!--  -->
<template>
  <div class="drag-groove-area">
    <ul class="drag-groove-old" v-if="grooves.length > 0 && grooves.length <= 6" :class="{'drag-groove-old-small': isSingle}">
      <li v-for="(item, index) in grooves" :key="index" class="groove-area">
        <div v-if="(index!==0)" class="arrow" :class="{'arrow-img': resource === 'img', 'arrow-text': resource === 'text'}"></div>
        <div class="groove-item" :class="{'groove-item-img': resource === 'img', 'groove-item-text': resource === 'text', 'active': activeIndex === index}" :ref="'groove' + index">
          <drag-item-old
            :class="{'drag-groove-item-img': resource === 'img', 'drag-groove-item-text': resource === 'text'}"
            v-if="item !== ''"
            :resource="resource"
            :disable-drag="true"
            :pre-url="preUrl"
            :content="item"
            :type="type" >
          </drag-item-old>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import DragItemOld from './DragItemOld'
import { originUrl, dragIn, wrong, oh, oh1, great, _req } from '../../../utils/audios.js'
export default {
  props: {
    grooves: [ Array ],
    resource: [ String ],
    dragNum: [ Number ],
    localDataKey: [ String ],
    preUrl: [ String ],
    readword: [ Array ],
    audioNames: [ Array ]
  },
  components: {
    DragItemOld
  },
  data () {
    return {
      type: 'img',
      mode: '',
      groovePositions: [],
      blankGrooves: [],
      dragRef: null,
      rootFontSize: 0,
      space: 0,
      dragStatus: 3,
      activeIndex: 100,
      finishTime: 0
    }
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'moduleScore', 'localData', 'choiceSubmit']),
    ...mapGetters([
      'updatePosition',
      'getDrag',
      'getMode',
      'getDragedList'
    ]),
    isSingle () {
      return this.grooves.length <= 4
    },
    hostUrl () {
      return originUrl.split('Demo_test')[0]
    }
  },
  methods: {
    // 验证碰撞
    ...mapActions(['setLocalData', 'playAudio', 'setModuleScore', 'changeModulePageIndex', 'setIsSubit']),
    isCollision (drag) {
      let curRef = null
      let [x, y] = drag.split(',')
      for (let i = 0; i < this.groovePositions.length; i++) {
        let [ ref, left, top ] = this.groovePositions[i].split('|')
        let dragIn = this.calcArea(x, y, { left, top })
        if (dragIn) {
          curRef = ref
          let len = this.$refs[ref][0].children.length
          if (len !== 0) {
            curRef = null
          }
          break
        }
      }
      return curRef
    },
    calcArea (x, y, groove) {
      let { left, top } = groove
      let xRate = 1.2
      let yRate = 1.5
      if (this.resource === 'img') {
        xRate = 1.2
        yRate = 1.5
      } else {
        xRate = 3
        yRate = 0.8
      }
      return (x > left && x <= +left + xRate * this.rootFontSize) && (y > top && y <= +top + yRate * this.rootFontSize)
    },
    validateDrags () {
      // 验证拖拽正确与否
      let draged = Object.assign({}, this.getDragedList)
      for (let i = 0; i < this.blankGrooves.length; i++) {
        let groove = this.$refs['groove' + this.blankGrooves[i]][0]
        let dragItem = groove.children[0]
        let target = dragItem.getAttribute('target')
        let targetName = dragItem.getAttribute('name')
        if (+target === +this.blankGrooves[i]) {
          draged[targetName] = 2
        } else {
          draged[targetName] = 1
        }
      }
      this.$store.commit('SET_DRAGED_LIST', { dragedList: draged })
      setTimeout(() => {
        if (this.mode === 'preview') {
          this.backToDragList() // 错误的返回到list中
        } else {
          this.moveToRightGroove() // 错误的跳到正确的位置
        }
      }, 1000)
    },
    backToDragList () {
      let draged = Object.assign({}, this.getDragedList)
      let dragBackList = []
      for (let i = 0; i < this.blankGrooves.length; i++) {
        let groove = this.$refs['groove' + this.blankGrooves[i]][0]
        let dragItem = groove.children[0]
        let targetName = dragItem.getAttribute('name')
        if (draged[targetName] === 1) {
          delete draged[targetName]
          dragBackList.push(dragItem)
        }
      }
      if (dragBackList.length === 0) { // 预习情况下已经全部拖拽正确
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
            [this.localDataKey]: true
          }
        })
      } else {
        // play try again
        this.setIsSubit(false)
        this.playAudio({
          audioUrl: `${this.hostUrl}${oh}`
        })
      }
      this.$store.commit('SET_DRAGED_LIST', { dragedList: draged })
      this.$store.commit('SET_DRAG_BACK_LIST', { dragBackList: dragBackList })
    },
    moveToRightGroove () {
      let draged = Object.assign({}, this.getDragedList)
      let score = 100
      for (let i = 0; i < this.blankGrooves.length; i++) {
        let groove = this.$refs['groove' + this.blankGrooves[i]][0]
        let dragItem = groove.children[0]
        let targetName = dragItem.getAttribute('name')
        let target = dragItem.getAttribute('target')
        if (draged[targetName] === 1) {
          score = 0
          let [left, top] = this.getRightGroovePosition(this.blankGrooves[i], target)
          dragItem.style.left = (left - 2) + 'px'
          dragItem.style.top = (top - 2) + 'px'
          dragItem.style.transition = 'all .3s ease-in-out'
          draged[targetName] = 2
          setTimeout(() => {
            dragItem.style.left = '-2px'
            dragItem.style.top = '-2px'
            dragItem.style.transition = 'transform .2s'
            this.$refs['groove' + target][0].appendChild(dragItem)
          }, 1000)
        }
      }
      let audio = ''
      if (score === 0) {
        audio = oh1
      } else {
        audio = great
      }
      this.playAudio({
        audioUrl: `${this.hostUrl}${audio}`
      })
      setTimeout(() => {
        this.setModuleScore({ score: score })
        this.$store.commit('SET_DRAGED_LIST', { dragedList: draged })
        this.setLocalData({
          localData: {
            ...this.localData,
            [this.localDataKey]: true
          }
        })
        if (this.readword.length !== 0) {
          this.anim()
        }
      }, 1000)
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
    },
    anim () {
      let index = 0
      let len = 500
      for (let i = 0; i <= this.readword.length; i++) {
        setTimeout(() => {
          if (index >= this.grooves.length) {
            this.activeIndex = 100
          } else {
            this.playAudio({
              audioUrl: `${this.preUrl}/audio/Drag_${i}.mp3?_req=${_req}`
            })
            this.activeIndex = index
            index++
          }
        }, len)
        len += this.readword[i] * 1000
      }
    },
    getRightGroovePosition (curr, target) {
      let currGroove, targetGroove
      for (let i = 0; i < this.groovePositions.length; i++) {
        let [ ref, left, top ] = this.groovePositions[i].split('|')
        if (ref.indexOf(curr) !== -1) {
          currGroove = [left, top]
        }
        if (ref.indexOf(target) !== -1) {
          targetGroove = [left, top]
        }
      }
      return [targetGroove[0] - currGroove[0], targetGroove[1] - currGroove[1]]
    },
    clear () {
      for (let key in this.$refs) {
        this.$refs[key][0].style.background = '#2b0e55'
      }
    }
  },
  mounted () {
    this.rootFontSize = parseInt(document.childNodes[1].style.fontSize)
    setTimeout(() => {
      for (let key in this.$refs) {
        let pos = this.$refs[key][0].getBoundingClientRect()
        this.groovePositions.push(`${key}|${pos.x || pos.left}|${pos.y || pos.top}`)
      }
    }, 1200)
  },
  created () {
    this.mode = this.getMode
    for (let i = 0; i < this.grooves.length; i++) {
      if (this.grooves[i] === '') {
        this.space++
        this.blankGrooves.push(i)
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
    updatePosition (n, o) {
      this.clear()
      this.dragRef = this.isCollision(n)
      let draged = Object.assign({}, this.getDragedList)
      if (this.dragRef) {
        this.getDrag.style.top = '-2px'
        this.getDrag.style.left = '-2px'
        if (this.resource === 'img') {
          this.getDrag.style.width = '1.2rem'
          this.getDrag.style.height = '1.5rem'
        } else {
          this.getDrag.style.width = '3rem'
          this.getDrag.style.height = '0.8rem'
        }
        this.getDrag.style.transform = 'scale(1, 1)'
        this.getDrag.style['-webkit-transform'] = 'scale(1, 1)'
        this.$refs[this.dragRef][0].appendChild(this.getDrag)
        draged[this.getDrag.name] = 3
        this.$store.commit('SET_DRAGED_LIST', { dragedList: draged })
        this.$store.commit('SET_COLLISION', { collision: true })
        // play dragin
        this.playAudio({
          audioUrl: `${this.hostUrl}${dragIn}`
        })
      } else {
        if (draged[this.getDrag.name]) {
          delete draged[this.getDrag.name]
          this.$store.commit('SET_DRAGED_LIST', { dragedList: draged })
        }
        // play dragin
        this.playAudio({
          audioUrl: `${this.hostUrl}${wrong}`
        })
        this.$store.commit('SET_COLLISION', { collision: false })
      }
      // 验证是否拖拽完毕
      if (this.space === Object.keys(this.getDragedList).length) {
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
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

@keyframes scaleAnimation {
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.2, 1.2);
  }
  100% {
    transform: scale(1, 1);
  }
}
.drag-groove-area {
  position: relative;
  .wh(80%, 4rem);
  margin: 0 auto;

  .drag-groove-old {
    .wh(100%, 100%);
    padding: 0;
    margin: 0 auto;

    &.drag-groove-old-small {
      position: absolute;
      top: 50%;
      height: 2rem;
      transform: translate(0, -50%);
    }
    .groove-area {
      display: inline-block;
      padding: 0.2rem 0;

      .arrow {
        display: inline-block;
        vertical-align: top;
        background-image: url("../../../assets/images/reach/left-arrow.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 0.5rem 0.5rem;

        &.arrow-img {
          .wh(0.8rem, 1.5rem);
        }
        &.arrow-text {
          .wh(0.8rem, 0.8rem);
        }
      }
      .groove-item {
        position: relative;
        display: inline-block;
        border: 2px dashed #fff;
        border-radius: 0.1rem;
        background: #2b0e55;

        &.groove-item-img {
          .wh(1.2rem, 1.5rem);
        }
        &.groove-item-text {
          .wh(3rem, 0.8rem);
        }
        &.active {
          animation: scaleAnimation 1s infinite;
        }
        .drag-groove-item-img {
          .wh(1.2rem, 1.5rem);
        }
        .drag-groove-item-text {
          .wh(3rem, 0.8rem);
        }
      }
    }
  }
}
</style>
