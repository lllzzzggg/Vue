<!--  -->
<template>
  <div class="word-pop" :class="{ active: isActive }">
    <div class="word-container">
      <div class="btn-close" @click="close()"></div>
      <div class="container-box" :class="{ 'show-card': showCard  }">
        <div class="word-list">
          <ul class="words">
            <li v-for="word in words" :key="word" @click="showWordCard(word)">{{ word }}</li>
          </ul>
        </div>
        <div class="word-card">
          <div class="word-img">
            <img :src="wordImg" alt="word image">
          </div>
          <p class="word-text">{{ word }}</p>
          <div class="btn-group">
            <div class="btn" @click="play">
              <btn-speak :is-playing="isPlaying"></btn-speak>
            </div>
            <div class="btn" @click="record">
              <btn-record  :time="time" :has-clicked="hasClicked" :stop-anim="isRecording"></btn-record>
            </div>
            <div class="btn" @click="check">
              <btn-check :is-active="checking"></btn-check>
            </div>
            <div class="score" v-show="score !== 0">{{ score }}</div>
          </div>
        </div>
      </div>
    </div>
    <speech-back v-show="testBack" :isPlaying="testBack" :score="star"></speech-back>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { originUrl, _req, tryAudio, goodJob, excellent } from '../../../utils/audios'
