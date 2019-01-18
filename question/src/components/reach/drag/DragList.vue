<!--  -->
<template>
  <div class="drag-list clearfix">
    <div class="arrow arrow-left" @click="prev()"><i v-show="showClick && !firstPage" class="iconfont icon-left"></i></div>
    <div class="drag-scrolls">
      <ul class="drag-items clearfix"
         :style="[ {width: 4 * drags.length + 'rem'}, { left: scrollLeft } ]">
        <li class="drag-item-container" v-for="(item, index) in drags" :key="index" :ref="'drag-item' + index" :class="'drag-' + type">
          <drag-item class="drag-item"
            v-if="item.content !== ''"
            :type="type"
            :pre-url="preUrl"
            :groove-type="grooveType"
            :num="index"
            :is-draged-in="false"
            :is-small="isSmall"
            :parent-name="'drag-item' + index"
            :content="item">{{ item }}</drag-item>
        </li>
      </ul>
    </div>
    <div class="arrow arrow-right" @click="next()">
      <i v-show="showClick && !lastPage" class="iconfont icon-right"></i>
      <div class="page-num">{{ curr + 1 }}/{{ pageNum + 1 }}</div>
    </div>
     <div class="click-tip" @click="hide" v-show="showClick && !hasClicked"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DragItem from './DragItem'

export default {
  props: {
    drags: [ Array ],
    grooveType: [ String ],
    type: [ String ],
    preUrl: [ String ],
    isSmall: [ Boolean ]
  },
  data () {
    return {
      scrollLeft: 0,
      curr: 0,
      hasClicked: false
    }
  },
  components: {
    DragItem
  },
  computed: {
    ...mapGetters([ 'getDrag1', 'getCollision1', 'getDragBackList1' ]),
    pageNum () {
      let len = this.drags.length
      let num = this.type === 'img' ? 4 : 2
      return len % num === 0 ? Math.floor(len / num) - 1 : Math.floor(len / num)
    },
    showClick () {
      return this.drags.length > (this.type === 'img' ? 4 : 2)
    },
    firstPage () {
      return this.curr === 0
    },
    lastPage () {
      return this.curr === this.pageNum
    }
  },
  methods: {
    prev () {
      this.curr--
      if (this.curr <= 0) {
        this.curr = 0
      }
      this.scrollLeft = `-${this.curr * 6.5}rem`
    },
    next () {
      this.curr++
      this.hasClicked = true
      if (this.curr > this.pageNum) {
        this.curr = this.pageNum
      }
      this.scrollLeft = `-${this.curr * 6.5}rem`
    },
    hide () {
      this.hasClicked = true
    }
  },
  watch: {
    getCollision1 (n) {
      if (!n) {
        this.getDrag1.style.left = ''
        this.getDrag1.style.top = ''
        this.$refs[this.getDrag1.parent_node][0].appendChild(this.getDrag1)
      }
    },
    getDragBackList1 (n) {
      n.map(drag => {
        this.$refs[drag.parent_node][0].appendChild(drag)
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.drag-list {
  .wh(7.3rem, 0.9rem);
  margin: 0.54rem auto 0;
  position: relative;

  .click-tip {
      .wh(2.7rem, 1rem);
      position: absolute;
      top: -0.9rem;
      right: -0.3rem;
      background-image: url('../../../assets/images/reach/click-tip.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

  .drag-scrolls {
    display: inline-block;
    position: relative;
    .wh(6.5rem, 1rem);
    vertical-align: top;
    overflow: hidden;

    &.margin-l {
      margin-left: 0.4rem;
    }

    &.margin-r {
      margin-right: 0.4rem;
    }

    .drag-items {
      position: absolute;
      top: 0;
      height: 0.9rem;
      padding: 0;
      margin: 0;
      list-style: none;
      transition: left 0.3s ease-in-out;

      .drag-item-container {
        position: relative;
        float: left;
        border: 2px dashed #B6712A;
        border-radius: 0.03rem;
        box-sizing: border-box;
        background: rgba(148, 85, 41, 0.2);

        &.drag-img {
          .wh(1.2rem, 0.9rem);
           margin: 0 0.2125rem;
        }

        &.drag-text {
          .wh(3.05rem, 0.9rem);
          margin: 0 0.1rem;
        }
      }
    }
  }

  .arrow {
    color: #fff;
    display: inline-block;
    font-size: 0.54rem;
    width: 0.4rem;
    height: 100%;
    line-height: 0.9rem;
    vertical-align: top;

    .iconfont {
      font-size: 0.4rem;
    }

    &.arrow-right {
      position: relative;

      .page-num {
        position: absolute;
        color: #fff;
        top: -0.4rem;
        left: 0.1rem;
        font-size: 0.2rem;
      }
    }
  }
}
</style>
