<!--  -->
<template>
  <div class="drag-area">
    <div class="arrow arrow-left" @click="prev()"><i class="iconfont icon-left"></i></div>
    <div class="drag-scrolls">
      <ul class="drag-items clearfix"
         :style="[ {width: 4 * drags.length + 'rem'}, { left: scrollLeft } ]">
        <li class="drag-item-container"
        :class="{'container-img': resource === 'img', 'container-text': resource === 'text'}"
        v-for="(item, index) in drags"
        :ref="'drag-item' + index"
        :key="index">
          <drag-item-old
            v-if="item.content !== ''"
            :content="item.content"
            :resource="resource"
            :pre-url="preUrl"
            :target="item.target"
            :type="type"
            :disable-drag="false"
            :num="index"
            :parent-name="'drag-item' + index">
          </drag-item-old>
        </li>
      </ul>
    </div>
    <div class="arrow arrow-right" @click="next()">
      <i class="iconfont icon-right"></i>
      <div class="page-num">{{ curr + 1 }}/{{ pageNum + 1 }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DragItemOld from './DragItemOld'

export default {
  props: {
    drags: [Array],
    resource: [ String ],
    preUrl: [ String ]
  },
  data () {
    return {
      curr: 0,
      scrollLeft: 0,
      content: '',
      type: 'img'
    }
  },
  components: {
    DragItemOld
  },

  computed: {
    ...mapGetters([ 'getDrag', 'getCollision', 'getDragBackList' ]),
    pageNum () {
      let len = this.drags.length
      let num = this.resource === 'img' ? 6 : 2
      return len % num === 0 ? Math.floor(len / num) - 1 : Math.floor(len / num)
    }
  },
  methods: {
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
    getCollision (n) {
      if (!n) {
        this.getDrag.style.left = 0
        this.getDrag.style.top = 0
        if (this.resource === 'img') {
          this.getDrag.style.width = '0.8rem'
          this.getDrag.style.height = '1rem'
        } else {
          this.getDrag.style.width = '2.8rem'
          this.getDrag.style.height = '0.8rem'
        }
        this.getDrag.style.transform = 'scale(1, 1)'
        this.getDrag.style['-webkit-transform'] = 'scale(1, 1)'
        this.$refs[this.getDrag.parent_node][0].appendChild(this.getDrag)
      }
    },
    getDragBackList (n) {
      n.map(drag => {
        drag.style.left = 0
        drag.style.top = 0
        if (this.resource === 'img') {
          drag.style.width = '0.8rem'
          drag.style.height = '1rem'
        } else {
          drag.style.width = '2.8rem'
          drag.style.height = '0.8rem'
        }
        drag.style.transform = 'scale(1, 1)'
        drag.style['-webkit-transform'] = 'scale(1, 1)'
        this.$refs[drag.parent_node][0].appendChild(drag)
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.drag-area {
  .wh(7.5rem, 1.2rem);
  margin: 0 auto;
  border: 0.05rem solid #fff;
  border-radius: 0.1rem;
  background: #ae76d8;

  .arrow {
    display: inline-block;
    .wh(0.7rem, 100%);
    font-size: 0.5rem;
    line-height: 1.2rem;
    vertical-align: top;
    color: #fff;

    .iconfont {
      font-size: 0.4rem;
    }

    &.arrow-right {
      position: relative;

      .page-num {
        .ap(-0.4rem, 0.2rem);
        font-size: 0.2rem;
        color: #fff;
      }
    }
  }

  .drag-scrolls {
    position: relative;
    display: inline-block;
    .wh(6rem, 100%);
    overflow: hidden;

    .drag-items {
      position: absolute;
      top: 0;
      padding: 0.05rem 0;
      margin: 0;
      list-style: none;
      transition: left 0.3s ease-in-out;

      .drag-item-container {
        position: relative;
        float: left;
        margin: 0 0.1rem;
        box-sizing: border-box;

        &.container-img {
          .wh(0.8rem, 1rem);
        }
        &.container-text {
          .wh(2.8rem, 0.8rem);
          margin-top: 0.1rem;
        }

      }
    }
  }
}
</style>
