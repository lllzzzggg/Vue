<template>
  <div class="choice">
    <ChoiceBgImage :imgUrl="imgUrl + lookUrl" :type="true"></ChoiceBgImage>
    <div class="bg-question">
      <div class="words" v-html="word"></div>
    </div>
    <div class="buttons">
      <div class="playAudio-p">
        <div class="radio" @click="playRadio">
          <btn-speak style="margin:0 auto;" :is-playing="isPlaying"></btn-speak>
        </div>
        <p class="tips">Tap and listen</p>
      </div>
      <div class="reading-p" @click="start()" v-show="!reading">
        <span class="reading"></span>
        <p class="tips">Tap to start</p>
      </div>
      <div class="reread-p" @click="playMyRecord()">
        <span :class="[ !myRecord ? 'reread' : 'myReread']"></span>
        <span class="showScore" v-show="scoreShow">{{ score }}</span>
        <p class="tips">My Recording</p>
      </div>
      <img class="anim-reading"
           v-show="reading"
           @click="stop()"
           :src="require('../../../assets/images/reach/speech/reading.gif')"
      />
    </div>
    <SpeechBack v-show="readBack" :animation="readBack" :score="star" @click.native="stopAnim()"></SpeechBack>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { mapArrProperty } from '../../../utils'
import ChoiceBgImage from '../choiceComponents/ChoiceBgImage'
import choiceMount from './mixins/choiceMount'
import { originUrl, tryAudio, goodJob, excellent } from '../../../utils/audios.js'
import choiceAudio from '../choiceComponents/mixins/choiceAudio'
import SpeechBack from '../common/SpeechBack'
import AnimCompleted from '../common/AnimCompleted'

