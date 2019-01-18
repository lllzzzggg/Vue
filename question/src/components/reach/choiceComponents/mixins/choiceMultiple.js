import { mapState, mapActions, mapGetters } from 'vuex'
import { mapArrProperty } from '../../../../utils'
import { originUrl, right, wrong, oh, noAll, correctAnswers } from '../../../../utils/audios.js'

export default {
  mounted () {
    this.saveDataKey = `module${this.moduleIndex}${this.pageIndex}`
    let arr = mapArrProperty(this.saveData, 'key')
    const indexKey = arr.indexOf(this.saveDataKey)
    if (indexKey >= 0) {
      this.chosedArr = this.saveData[indexKey].value
      this.isClick = false
      this.submitOK = false
      this.status = 2
      this.setIsSubit(true)
    } else {
      this.isClick = true
    }
  },
  data () {
    return {
      animStart: false, // 是否播放css3动画
      timeout: null, // 本题的计时器，播放音频会用
      submitOK: false, // 是否可以提交
      isClick: true, // 选项是否可点击
      chosedSet: new Set(), // 所选选项的Set
      chosedArr: [], // 所选选项的数组
      status: 0, // 状态值，0:开始选择， 1:提交选择， 2:只有复习逻辑有的，选错的话会显示正确答案
      answerTimes: 0, // 答题次数
      score: 0 // 得分
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
  watch: {
    getChoiceSubmit (n, o) {
      if (n === true && this.chosedArr.length > 0) {
        this.submit()
      }
    }
  },
  methods: {
    ...mapActions(['setSaveData', 'playAudio', 'changeModulePageIndex', 'setModuleScore', 'setIsSubit', 'stopChiceAudios']),
    chose (e) {
      if (this.chosedSet.has(e)) {
        this.chosedSet.delete(e)
        if (this.chosedSet.size === 0) {
          this.submitOK = false
        }
      } else {
        this.chosedSet.add(e)
        this.submitOK = true
      }
      if (this.chosedSet.size >= 2) {
        this.setIsSubit(true)
      } else {
        this.setIsSubit(false)
      }
      this.stopChiceAudios(true)
      this.chosedArr = Array.from(this.chosedSet)
    },
    submit () {
      this.status = 1
      this.submitOK = false
      this.isClick = false
      this.answerTimes += 1
      this.animShow()
      this.checkArr()// 检查所选数组和答案数组
    },
    checkArr () {
      const self = this
      const checkType = this.compareArr(this.chosedArr, this.rightArr) // 对比所选数组和答案数组
      if (checkType === 0) {
        this.saveDataFn()
        this.playAudio({
          audioUrl: `${this.hostUrl}${right}`
        })
        setTimeout(() => {
          this.changeModulePageIndex()
        }, 350)
        this.setModuleScore({ score: this.comScore })
      } else {
        this.setIsSubit(false)
        if (this.getMode === 'preview') {
          self.preview()
          self.playAudio({
            audioUrl: `${this.hostUrl}${wrong}`
          })
          if (checkType === 1) {
            // 漏选音频
            setTimeout(() => {
              self.playAudio({
                audioUrl: `${this.hostUrl}${noAll}`
              })
            }, 1000)
          } else if (checkType === 2) {
            // 错选音频
            setTimeout(() => {
              self.playAudio({
                audioUrl: `${this.hostUrl}${oh}`
              })
            }, 1000)
          }
        } else {
          this.setModuleScore({ score: 0 })
          setTimeout(() => {
            this.changeModulePageIndex()
          }, 350)
          self.playAudio({
            audioUrl: `${this.hostUrl}${wrong}`
          })
          setTimeout(() => {
            self.playAudio({
              audioUrl: `${this.hostUrl}${correctAnswers}`
            })
          }, 1000)
          self.saveDataFn()
          self.review()
        }
      }
    },
    preview () {
      setTimeout(() => {
        this.status = 0
        this.isClick = true
        this.animStart = false
        this.chosedSet = new Set()
        this.chosedArr = []
      }, 1000)
    },
    review () {
      setTimeout(() => {
        this.status = 2
      }, 1000)
    },
    compareArr (arrChosed, arrRight) {
      let checkType
      let self = this
      if (arrChosed.length === arrRight.length) {
        if (self.traverseArr(arrChosed, arrRight)) {
          checkType = 0 // 0 为全部选对
        } else {
          checkType = 2// 2 为有错误选项
        }
      } else if (arrChosed.length < arrRight.length) {
        if (self.traverseArr(arrChosed, arrRight)) {
          checkType = 1// 1 为漏选
        } else {
          checkType = 2
        }
      } else {
        checkType = 2
      }
      return checkType
    },
    traverseArr (arrChosed, arrRight) { // 对比所选数组是否全是正确答案
      let checkItem
      let checkArr = []
      for (let i = 0; i < arrChosed.length; ++i) {
        checkItem = arrRight.indexOf(arrChosed[i])
        checkArr.push(checkItem)
      }
      return checkArr.every((e) => {
        return e >= 0
      })
    },
    saveDataFn () {
      this.setSaveData({
        saveData: {
          key: this.saveDataKey,
          value: this.chosedArr
        }
      })
    },
    animShow () {
      this.animStart = true
    }
  }
}
