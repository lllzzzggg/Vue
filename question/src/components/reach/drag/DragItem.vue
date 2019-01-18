<!--  -->
<template>
  <div class="drag-item"
    :class="{
            'item-small': isSmall && isDragedIn,
            'text': !isDragedIn && type === 'text' && !status,
            'img': !isDragedIn && type === 'img',
            'p-top': isTip,
            'draged-in': (!isSmall) && (grooveType === '' && ((isDragedIn && type === 'text') || (status && status !== 0))),
            'draged-in-small': isSmall && (grooveType === '' && ((isDragedIn && type === 'text') || (status && status !== 0))),
            'draged-in-area': grooveType !== '' && ((isDragedIn && type === 'text') || (status && status !== 0)),
            'draged-in-img': type === 'img' && (grooveType === '' && ((isDragedIn && type === 'img') || (status && status !== 0))),
            'drag-finish': status === 3,
            'drag-right': status === 2,
            'drag-wrong': status === 1,
            'drag-area': isDragArea}"
    :ref="'drag' + num"
    :name="'drag' + num"
    :target="content.targets"
    @mousedown.stop.prevent="mousedown"
    @mouseup.stop.prevent="mouseup"
    @touchstart.stop.prevent="mousedown"
    @touchmove.stop.prevent="mousemove"
    @touchend.stop.prevent="mouseup"
    @touchecancel.stop.prevent="mouseup">
    <div v-if="status === 2" class="drag-icon drag-right" :class="{ 'p-top': !hasTip, 'p-bottom': hasTip}"><i class="iconfont icon-check"></i></div>
    <div v-if="status=== 1" class="drag-icon drag-wrong" :class="{ 'p-top': !hasTip, 'p-bottom': hasTip}"><i class="iconfont icon-close"></i></div>
    <p v-if="type === 'text'">{{ content.content }}</p>
    <img v-if="type === 'img'" :src="imgUrl" alt="Drag Image">
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    isTip: [ Boolean ],
    isDragedIn: [ Boolean ],
    isSmall: [ Boolean ],
    isDragArea: [ Boolean ],
    content: [ Object ],
    parentName: [ String ],
    finishStatus: [ Number ],
    num: [ Number ],
    type: [ String ],
    preUrl: [ String ],
    grooveType: [ String ],
    disableDrag: [ Boolean ]
  },
  data () {
    return {
      disX: 0,
      disY: 0,
      scale: 'scale(1, 1)',
      offsetLeft: 0,
      offsetTop: 0,
      parent: '',
      dragType: this.type,
      rootFontSize: 0,
      movePosition: false,
      offsetDistance: 0,
      status: 0
    }
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'localData', 'hasTip']),
    ...mapGetters(['getDragedList1']),
    localDataKey () {
      return `${this.game}_${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    finishDrag () {
      return this.localData[this.localDataKey]
    },
    imgUrl () {
      return `${this.preUrl}/img/${this.content.content}.jpg`
    }
  },
  methods: {
    mousedown (e) {
      if (this.finishDrag) return
      if (this.disableDrag) return
      this.status = 0
      this.$store.commit('SET_KEYUP1', { keyup1: false })
      this.$store.commit('SET_COLLISION1', { collision1: true })
      if (this.getDragedList1[this.$el.name]) {
        this.offsetDistance = this.rootFontSize * 0.25
      }
      let offset = this.$refs['drag' + this.num].getBoundingClientRect()
      this.parent = this.$refs['drag' + this.num].parentElement
      let point = e.touches ? e.touches[0] : e
      this.disX = point.screenX - (offset.x || offset.left)
      this.disY = point.screenY - (offset.y || offset.top)
      this.offsetLeft = offset.x || offset.left
      this.offsetTop = offset.y || offset.top
      this.movePosition = false
      this.$el.style.left = (this.offsetLeft / this.rootFontSize).toFixed(4) + 'rem'
      this.$el.style.top = (this.offsetTop / this.rootFontSize).toFixed(4) + 'rem'
      document.body.appendChild(this.$el)
      this.$el.parent_node = this.parentName
      this.$el.name = 'drag' + this.num
      this.$store.commit('GET_DRAG1', this.$el)
      document.onmousemove = (ev) => { this.mousemove(ev) }
    },
    mousemove (e) {
      if (this.finishDrag) return
      if (this.disableDrag) return
      this.status = 0
      let point = e.touches ? e.touches[0] : e
      this.offsetLeft = point.screenX - this.disX
      this.offsetTop = point.screenY - this.disY
      if (this.validateBorder(point.clientX, point.clientY)) return
      this.$el.style.left = (this.offsetLeft / this.rootFontSize).toFixed(4) + 'rem'
      this.$el.style.top = (this.offsetTop / this.rootFontSize).toFixed(4) + 'rem'
      this.movePosition = true
    },
    mouseup (e) {
      if (this.finishDrag) return
      if (this.disableDrag) return
      this.offsetDistance = 0
      let point = e.changedTouches ? e.changedTouches[0] : e
      this.offsetLeft = point.screenX - this.disX
      this.offsetTop = point.screenY - this.disY
      if (!this.movePosition) {
        this.$store.commit('UPDATE_POSITION1', { x: this.offsetLeft - Math.random(), y: this.offsetTop })
      } else {
        this.movePoisition = false
        if (this.validateBorder(point.clientX, point.clientY)) return
        this.$el.style.left = (this.offsetLeft / this.rootFontSize).toFixed(4) + 'rem'
        this.$el.style.top = (this.offsetTop / this.rootFontSize).toFixed(4) + 'rem'
        this.$store.commit('UPDATE_POSITION1', { x: this.offsetLeft, y: this.offsetTop })
        this.$store.commit('SET_KEYUP1', { keyup1: true })
        this.$store.commit('GET_DRAG1', this.$el)
      }
      document.onmousemove = null
      document.onmouseup = null
    },
    validateBorder (x, y) {
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      if (x < 0 || x > width || y < 0 || y > height) {
        this.$store.commit('SET_COLLISION1', { collision1: false })
        document.onmousemove = null
        document.onmouseup = null
        return true
      }
      return false
    }
  },
  mounted () {
    this.status = this.finishStatus ? this.finishStatus : null
    this.rootFontSize = parseInt(document.childNodes[1].style.fontSize)
  },
  watch: {
    getDragedList1 (n) {
      if (n) {
        let ref = Object.keys(this.$refs)[0]
        this.status = n[ref]
      }
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';
  .drag-item {
    .ap(-0.02rem, -0.02rem);
    font-size: 0.28rem;
    line-height: 1.0;
    font-weight: 700;
    text-align: left;
    color: #fff;
    border-radius: 0.03rem;
    opacity: 1;
    z-index: 999;

    .drag-icon {
      .drag-icon();

      &.p-top {
        top: -0.16rem;
      }
      &.p-bottom {
        bottom: -0.16rem;
      }
    }

    &.item-small {
      width: 2rem !important;
      height: 0.8rem !important;
      p {
        font-size: 0.24rem;
      }
    }

    &.drag-area {
      width: 3rem !important;
      height: 0.8rem !important;
      top: -0.05rem !important;
      left: -0.05rem !important;
    }

    &.draged-in {
      top: -0.02rem;
      left: -0.02rem;
      .wh(2rem, 1.5rem);
      background: #B76558;
      border: 5px solid #F7A392;
    }
    &.draged-in-small {
      top: -0.02rem;
      left: -0.02rem;
      .wh(2rem, 0.8rem);
      background: #B76558;
      border: 5px solid #F7A392;
    }

    &.draged-in-area {
      top: -0.05rem;
      left: -0.05rem;
      .wh(3rem, 0.8rem);
      background: #B76558;
      border: 5px solid #F7A392;
    }
    &.p-top {
      padding-top: 0.1rem;
    }

    &.text {
      .ap(-0.02rem, -0.02rem);
      .wh(3.05rem, 0.9rem);
      color: #fff;
      background: #E9A74F;
      border: 2px solid #fff;
      box-shadow: 0.02rem 0.02rem 0.05rem #C16D0A;
    }

    p {
        padding: 0.1rem;
        margin: 0;
        word-break: break-all;
        box-sizing: border-box;
      }
    img {
      .wh(100%, 100%);
      display:block;
    }
    &.img {
      .wh(1.2rem, 0.9rem);
      display: block;
      background-color: #999;
      border: 0.05rem solid #fff;
    }

    &.draged-in-img {
      .wh(2rem, 1.5rem);
      background-color: #999;
      border: 0.05rem solid #fff;
    }

    &.drag-finish{
      border-color: #FFF000;
      box-shadow: 1px 1px 16px #FFF000;
    }
    &.drag-right{
      border-color: #00DE9E;
      box-shadow: 1px 1px 16px #00DE9E ;
    }
    &.drag-wrong{
      border-color: #FF0050;
      box-shadow: 1px 1px 16px #FF0050 ;
    }
  }
</style>
