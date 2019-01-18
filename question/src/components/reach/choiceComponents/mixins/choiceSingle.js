import { mapState, mapActions, mapGetters } from 'vuex'
import { mapArrProperty } from '../../../../utils'
import { originUrl, right, wrong, oh, correctAnswer } from '../../../../utils/audios.js'

export default {
  mounted () {
    this.saveDataKey = `module${this.moduleIndex}${this.pageIndex}`
    let arr = mapArrProperty(this.saveData, 'key')
    const indexKey = arr.indexOf(this.saveDataKey)
    if (indexKey >= 0) {
      this.chosed = this.saveData[indexKey].value
      this.isClick = false
      this.submitOK = false
      this.status = 2
      this.setIsSubit(true)
    } else {
      this.isClick = true
    }
    console.log()
  },
  data () {
    return {
      animStart: false, // 是否播放css3动画
      status: 0, // 状态值，0:开始选择， 1:提交选择， 2:只有复习逻辑有的，选错的话会显示正确答案
      chosed: '', // 所选选项
      submitOK: false, // 是否可以提交
      isClick: true, // 选项是否可点击
      saveDataKey: '', // 数据保留的key值
      answerTimes: 0, // 答题次数
      score: 0 // 得分
    }
  },
  watch: {
    getChoiceSubmit (n, o) {
      if (n === true && this.chosed !== '') {
        this.submit()
      }
    }
  },
  computed: {
    ...mapGetters(['getQuestionData', 'getChoiceSubmit', 'getMode']),
    ...mapState(['saveData', 'moduleIndex', 'pageIndex', 'game', 'moduleName', 'localData', 'moduleScore']),
    classUrl () {
      return `${originUrl}${this.game}/${this.moduleName}/P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    imgUrl () {
      return `${this.classUrl}/img/`
    },
    hostUrl () {
      return originUrl
    },
    comScore () {
      switch (this.answerTimes) {
        case 1:
          this.score = 100
          break
        case 2:
          this.score = 80
          break
        case 3:
          this.score = 60
          break
        default:
          this.score = 0
          break
      }
      return this.score
    }
  },
  methods: {
    ...mapActions(['setSaveData', 'playAudio', 'changeModulePageIndex', 'setModuleScore', 'setIsSubit', 'stopChiceAudios']),
    chose (e) {
      this.chosed = e
      this.submitOK = true
      this.setIsSubit(true)
      this.stopChiceAudios(true)
    },
    submit () {
      this.submitOK = false
      this.isClick = false
      this.answerTimes += 1
      this.check()// 提交选择，状态改为1
    },
    check () {
      this.status = 1
      this.animShow()// 反馈动画
      if (this.chosed === this.answer) { // 如果选对，便不可点击，预习复习相同
        this.submitOK = false
        this.isClick = false
        this.saveDataFn()
        this.playAudio({
          audioUrl: `${this.hostUrl}${right}`
        })
        setTimeout(() => {
          this.changeModulePageIndex()
        }, 350)
        this.setModuleScore({ score: this.comScore })
      } else { // 如果错选，根据预习复习显示答错反馈
        this.setIsSubit(false)
        if (this.getMode === 'preview') {
          this.preview()
          this.playAudio({
            audioUrl: `${this.hostUrl}${wrong}`
          })
          setTimeout(() => {
            this.playAudio({
              audioUrl: `${this.hostUrl}${oh}`
            })
          }, 1000)
        } else {
          this.setModuleScore({ score: 0 })
          setTimeout(() => {
            this.changeModulePageIndex()
          }, 350)
          this.playAudio({
            audioUrl: `${this.hostUrl}${wrong}`
          })
          setTimeout(() => {
            this.playAudio({
              audioUrl: `${this.hostUrl}${correctAnswer}`
            })
          }, 1000)
          this.saveDataFn()
          this.review()
        }
      }
    },
    preview () { // 预习答错返回初始状态
      setTimeout(() => {
        this.status = 0
        this.isClick = true
        this.animStart = false
        this.chosed = ''
      }, 1000)
    },
    review () { // 复习答错1秒后显示，状态为2
      setTimeout(() => {
        this.status = 2
      }, 1000)
    },
    saveDataFn () {
      this.setSaveData({
        saveData: {
          key: this.saveDataKey,
          value: this.chosed
        }
      })
    },
    animShow () {
      this.animStart = true
    }
  }
}
