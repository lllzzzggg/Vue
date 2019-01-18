import BtnSpeak from '../../common/BtnSpeak'
import { mapArrProperty } from '../../../../utils'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    BtnSpeak
  },
  data () {
    return {
      isPlaying: false
    }
  },
  mounted () {
    this.saveDataKey = `module${this.moduleIndex}${this.pageIndex}`
    let arr = mapArrProperty(this.saveData, 'key')
    const indexKey = arr.indexOf(this.saveDataKey)
    if (indexKey < 0) {
      this.playRadio()
    }
  },
  watch: {
    stopChoiceAudio (n) {
      if (n) {
        this.isPlaying = false
      }
    }
  },
  computed: {
    ...mapGetters(['getQuestionData']),
    ...mapState(['saveData', 'moduleIndex', 'pageIndex', 'stopChoiceAudio'])
  },
  methods: {
    ...mapActions(['playAudio', 'stopChoiceAudios']),
    playRadio () {
      this.stopChoiceAudios(true)
      this.isPlaying = true
      this.playAudio({
        audioUrl: `${this.classUrl}/audio/${this.getQuestionData.audio}`,
        cb: () => {
          this.isPlaying = false
        }
      })
    }
  }
}
