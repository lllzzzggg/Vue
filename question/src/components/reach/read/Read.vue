<!--  -->
<template>
  <div class="read">
    <div class="image-area">
      <transition name="fade">
        <img class="image" v-if="show" :src="img" :key="img" alt="Read Image">
      </transition>
      <div class="sprite-out" v-show="hasRead || finishAudio" @click="showPop()">
        <sprite-ip :is-active="!hasRead && finishAudio" :num="numArr[currentIndex]"></sprite-ip>
      </div>
    </div>
    <read-text class="drag-title" :texts="texts" @changeIndex="currentChange"></read-text>
    <word-pop :is-active="isActive" :pre-url="preUrl" @close="closePop" @updateScore="updateScore" :words="words[currentIndex]"></word-pop>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { originUrl, _req } from '../../../utils/audios'
import ReadText from '../common/ReadText'
import WordPop from './WordPop'
import SpriteIp from '../common/SpriteIP'
export default {
  data () {
    return {
      isActive: false,
      show: true,
      currentIndex: 0,
      words: [],
      texts: [],
      finishAudio: false,
      hasRead: false,
      score: 0,
      numArr: []
    }
  },
  components: {
    ReadText,
    SpriteIp,
    WordPop
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'modulePageIndex', 'moduleIndex', 'audio', 'wordsScore']),
    ...mapGetters(['getQuestionData']),
    preUrl () {
      return `${originUrl}${this.game}/${this.moduleName}/P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    imgName () {
      return `/img/${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}_${this.currentIndex}.jpg`
    },
    audioUrl () {
      return `/audio/${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}_${this.currentIndex}.mp3`
    },
    img: {
      get () {
        return `${this.preUrl}${this.imgName}`
      },
      set () {

      }
    }
  },
  methods: {
    ...mapActions(['playAudio', 'changeModulePageIndex', 'setModuleScore']),
    play () {
    },
    showPop () {
      this.isActive = this.finishAudio
    },
    closePop (data) {
      this.hasRead = true
      this.isActive = false
    },
    currentChange (data) {
      this.currentIndex = data
      this.finishAudio = false
      this.show = false
      setTimeout(() => {
        this.show = true
        this.changeModulePageIndex()
        this.playAudio({
          audioUrl: `${this.preUrl}${this.audioUrl}?_req=${_req}`,
          cb: () => {
            this.finishAudio = true
          }
        })
      }, 500)
    },
    updateScore (data) {
      if (this.words.indexOf(data.word) !== -1) {
        this.score += (data.score - data.oldScore)
      }
    }
  },
  created () {
    this.texts = this.getQuestionData.texts
    this.words = this.getQuestionData.words
    for (let i = 0; i < this.words.length; i++) {
      this.numArr[i] = this.words[i].length
    }
  },
  mounted () {
    this.words[0].map(word => {
      let wordAttr = word.trim().replace(/\s/g, '_') + '_score'
      if (this.wordsScore[wordAttr]) {
        this.hasRead = true
        this.finishAudio = true
      }
    })
    setTimeout(() => {
      this.playAudio({
        audioUrl: `${this.preUrl}${this.audioUrl}?_req=${_req}`,
        cb: () => {
          this.finishAudio = true
        }
      })
    }, 1000)
  },
  watch: {
    wordsScore (n) {
      // 所有单词需要都测试一遍才可以切页
      let flag = true
      let allWords = 0 // 统计单词数
      this.score = 0
      this.numArr = []
      for (let i = 0; i < this.words.length; i++) {
        let wordArr = this.words[i]
        allWords += wordArr.length
        let wordsNum = wordArr.length
        for (let j = 0; j < wordArr.length; j++) {
          let word = wordArr[j]
          let wordAttr = word.trim().replace(/\s/g, '_') + '_score'
          if (n[wordAttr]) {
            wordsNum--
            this.score += n[wordAttr]
          } else {
            flag = false
          }
        }
        this.numArr[i] = wordsNum
      }
      console.log('得分: ' + Math.round(this.score / allWords))
      this.setModuleScore({ score: Math.round(this.score / allWords) })
      flag && this.changeModulePageIndex()
    }
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.read {
  padding-top: 1rem;

  .fade-style();

  .image-area {
    position: relative;
    .wh(5rem, 3.5rem);
    border-radius: 0.15rem;
    margin: 0 auto;
    background: linear-gradient(90deg, #3b3d8f, #6b2e83);
    box-shadow: 0 0 0.3rem rgba(255, 255, 255, 0.5) inset;

    .image {
      .wh(4.6rem, 3.1rem);
      border-radius: 0.05rem;
      margin: 0.2rem;
    }
    .sprite-out {
      position: absolute;
      bottom: -0.1rem;
      left: 42%;
      .wh(0.7rem, 0.7rem);
      border-radius: 0.5rem;
      background-color: rgba(49, 17, 83, 0.3);
    }
  }

  .drag-title {
    margin-top: 0.25rem;
    height: 1.6rem;
  }
}
</style>
