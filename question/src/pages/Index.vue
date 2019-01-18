<template>
  <div class="container">
    <template class="content">
      <question-comp
        :current-question="currentQuestion">
      </question-comp>
    </template>
    <btn-preview
      v-show="page > 0"
      @preview="preview">
    </btn-preview>
    <btn-next
      v-show="page < questionList.length - 1"
      @next="next">
    </btn-next>
  </div>
</template>

<script>
import QuestionComp from '@/components/QuestionComp'
import BtnPreview from '@/components/BtnPreview'
import BtnNext from '@/components/BtnNext'

export default {
  name: 'question',
  components: {
    QuestionComp,
    BtnPreview,
    BtnNext
  },
  data () {
    return {
      questionList: [
        'ChoiceLook', 'QuestionPic', 'QuestionAudio',
        'QuestionText', 'QuestionPic', 'QuestionAudio',
        'QuestionText', 'QuestionPic', 'QuestionAudio',
        'QuestionText', 'QuestionPic', 'QuestionAudio'
      ],
      page: 0
    }
  },
  computed: {
    currentQuestion () {
      return this.questionList[`${this.page}`]
    },
    prevQuestion () {
      if (this.page > 0) {
        return this.questionList[`${this.page}` - 1]
      }
      return ''
    },
    nextQuestion () {
      if (this.page < this.questionList.length - 1) {
        return this.questionList[`${this.page}` + 1]
      }
      return ''
    },
    cacheList () {
      if (this.page < 1) {
        return this.questionList.slice(0, 2)
      } else if (this.page === this.questionList.length - 1) {
        return this.questionList.slice(this.questionList.length - 2)
      }
      return this.questionList.slice(this.page - 1, this.page + 2)
    }
  },
  methods: {
    next () {
      if (this.page < this.questionList.length - 1) {
        this.page += 1
      }
    },
    preview () {
      if (this.page > 0) {
        this.page -= 1
      }
    }
  },
  mounted () {
    console.log(this.$route)
    console.log(window.questionEnv)
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
  }
}
</style>
