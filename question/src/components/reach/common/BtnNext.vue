<template>
  <div class="btn" :class="{ 'next': nextActive, 'disable': !nextActive && !isSubmit, 'submit': isSubmit && !nextActive }" @click="next"></div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'btnNext',
  props: {
    nextActive: [ Boolean ]
  },
  data () {
    return {
      isOK: false
    }
  },
  computed: {
    ...mapState(['isSubmit'])
  },
  methods: {
    ...mapActions(['setChoiceSubmit', 'setIsSubit']),
    next () {
      !this.nextActive && this.isSubmit && this.setChoiceSubmit(true)
      this.nextActive && this.$emit('next')
      this.nextActive && this.setIsSubit(false)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/reach/base.less';

.btn {
    position: absolute;
    bottom: 0.24rem;
    z-index: 3;

    width: .69rem;
    height: .69rem;

    user-select: none;

    &:hover {
      cursor: pointer;
    }

    &.next {
      right: 0.3rem;
      background: url("@{image-path}right.png") no-repeat;
      background-size: .69rem .69rem;
    }

    &.disable {
      right: 0.3rem;
      background: url("@{image-path}unsubmit.png") no-repeat;
      background-size: .69rem .69rem;
    }

    &.submit {
      right: 0.3rem;
      background: url("@{image-path}submit.png") no-repeat;
      background-size: .69rem .69rem;
    }
  }
</style>
