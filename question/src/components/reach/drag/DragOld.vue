<!--  -->
<template>
  <div class="drag-old">
    <read-text :text="text" :audio="audio"></read-text>
    <drag-groove-area :drag-num="drags.length" :resource="resource" :pre-url="preUrl" :local-data-key="localDataKey" :grooves="grooves" :audio-names="audioNames" :readword="readword"></drag-groove-area>
    <drag-old-list :local-data-key="localDataKey" :resource="resource" :pre-url="preUrl" :drags="drags"></drag-old-list>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { originUrl, _req } from '../../../utils/audios'
import ReadText from '../common/ReadText.vue'
import DragGrooveArea from './DragGrooveArea'
import DragOldList from './DragOldList'
export default {
  data () {
    return {
      mode: '',
      resource: 'img',
      grooves: [],
      drags: [],
      text: '',
      audio: '',
      audioNames: []
    }
  },
  computed: {
    ...mapState(['game', 'pageIndex', 'moduleName', 'localData']),
    ...mapGetters(['getQuestionData', 'getMode']),
    localDataKey () {
      return `${this.game}_${this.moduleName}_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    preUrl () {
      return `${originUrl}${this.game}/${this.moduleName}/P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    }
  },

  components: {
    ReadText,
    DragGrooveArea,
    DragOldList
  },
  methods: {
    ...mapActions(['getDrag', 'updatePosition', 'setCollision', 'setKeyup', 'setDragedList', 'setDragBackList', 'playAudio'])
  },
  mounted () {
    if (!this.localData[this.localDataKey]) {
      setTimeout(() => {
        this.playAudio({
          audioUrl: `${this.preUrl}/audio/Audio_P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}.mp3?_req=${_req}`
        })
      }, 1200)
    }
  },
  created () {
    this.mode = this.getMode
    let questionData = Object.assign({}, this.getQuestionData)
    this.resource = questionData.resource
    this.text = questionData.text
    this.grooves = [...questionData.grooves]
    this.audioNames = [...questionData.grooves]
    this.readword = questionData.readword ? [...questionData.readword] : []
    questionData.drags.map(item => {
      this.drags.push(Object.assign({}, item))
    })
    this.drags.map(item => {
      this.audioNames[item.target] = item.content
    })
    let space = 0
    for (let i = 0; i < this.grooves.length; i++) {
      if (this.grooves[i] === '') {
        space++
      }
    }
    if (this.grooves.length > 6) {
      console.error('拖拽槽最多只能有6个。')
    } else if (this.grooves.length === 0) {
      console.error('没有设置拖拽槽。')
    }
    if (this.drags.length === 0) {
      console.error('没有设置拖拽项。')
    }
    if (this.mode === 'review' && space !== this.drags.length) {
      this.drags = []
      console.error('作业题型中的拖拽不能有干扰的拖拽项。')
    }
    if (this.localData[this.localDataKey]) { // 存在说明已经做过这套题
      this.drags.map((item, index) => {
        let content = item.content
        let grooveIndex = item.target
        if (this.grooves[grooveIndex] === '' && (grooveIndex < this.grooves.length)) {
          this.grooves[grooveIndex] = content
          item.content = ''
        }
      })
    }
    this.updatePosition({ updatePosition: '' })
    this.setCollision({ collision: false })
    this.setKeyup({ keyUp: false })
    this.setDragedList({ dragedList: [] })
    this.setDragBackList({ dragBackList: [] })
  }
}
</script>
<style lang='less' scoped>
.drag-old {
  padding-top: 0.64rem;
}
</style>