import BtnSpeak from '../common/BtnSpeak'
import BtnRecord from '../common/BtnRecord'
import BtnCheck from '../common/BtnCheck'
import SpeechBack from '../common/SpeechBack'
export default {
  props: {
    words: [ Array ],
    preUrl: [ String ],
    isActive: [ Boolean ]
  },
  components: {
    BtnSpeak,
    BtnRecord,
    BtnCheck,
    SpeechBack
  },
  data () {
    return {
      word: this.words[0],
      cardClose: false,
      showCard: false,
      isRecording: false,
      time: 4, // 默认单词卡录音时长
      timer: null,
      isPlaying: false,
      hasClicked: false,
      checking: false,
      isWcr: navigator.userAgent.indexOf('VIPX') > -1,
      tokenId: '',
      recordUrl: '',
      score: 0,
      control: 0,
      testBack: false,
      star: 0,
      backVoice: ''
    }
  },
  computed: {
    ...mapState(['wordsScore', 'wordsTokenId']),
    wordImg () {
      return `${this.preUrl}/img/${this.word.trim().replace(/\s/g, '_')}.jpg`
    },
    hostUrl () {
      return originUrl
    },
    audioUrl () {
      return `${this.preUrl}/audio/${this.word.trim().replace(/\s/g, '_')}.mp3?_req=${_req}`
    },
    wordAttr () {
      return this.word.trim().replace(/\s/g, '_') + '_score'
    },
    wordTokenId () {
      return this.word.trim().replace(/\s/g, '_') + '_token_id'
    }
  },
  methods: {
    ...mapActions(['playAudio', 'setWordsScore', 'setWordsTokenId']),
    close () {
      if (!this.isRecording && !this.isPlaying && !this.checking) {
        if (this.cardClose) {
          this.showCard = false
          this.cardClose = false
          this.hasClicked = false
          this.control = 0
        } else {
          this.$emit('close')
        }
      }
    },
    showWordCard (word) {
      this.word = word
      this.showCard = true
      this.cardClose = true
      let scores = Object.assign({}, this.wordsScore)
      // 判断该单词是否已经评测过
      if (!(scores[this.wordAttr] && scores[this.wordAttr] > 0)) {
        this.score = 0
        this.tokenId = ''
        setTimeout(() => {
          this.isPlaying = true
          this.playAudio({
            audioUrl: this.audioUrl,
            cb: () => {
              if (this.control <= 0) {
                this.control++
                this.isPlaying = false
              }
            }
          })
        }, 500)
      } else {
        this.score = scores[this.wordAttr]
        this.tokenId = this.wordsTokenId[this.wordTokenId]
      }
    },
    play () {
      if (!this.isRecording && !this.checking) {
        this.isPlaying = true
        this.playAudio({
          audioUrl: this.audioUrl,
          cb: () => {
            this.isPlaying = false
          }
        })
      }
    },
    record () {
      if (!this.isPlaying && !this.checking) {
        this.beginCircle()
      }
    },
    check () {
      if (!this.isPlaying && !this.isRecording) {
        this.checking = true
        if (this.isWcr) {
          this.playAudio({ audioUrl: `http://${this.recordUrl}.mp3` })
        } else {
          let msg = {
            operateType: 'playAudio',
            body: {
              tokenId: this.tokenId
            }
          }
          console.log(msg)
          window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.VIPXJSSDK &&
          window.webkit.messageHandlers.VIPXJSSDK.postMessage(msg)
        }
        setTimeout(() => {
          this.checking = false
        }, this.time * 1000)
      }
    },
    beginCircle () {
      this.isRecording = !this.isRecording
      if (this.isRecording) {
        this.hasClicked = false
        this.startVoiceTest()
        this.timer = setTimeout(() => {
          this.isRecording = !this.isRecording
          this.hasClicked = true
          this.endVoiceTest()
        }, (this.time * 1000))
      } else {
        this.endVoiceTest()
        this.hasClicked = true
        clearTimeout(this.timer)
      }
    },
    startVoiceTest () {
      console.log('start')
      if (this.isWcr) {
        let msg = {
          coreType: 'en.sent.score',
          refText: this.word,
          rank: 100,
          userId: 'VIPX',
          provideType: 'cloud',
          attachAudioUrl: 1
        }
        console.log(msg)
        window.parent.postMessage({
          action: 'beginRecord',
          voice: JSON.stringify(msg),
          handle: 'window.handleResultCallback'
        }, '*')
        window.WCRClassRoom &&
        window.WCRClassRoom.beginRecord(JSON.stringify(msg), 'window.handleResultCallback')
      } else { // ios
        let startMsg = {
          operateType: 'evaluateStart',
          body: {
            type: 'read_word',
            content: this.word,
            timeout: this.time
          }
        }
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.VIPXJSSDK &&
        window.webkit.messageHandlers.VIPXJSSDK.postMessage(startMsg)
      }
    },
    endVoiceTest () {
      console.log('end')
      if (this.isWcr) {
        window.parent.postMessage({
          action: 'endRecord'
        }, '*')
        window.WCRClassRoom &&
        window.WCRClassRoom.endRecord()
      } else {
        let endMsg = {
          operateType: 'evaluateEnd',
          body: {}
        }
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.VIPXJSSDK &&
        window.webkit.messageHandlers.VIPXJSSDK.postMessage(endMsg)
      }
    },
    handleResultCallback (result) {
      if (result) {
        console.log(result)
        this.recordUrl = result.audioUrl || ''
        this.score = result.result.overall || 0
        this.setWordContent()
        this.voiceBack(this.score)
      }
    },
    handleResult (result) {
      if (result && result.operateType === 'evaluateStart') {
        console.log(result)
        this.tokenId = result.tokenId
        this.score = result.result.overall
        this.setWordContent()
        this.voiceBack(this.score)
      }
    },
    setWordContent () {
      let scores = Object.assign({}, this.wordsScore)
      let records = {}
      let updateWord = {
        word: this.word,
        score: 0,
        oldScore: 0
      }
      if (this.isWcr) {

      } else {
        records = Object.assign({}, this.wordsTokenId)
      }
      if (scores[ this.wordAttr ]) {
        updateWord.oldScore = scores[ this.wordAttr ]
        if (this.score > scores[ this.wordAttr ]) {
          scores[ this.wordAttr ] = this.score
          updateWord.score = this.score
          if (this.isWcr) {

          } else {
            records[ this.wordTokenId ] = this.tokenId
          }
        }
      } else {
        scores[ this.wordAttr ] = this.score
        updateWord.score = this.score
        if (this.isWcr) {

        } else {
          records[ this.wordTokenId ] = this.tokenId
        }
      }
      this.$emit('updateScore', updateWord)
      this.setWordsScore({ wordsScore: scores })
      if (this.isWcr) {

      } else {
        this.setWordsTokenId({ wordsTokenId: records })
      }
    },
    voiceBack (score) {
      if (score >= 0 && score < 30) {
        this.star = 3
        this.backVoice = tryAudio
      } else if (score >= 30 && score < 70) {
        this.star = 2
        this.backVoice = goodJob
      } else if (score >= 70) {
        this.star = 1
        this.backVoice = excellent
      }
      this.control = 0
      this.testBack = true
      setTimeout(() => {
        this.testBack = false
      }, 3000)
      this.playAudio({
        audioUrl: `${this.hostUrl}${this.backVoice}`,
        cb: () => {
          if (this.control <= 0) {
            this.control++
            setTimeout(() => {
              this.testBack = false
            }, 1000)
          }
        }
      })
    }
  },
  mounted () {
    window.handleResult = this.handleResult
    window.handleResultCallback = result => {
      result = JSON.parse(window.base64.decode(result))
      this.handleResultCallback(result)
    }
    let messageHandler = (e) => {
      if (e && e.data) {
        this.handleResultCallback(e.data)
      }
    }
    window.addEventListener('message', messageHandler, false)
    this.score = this.wordsScore[`${this.word.trim().replace(/\s/g, '_')}_score`] || 0
  }
}
</script>
<style lang='less' scoped>
@import "../../../style/reach/base.less";

