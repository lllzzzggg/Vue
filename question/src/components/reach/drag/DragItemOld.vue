<!--  -->
<template>
  <div class="drag-item-old"
       :class="{
         'drag-item-old-img': resource === 'img',
         'drag-item-old-text': resource === 'text',
         'drag-in-groove': disableDrag,
         'drag-finish': status === 3,
         'drag-right': status === 2,
         'drag-wrong': status === 1 }"
       :ref="'drag' + num"
       :name="'drag' + num"
       :target="target"
       @mousedown.stop.prevent="mousedown"
       @mouseup.stop.prevent="mouseup"
       @touchstart.stop.prevent="mousedown"
       @touchmove.stop.prevent="mousemove"
       @touchend.stop.prevent="mouseup"
       @touchecancel.stop.prevent="mouseup">
    <div v-if="status === 2" class="drag-icon drag-right"><i class="iconfont icon-check"></i></div>
    <div v-if="status=== 1" class="drag-icon drag-wrong"><i class="iconfont icon-close"></i></div>
    <img v-if="dragType === 'img'" :src="imgUrl" alt="Drag Image">
    <p v-if="dragType === 'text'">
      {{ content }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    content: [ String ],
    target: [ Number ],
    resource: [ String ],
    type: [ String ],
    parentName: [ String ],
    preUrl: [ String ],
    num: [ Number ],
    disableDrag: [ Boolean ],
    dragStatus: [ Number ]
  },
  data () {
    return {
      disX: 0,
      disY: 0,
      scale: 'scale(1, 1)',
      offsetLeft: 0,
      offsetTop: 0,
      parent: '',
      dragType: this.resource,
      rootFontSize: 0,
      movePosition: false,
      offsetDistance: 0,
      status: this.dragStatus
    }
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'localData']),
    ...mapGetters(['getDragedList']),
    imgUrl () {
      return `${this.preUrl}/img/${this.content}.jpg`
    },
    localDataKey () {
      return `${this.game}_${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    finishDrag () {
      return this.localData[this.localDataKey]
    }
  },
  methods: {
    mousedown (e) {
      if (this.finishDrag) return
      if (this.disableDrag) return
      this.status = 0
      this.$store.commit('SET_KEYUP', { keyup: false })
      this.$store.commit('SET_COLLISION', { collision: true })
      if (this.getDragedList[this.$el.name]) {
        this.offsetDistance = this.rootFontSize * 0.25
      }
      let offset = this.$refs['drag' + this.num].getBoundingClientRect()
      this.parent = this.$refs['drag' + this.num].parentElement
      let point = e.touches ? e.touches[0] : e
      this.disX = point.screenX - (offset.x || offset.left)
      this.disY = point.screenY - (offset.y || offset.top)
      this.offsetLeft = (offset.x || offset.left) + (parseInt(this.$el.style.width) > 0.7 ? 0 : this.offsetDistance)
      this.offsetTop = (offset.y || offset.top) + (parseInt(this.$el.style.width) > 0.7 ? 0 : this.offsetDistance)
      this.movePosition = false
      this.scale = this.resource === 'img' ? (parseInt(this.$el.style.width) > 0.7 ? 'scale(1,1)' : 'scale(1.5, 1.5)') : ''
      this.$el.style.left = (this.offsetLeft / this.rootFontSize).toFixed(4) + 'rem'
      this.$el.style.top = (this.offsetTop / this.rootFontSize).toFixed(4) + 'rem'
      this.$el.style.transform = this.scale
      this.$el.style['-webkit-transform'] = this.scale
      document.body.appendChild(this.$el)
      this.$el.parent_node = this.parentName
      this.$el.name = 'drag' + this.num
      this.$store.commit('GET_DRAG', this.$el)
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
      this.$el.style.transform = this.scale
      this.$el.style['-webkit-transform'] = this.scale
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
        this.$el.style.transform = this.scale
        this.$el.style['-webkit-transform'] = this.scale
        this.$store.commit('UPDATE_POSITION', { x: this.offsetLeft, y: this.offsetTop })
        this.$store.commit('SET_KEYUP', { keyup: true })
        this.$store.commit('GET_DRAG', this.$el)
      }
      document.onmousemove = null
      document.onmouseup = null
    },
    validateBorder (x, y) { // 超越边界
      let width = document.body.clientWidth
      let height = document.body.clientHeight
      if (x < 0 || x > width || y < 0 || y > height) {
        this.$store.commit('SET_COLLISION', { collision: false })
        document.onmousemove = null
        document.onmouseup = null
        return true
      }
      return false
    }
  },
  mounted () {
    this.type = 'img'
    this.rootFontSize = parseInt(document.childNodes[1].style.fontSize)
  },
  watch: {
    getDragedList (n) {
      let ref = Object.keys(this.$refs)[0]
      this.status = n[ref]
    }
  }
}
</script>
<style lang='less' scoped>
@import '../../../style/reach/base.less';

.drag-item-old {
  position: absolute;
  top: 0;
  left: 0;
  border: 0.05rem solid #fff;
  border-radius: 0.1rem;
  z-index: 999;
  transform: scale(1, 1);
  transition: transform .2s;

  &.drag-item-old-img {
    .wh(0.8rem, 1rem);
  }
  &.drag-item-old-text {
    .wh(2.8rem, 0.8rem);
  }

  &.drag-in-groove{
    top: -2px;
    left: -2px;
  }
  .drag-icon {
    .drag-icon();
    top: -0.16rem;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 0.03rem;
    font-size: 0.1rem;
  }

  p{
    width: 100%;
    height: 100%;
    font-size: 0.2rem;
    font-weight: 700;
    line-height: 0.24rem;
    text-align: left;
    color: #fff;
    padding: 0 0.05rem;
    margin: 0;
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
