<template>
  <div class="btn preview" @click="preview"></div>
</template>

<script>
export default {
  name: 'btnPreview',
  methods: {
    preview () {
      this.$emit('preview')
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

    &.preview {
      left: 0.3rem;
      background: url("@{image-path}left.png") no-repeat;
      background-size: .69rem .69rem;
    }
  }
</style>