.word-pop {
  .ap(0, 0);
  .wh(100%, 100%);
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
  opacity: 0;
  transform: scale(0, 0);
  transition: all 0.3s ease-in-out;

  &.active {
    opacity: 1;
    transform: scale(1, 1);
    transition: all 0.3s ease-in-out;
  }

  .word-container {
    position: relative;
    top: 15%;
    .wh(3.6rem, 5.4rem);
    padding: 0.2rem;
    margin: 0 auto;
    border-radius: 0.15rem;
    box-shadow: 0 0 0.6rem rgba(68, 229, 255, 0.8),
      0 0 0.6rem rgba(255, 255, 255, 0.5) inset;
    background: linear-gradient(0, #6b2e83, #3b3d8f);

    .container-box {
      position: relative;
      .wh(100%, 100%);
      overflow: hidden;

      &.show-card {
        .word-list {
          left: -100%;
        }

        .word-card {
          left: 0;
        }
      }
    }

    &:after {
      position: absolute;
      top: -0.04rem;
      left: -0.04rem;
      bottom: -0.04rem;
      right: -0.04rem;
      border-radius: 0.15rem;
      background: linear-gradient(
        0,
        #4076ff 20%,
        #58e6ff 30%,
        #8d69d5 50%
      );
      content: "";
      z-index: -1;
    }

    .btn-close {
      position: absolute;
      right: -0.4rem;
      top: -0.3rem;
      .wh(0.75rem, 0.75rem);
      background-image: url("../../../assets/images/reach/close.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }

    .word-list {
      .ap(0, 0);
      .wh(100%, 100%);
      border-radius: 0.05rem;
      background-color: #e5e5e5;
      transition: left 0.2s ease-in-out;

      ul {
        padding: 0 0.15rem;
        margin: 0;
        list-style: none;
        box-sizing: border-box;

        li {
          .wh(100%, 0.8rem);
          box-sizing: border-box;
          border-bottom: 2px dashed #aaa;
          padding-left: 0.1rem;
          font-size: 0.32rem;
          font-weight: 700;
          line-height: 0.8rem;
          text-align: left;
          color: #5d369f;
        }
      }
    }

    .word-card {
      .ap(0, 100%);
      .wh(100%, 100%);
      box-sizing: border-box;
      transition: left 0.2s ease-in-out;
      opacity: 1;

      .word-img {
        .wh(2.8rem, 3.3rem);
        border-radius: 0.1rem;
        padding: 0.16rem;
        margin: 0 auto;
        background-color: #fff;
        box-sizing: border-box;

        img {
          .wh(100%, 100%);
          background-color: #f8e7b5;
        }
      }

      .word-text {
        .wh(2.8rem, 0.6rem);
        border-radius: 0.6rem;
        margin: 0.1rem auto;
        font-size: 0.28rem;
        font-weight: 700;
        text-align: center;
        line-height: 0.6rem;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
      }

      .btn-group {
        .wh(100%, 0.8rem);
        line-height: 0.8rem;
        position: relative;

        .score {
          .wh(0.5rem, 0.3rem);
          position: absolute;
          right: 0.45rem;
          top: -0.05rem;
          font-size: 0.24rem;
          line-height: 0.32rem;
          font-weight: 700;
          text-align: center;
          color: #fff;
          background-color: #FFD300;
          border-radius: 0.05rem;
        }

        .btn {
          display: inline-block;
          margin: 0.1rem 0;
        }

        .btn-play {
          .wh(0.5rem, 0.5rem);
          background-image: url("../../../assets/images/reach/play.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
</style>
