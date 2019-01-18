
<template>
  <div class="content-container drag">
    <drag-title :title="title"></drag-title>
    <div class="groove-content" :class="{ 'margin-b' : isWcr }">
      <drag-groove
        :groove-type="grooveType"
        :grooves="grooves"
        :center="center"
        :pre-url="preUrl"
        :local-data-key="localDataKey"
        :type="type"
      ></drag-groove>
    </div>
    <drag-list
      :drags="drags"
      :local-data-key="localDataKey"
      :is-small="grooves.length === 6"
      :pre-url="preUrl"
      :groove-type="grooveType"
      :type="type">
    </drag-list>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { originUrl, _req } from '../../../utils/audios'
import DragGroove from './DragGroove'
import DragList from './DragList'
import DragTitle from './DragTitle'
export default {
  data () {
    return {
      mode: '',
      drags: [],
      title: '',
      center: {},
      grooveType: '',
      type: '',
      grooves: [],
      isWcr: navigator.userAgent.indexOf('VIPX') > -1
    }
  },
  components: {
    DragTitle,
    DragGroove,
    DragList
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'localData']),
    ...mapGetters(['getQuestionData']),
    pageNum () {
      let len = this.drags.length
      return len % 4 === 0 ? Math.floor(len / 4) - 1 : Math.floor(len / 4)
    },
    localDataKey () {
      return `${this.game}_${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    preUrl () {
      return `${originUrl}${this.game}/${this.moduleName}/P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    }
  },
  methods: {
    ...mapActions(['getDrag1', 'setHasTip', 'updatePosition1', 'setCollision1', 'setKeyup1', 'setDragedList1', 'setDragBackList1', 'playAudio']),
    prev () {
      this.curr--
      if (this.curr <= 0) {
        this.curr = 0
      }
      this.scrollLeft = `-${this.curr * 6}rem`
    },

    next () {
      this.curr++
      if (this.curr > this.pageNum) {
        this.curr = this.pageNum
      }
      this.scrollLeft = `-${this.curr * 6}rem`
    }
  },
  watch: {
    pageIndex (n, o) {
      this.$nextTick()
    }
  },
  mounted () {
    if (!this.localData[this.localDataKey]) {
      setTimeout(() => {
        this.playAudio({
          audioUrl: `${this.preUrl}/audio/Audio_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}.mp3?_req=${_req}`
        })
      }, 1200)
    }
  },
  created () {
    let questionData = Object.assign({}, this.getQuestionData)
    this.type = questionData.type
    this.grooveType = questionData.grooveType
    this.grooves = questionData.grooves.slice(0)
    questionData.drags.map(item => {
      this.drags.push(Object.assign({}, item))
    })
    this.title = questionData.title.text
    this.center = questionData.title
    this.$store.commit('SET_DRAG_TYPE', { dragType: this.type })
    if (this.localData[this.localDataKey]) { // 存在说明已经做过这套题
      let data = this.localData[this.localDataKey]
      data.map((item, index) => {
        let dragIndex = +item.drag.replace('drag', '')
        let grooveIndex = item.groove
        this.grooves[grooveIndex].content = this.drags[dragIndex].content
        this.grooves[grooveIndex].finishStatus = this.drags[dragIndex].targets.indexOf(grooveIndex) !== -1 ? 2 : 1
        this.drags[dragIndex].content = ''
      })
    }
    let hasTip = false
    this.grooves.map(item => {
      if (this.grooveType === '' && item.tip !== '') {
        hasTip = true
      }
    })
    this.setHasTip({ hasTip: hasTip })
    if (this.type === '' || !(this.type === 'img' || this.type === 'text')) {
      console.error('拖拽模式text设置错误。')
    }
    if (this.grooves.length < 2 ||
    ((this.type === 'img' && this.grooves.length > 4) ||
    (this.type === 'text' && this.grooves.length > 6) ||
    (this.grooveType.indexOf('area') !== -1 && !(this.grooves.length === 4 || this.grooves.length === 6)))) {
      this.grooves = []
      console.error(this.grooveType.indexOf('area') !== -1 ? `区域拖拽槽只能有4个或者6个` : `${this.type}类型下拖拽槽最多只能有${this.type === 'img' ? 4 : 6}个。`)
    } else if (this.grooves.length === 0) {
      console.error('没有设置拖拽槽。')
    }
    if (this.drags.length === 0) {
      console.error('没有设置拖拽项。')
    }
    this.updatePosition1({ position1: '0,2' })
    this.setCollision1({ collision: false })
    this.setKeyup1({ keyup: false })
    this.setDragedList1({ dragedList1: [] })
    this.setDragBackList1({ dragBackList1: [] })
  }
}
</script>

<style lang='less' scoped>
@import "../../../style/reach/base.less";

.drag {
  .wh(100%, 100%);
  background-image: url("../../../assets/images/reach/drag_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .groove-content {
    position: relative;
    .wh(100%, 4rem);

    &.margin-b {
      margin-bottom: 0.9rem;
    }
  }
}
</style>
