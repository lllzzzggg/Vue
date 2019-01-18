import { mapState, mapActions } from 'vuex'
import { originUrl } from '../../../../utils/audios.js'

export default {
  computed: {
    ...mapState(['pageIndex', 'game', 'moduleName', 'moduleScore']),
    classUrl () {
      return `${originUrl}${this.game}/${this.moduleName}/P${(this.pageIndex >= 9 ? '' : '0') + (this.pageIndex + 1)}`
    },
    imgUrl () {
      return `${this.classUrl}/img/`
    },
    hostUrl () {
      return originUrl
    }
  },
  methods: {
    ...mapActions(['setSaveData', 'playAudio', 'changeModulePageIndex'])
  }
}
