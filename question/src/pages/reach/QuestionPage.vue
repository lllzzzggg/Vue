<template>
  <div class="container">
    <div class="toModule" @click="goModule()" v-show="lastPage"></div>
    <template class="content">
      <question-comp
        v-show="lastPage"
        :current-question="currentQuestion">
      </question-comp>
    </template>
    <btn-preview
      v-show="pageIndex > 0"
      @preview="preview">
    </btn-preview>
    <btn-next v-show="lastPage"
      :next-active="nextActive"
      @next="next">
    </btn-next>
    <AnimCompleted class="mask"
      v-show="moduleCompleted"
      :animation="moduleCompleted"
      :score="star">
    </AnimCompleted>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { originUrl, _req } from '../../utils/audios'
import axios from 'axios'
import QuestionComp from '@/components/reach/QuestionComp'
import BtnPreview from '@/components/reach/common/BtnPreview'
import BtnNext from '@/components/reach/common/BtnNext'
import AnimCompleted from '@/components/reach/common/AnimCompleted'

export default {
  name: 'question',
  components: {
    QuestionComp,
    BtnPreview,
    BtnNext,
    AnimCompleted
  },
  data () {
    return {
      nextActive: false,
      show: false,
      star: 0,
      lastPage: true
    }
  },
  computed: {
    ...mapState(['game', 'moduleData', 'pageIndex', 'moduleIndex', 'modulePageIndex', 'lists', 'moduleCompleted', 'moduleAverage', 'moduleIndexCan', 'moduleName', 'moduleScore']),
    ...mapGetters(['questionLists']),
    currentQuestion () {
      this.setQuestionData({ questionData: this.questionLists[this.pageIndex].data })
      return this.questionLists[`${this.pageIndex}`]
    },
    prevQuestion () {
      if (this.pageIndex > 0) {
        return this.questionLists[`${this.pageIndex}` - 1]
      }
      return ''
    },
    nextQuestion () {
      if (this.pageIndex < this.questionLists.length - 1) {
        return this.questionLists[`${this.pageIndex}` + 1]
      }
      return ''
    }
  },
  methods: {
    ...mapActions(['setPageIndex', 'setModuleIndex', 'setQuestionData', 'setModulePageIndex', 'setCompleted', 'setModuleCompleted', 'setModuleIndexCan', 'pauseAudio', 'setModuleAverage']),
    next () {
      if (this.pageIndex <= this.questionLists.length - 1) {
        this.setPageIndex({
          pageIndex: this.pageIndex + 1
        })
      }
      if (this.pageIndex > this.questionLists.length - 1) {
        this.setPageIndex({
          pageIndex: 0
        })
        if (this.moduleIndex >= this.lists.length - 1) {
          console.log('完成所有答题')
          this.setCompleted(true)
        }
        if (this.moduleIndex > 0) {
          let scoreIndex = this.moduleScore[this.moduleName + '_score'] / this.getItemLength(this.moduleData.lists[this.moduleIndex].questionList)
          console.log(scoreIndex)
          this.star = Math.round(scoreIndex * 5 / 100)
        }
        this.setModuleCompleted(true)
        this.lastPage = false
        setTimeout(() => {
          this.lastPage = true
          this.pauseAudio()
          if (this.moduleIndex === this.moduleIndexCan) {
            console.log(this.moduleIndexCan + 1)
            this.setModuleIndexCan({
              moduleIndexCan: this.moduleIndexCan + 1
            })
          }
          this.$router.push({
            name: 'reachModule'
          })
        }, 3000)
      }
    },
    preview () {
      if (this.pageIndex > 0) {
        this.setPageIndex({
          pageIndex: this.pageIndex - 1
        })
      }
    },
    goModule () {
      this.setPageIndex({
        pageIndex: 0
      })
      this.setModuleAverage({
        saveModule: {
          key: this.moduleName,
          value: 0
        }
      })
      this.$router.push({
        name: 'reachModule'
      })
    },
    getItemLength (arr) { // 去掉学单词不用统计分数的题型
      let len = arr.length
      for (let i = 0; i < arr.length; i++) {
        if (arr.type === 'LearnWord') {
          len--
        }
      }
      return len
    },
    closeAnim () {
      this.show = false
    },
    getAudioUrl () {
      let audioUrlArr = []
      let origin = `${originUrl}${this.game}/${this.moduleName}/`
      this.questionLists.map((item, index) => {
        let page = `P${index < 9 ? ('0' + (index + 1)) : (index + 1)}`
        if (item.type === 'Read') {
          item.data.texts.map((item, ind) => {
            let audioUrl = `${origin}${page}/audio/Read_${page}_${ind}.mp3?_req=${_req}`
            audioUrlArr.push(audioUrl)
          })
          for (let i = 0; i < item.data.words.length; i++) {
            let wordArr = item.data.words[i]
            for (let j = 0; j < wordArr.length; j++) {
              let word = wordArr[j].trim().replace(/\s/g, '_')
              let audioUrl = `${origin}${page}/audio/${word}.mp3?_req=${_req}`
              audioUrlArr.push(audioUrl)
            }
          }
        } else if (item.type === 'Drag') {
          let audioUrl = `${origin}${page}/audio/Audio_${page}.mp3?_req=${_req}`
          audioUrlArr.push(audioUrl)
        } else if (item.type === 'DragOld') {
          let audioUrl = `${origin}${page}/audio/Audio_${page}.mp3?_req=${_req}`
          audioUrlArr.push(audioUrl)
          if (item.data.readword) {
            item.data.grooves.map((item, index) => {
              let audioUrl = `${origin}${page}/audio/Drag_${index}.mp3?_req=${_req}`
              audioUrlArr.push(audioUrl)
            })
          }
        } else if (item.type.indexOf('Choice') >= 0 || item.type === 'Speech' || item.type === 'LearnWord') {
          if (item.type.indexOf('Reading') >= 0) {
            let audioUrl = `${origin}${page}/audio/${item.data.audio}.mp3?_req=${_req}`
            let readingUrl = `${origin}${page}/audio/${item.data.readAudio}.mp3?_req=${_req}`
            audioUrlArr.push(audioUrl)
            audioUrlArr.push(readingUrl)
          } else {
            let audioUrl = `${origin}${page}/audio/${item.data.audio}.mp3?_req=${_req}`
            audioUrlArr.push(audioUrl)
          }
        }
      })
      console.log(audioUrlArr)
      return audioUrlArr
    }
  },
  watch: {
    pageIndex (n) {
      console.log(n)
      console.log(this.modulePageIndex['page_index_' + this.moduleIndex])
      if (n === this.modulePageIndex['page_index_' + this.moduleIndex]) {
        this.nextActive = false
      } else {
        this.nextActive = true
      }
    },
    modulePageIndex: {
      handler (n) {
        if (this.pageIndex < n['page_index_' + this.moduleIndex]) {
          this.nextActive = true
        } else {
          this.nextActive = false
        }
      },
      deep: true
    }
  },
  mounted () {
    // 提前预加载音频
    let audioArr = this.getAudioUrl()
    audioArr.map(item => {
      axios.get(item)
        .then(res => {
          // 成功
        })
        .catch(err => {
          console.log(err)
        })
    })
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

  .toModule{
    width: .6rem;
    height: .6rem;
    background: url('../../assets/images/reach/home/btn.png') no-repeat;
    background-size: .6rem .6rem;

    position: absolute;
    top: .2rem;
    left: .2rem;
    z-index: 3;

    &:hover {
      cursor: pointer;
    }
  }

  .mask{
    width: 100%;
    height: 100%;
    z-index: 9;
  }
}
</style>