export default {
  name: 'speech',
  components: {
    ChoiceBgImage,
    SpeechBack,
    AnimCompleted
  },
  mixins: [choiceMount, choiceAudio],
  data () {
    return {
      word: '',
      lookUrl: '',
      reading: false,
      myRecord: false,
      readBack: false,
      isWcr: navigator.userAgent.indexOf('VIPX') > -1,
      star: 0,
      backVoice: '',
      tokenId: '',
      control: 0,
      score: 0,
      oldScore: 0,
      scoreShow: false
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

    this.word = this.getQuestionData.word
    this.lookUrl = this.getQuestionData.lookUrl
    this.changeModulePageIndex()
    this.saveDataKey = `module${this.moduleIndex}${this.pageIndex}`
    let arr = mapArrProperty(this.saveData, 'key')
    const indexKey = arr.indexOf(this.saveDataKey)
    if (indexKey >= 0) {
      this.word = this.saveData[indexKey].value
      this.score = this.saveData[indexKey].score
    }
  },
  computed: {
    ...mapState(['saveData', 'moduleIndex', 'pageIndex', 'game', 'moduleName', 'localData', 'moduleScore']),
    ...mapGetters(['getQuestionData']),
    hostUrl () {
      return originUrl
    }
  },
  methods: {
    ...mapActions(['setSaveData', 'playAudio', 'changeModulePageIndex', 'setModuleScore']),
    start () {
      this.reading = true
      this.isPlaying = false
      this.startVoiceTest()
      // this.playAudio({
      //   audioUrl: `${this.hostUrl}${record}`,
      //   cb: () => {
      //     if (this.control <= 0) {
      //       this.startVoiceTest()
      //       this.control++
      //     }
      //   }
      // })
    },
    stop () {
      this.reading = false
      this.endVoiceTest()
    },
    playMyRecord () {
      this.isPlaying = false
      this.myRecord = true
      if (this.isWcr) {

      } else {
        let msg = {
          operateType: 'playAudio',
          body: {
            tokenId: this.tokenId
          }
        }
        window.webkit &&
          window.webkit.messageHandlers &&
          window.webkit.messageHandlers.VIPXJSSDK &&
          window.webkit.messageHandlers.VIPXJSSDK.postMessage(msg)
      }
      setTimeout(() => {
        this.myRecord = false
      }, 1000)
    },
    startVoiceTest () {
      this.isPlaying = false
      if (this.isWcr) {
        let msg = {
          // type: 'read_word',
          // language: 'en_us',
          // timeout: this.time,
          // tid: 1,
          // data: {
          //   words: [ this.word ]
          // }
          // 暂时用旧版评测
          coreType: 'en.sent.score',
          refText: this.getQuestionData.word,
          rank: 100,
          userId: 'VIPX',
          provideType: 'cloud',
          attachAudioUrl: 1
        }
        console.log(msg)
        window.WCRClassRoom &&
        window.WCRClassRoom.beginRecord(JSON.stringify(msg), 'window.handleResultCallback')
      } else { // ios
        console.log('start')
        let startMsg = {
          operateType: 'evaluateStart',
          body: {
            type: 'read_word',
            content: this.getQuestionData.word,
            timeout: 60
          }
        }
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.VIPXJSSDK &&
        window.webkit.messageHandlers.VIPXJSSDK.postMessage(startMsg)
      }
    },
    endVoiceTest () {
      this.control = 0
      if (this.isWcr) {
        window.WCRClassRoom &&
        window.WCRClassRoom.endRecord()
        console.log('window end...')
      } else {
        console.log('end')
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
      console.log('call back....')
      if (result) {
        result = JSON.parse(window.base64.decode(result))
        console.log(result)
        this.recordUrl = result.audioUrl || ''
        this.score = result.result.overall || 0
        this.details = result.result.details || []
        this.voiceBack(this.score)
        this.richText(this.details)
        this.maxScore(this.score)
      }
    },
    handleResult (result) {
      if (result && result.operateType === 'evaluateStart') {
        console.log(result)
        this.tokenId = result.tokenId
        this.score = result.result.overall
        this.details = result.result.details
        this.voiceBack(this.score)
        this.richText(this.details)
        this.maxScore(this.score)
      }
    },
    richText (arr) {
      let newStr = ''
      this.scoreShow = true
      if (arr) {
        for (let i = 0; i < arr.length; ++i) {
          let score = arr[i].score
          let _str = ''
          let word = arr[i].char
          if (score <= 40) {
            _str = '<span style="color: #f00">' + word + '</span>'
          } else if (score >= 61) {
            _str = '<span style="color: #2ad4f3">' + word + '</span>'
          } else {
            _str = word
          }
          newStr += _str + ' '
        }
        this.word = newStr
        this.saveDataFn()
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
      this.readBack = true
      this.playAudio({
        audioUrl: `${this.hostUrl}${this.backVoice}`
      })
    },
    saveDataFn () {
      this.setSaveData({
        saveData: {
          key: this.saveDataKey,
          value: this.word,
          score: this.score
        }
      })
    },
    maxScore (score) {
      let mathDif
      let arr = mapArrProperty(this.saveData, 'key')
      const indexKey = arr.indexOf(this.saveDataKey)
      if (indexKey >= 0) {
        this.oldScore = this.saveData[indexKey].score
      }
      if (score > this.oldScore) {
        mathDif = score - this.oldScore
        this.setModuleScore({ score: mathDif })
      } else if (this.oldScore === 0 && score !== 0) {
        this.setModuleScore({ score: score })
      }
    },
    stopAnim () {
      this.readBack = false
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../style/reach/choice/choice-layout.less';

.all{
  width: 100%;
  height: 100%;
}
.bg-question{
  margin: .2rem auto 0;
  position: relative;
  width: 7.8rem;
  height: 1.6rem;
  background: #835AA0;
  border-radius: @borderWidth * 6;
  padding: 0.02rem;
  box-sizing: border-box;

  &:after{
    content: '';
    position: absolute;
    top: -.05rem;
    left: -.05rem;
    bottom: -.05rem;
    right: -.05rem;
    background: linear-gradient(45deg,#58e6ff, #4076ff, #8d69d5, #58e6ff);
    border-radius: @borderWidth * 6;
    z-index: -1;
  }
}
.words{
  width: 7rem;
  text-align: center;
  color: #F4F5F5;
  font-size: .3rem;
  font-family: @fontFamily;
  font-weight: 500;

  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.buttons{
  margin: 0 auto;
  width: 7rem;
  height: 1.2rem;
  position: relative;

  .playAudio-p{
    width: 1.3rem;
    height: .9rem;
    position: absolute;
    top: .5rem;
    left: .7rem;

    .radio{
      width: 0.54rem;
      height: 0.54rem;
      margin: -.15rem 0 .2rem .2rem;
    }
  }

  .reading-p{
    width: 1.3rem;
    height: .9rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .reading{
      margin: 0 auto;
      display: block;
      width: 0.9rem;
      height: 0.9rem;
      background: url(../../../assets/images/reach/speech/record.png) no-repeat;
      background-size: 100%;
    }
  }

  .reread-p{
    width: 1.3rem;
    height: .9rem;
    position: absolute;
    top: .5rem;
    right: .7rem;

    .reread{
      margin: 0 auto;
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../../../assets/images/reach/speech/record_play.png) no-repeat;
      background-size: 100%;
    }
    .myReread{
      margin: 0 auto;
      display: block;
      width: 0.6rem;
      height: 0.6rem;
      background: url(../../../assets/images/reach/speech/record_stop.png) no-repeat;
      background-size: 100%;
    }
    .showScore{
      position: absolute;
      right: 0;
      top: .2rem;
      color: #fff;
    }
  }
}
.tips{
  margin: .05rem auto 0;
  height: .2rem;
  color: #F4F5F5;
  font-weight: 400;
  line-height: .2rem;
  font-size: .18rem
}
.anim-reading{
  width: 3.12rem;
  height: .65rem;
  margin-top: .4rem;
}
</style>
