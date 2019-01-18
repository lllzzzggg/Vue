import * as types from './mutation-types'

export default {
  [types.SET_LISTS] (state, payload) {
    state.lists = payload.lists
  },
  [types.SET_MODULE_DATA] (state, payload) {
    state.moduleData = payload.moduleData
  },
  [types.SET_MODULE_INDEX] (state, payload) {
    state.moduleIndex = payload.moduleIndex
  },
  [types.SET_MODULE_INDEXCAN] (state, payload) {
    state.moduleIndexCan = payload.moduleIndexCan
  },
  [types.SET_PAGE_INDEX] (state, payload) {
    state.prevPage = state.pageIndex
    state.pageIndex = payload.pageIndex
  },
  [types.SET_QUESTION_DATA] (state, payload) {
    state.questionData = payload.questionData
  },
  [types.SET_GAME_NAME] (state, payload) {
    state.gameName = payload.gameName
  },
  [types.SET_MODE] (state, payload) {
    state.mode = payload.mode
  },
  [types.SET_MODULE_NAME] (state, payload) {
    state.moduleName = payload.moduleName
  },
  [types.SET_GAME] (state, payload) {
    state.game = payload.game
  },
  // 拖拽

  [types.GET_DRAG] (state, payload) {
    state.drag = payload
  },
  [types.SET_GROOVE] (state, payload) {
    state.groove = payload.groove
  },
  [types.SET_HAS_TIP] (state, payload) {
    state.hasTip = payload.hasTip
  },
  [types.SET_COLLISION] (state, payload) {
    state.collision = payload.collision
  },
  [types.SET_KEYUP] (state, payload) {
    state.keyup = payload.keyup
  },
  [types.UPDATE_POSITION] (state, payload) {
    state.position = payload.x + ',' + payload.y
  },
  [types.SET_DRAGED_LIST] (state, payload) {
    state.dragedList = payload.dragedList
  },
  [types.SET_DRAG_BACK_LIST] (state, payload) {
    state.dragBackList = payload.dragBackList
  },
  [types.GET_DRAG1] (state, payload) {
    state.drag1 = payload
  },
  [types.SET_GROOVE1] (state, payload) {
    state.groove1 = payload.groove1
  },
  [types.SET_COLLISION1] (state, payload) {
    state.collision1 = payload.collision1
  },
  [types.SET_KEYUP1] (state, payload) {
    state.keyup1 = payload.keyup1
  },
  [types.UPDATE_POSITION1] (state, payload) {
    state.position1 = payload.x + ',' + payload.y
  },
  [types.SET_DRAGED_LIST1] (state, payload) {
    state.dragedList1 = payload.dragedList1
  },
  [types.SET_DRAG_BACK_LIST1] (state, payload) {
    state.dragBackList1 = payload.dragBackList1
  },
  [types.SET_DRAG_TYPE] (state, payload) {
    state.dragType = payload.dragType
  },
  [types.SET_GROOVE_TYPE] (state, payload) {
    state.grooveType = payload.grooveType
  },

  // 数据保留
  [types.SET_SAVE_DATA] (state, payload) {
    const newArr = state.saveData.map((item) => {
      return item['key']
    })
    const oldIndex = newArr.indexOf(payload.saveData.key)
    if (oldIndex >= 0) {
      state.saveData[oldIndex] = payload.saveData
    } else {
      state.saveData.push(payload.saveData)
    }
  },
  [types.RESET_SAVE_DATA] (state) {
    state.saveData = []
  },
  [types.SET_LOCAL_DATA] (state, payload) {
    state.localData = payload.localData
  },
  [types.SET_MODULE_SCORE] (state, payload) {
    state.moduleScore = payload.moduleScore
  },
  [types.SET_MODULE_PAGE_INDEX] (state, payload) {
    state.modulePageIndex = payload.modulePageIndex
  },
  [types.SET_WORDS_SCORE] (state, payload) {
    state.wordsScore = payload.wordsScore
  },
  [types.SET_WORDS_TOKENID] (state, payload) {
    state.wordsTokenId = payload.wordsTokenId
  },
  // AUDIO
  [types.SET_AUDIO] (state, payload) {
    if (state.audio === '') {
      state.audio = new Audio(payload.audioUrl)
    } else {
      state.audio.src = payload.audioUrl
    }
  },
  [types.SET_AUDIO_DURATION] (state, duration) {
    state.duration = duration
  },
  [types.SET_AUDIO_PLAYSTATUS] (state, playStatus) {
    state.playStatus = playStatus
  },
  [types.STOP_CHOICE_AUDIO] (state, payload) {
    state.stopChoiceAudio = payload
    state.duration = 0
    state.playStatus = 0
    state.audio.pause()
    setTimeout(() => {
      state.stopChoiceAudio = false
    }, 500)
  },

  // choice
  [types.SET_CHOICE_SUBMIT] (state, payload) {
    state.choiceSubmit = payload
    setTimeout(() => {
      state.choiceSubmit = false
    }, 1000)
  },
  [types.SET_COMPLETED] (state, payload) {
    state.completed = payload
  },
  [types.SET_IS_SUBMIT] (state, payload) {
    state.isSubmit = payload
  },
  [types.SET_MODULE_COMPLETED] (state, payload) {
    state.moduleCompleted = payload
  },
  [types.SET_MODULE_AVERAGE] (state, payload) {
    const keyArr = state.moduleAverage.map((item) => {
      return item['key']
    })
    const oldIndex = keyArr.indexOf(payload.saveModule.key)
    if (oldIndex >= 0) {
      state.moduleAverage[oldIndex] = payload.saveModule
    } else {
      state.moduleAverage.push(payload.saveModule)
    }
  },
  [types.SET_COVER] (state, payload) {
    state.lessonCover = payload
  }
}
