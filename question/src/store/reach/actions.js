import * as types from './mutation-types'
let ended = null
let canplay = null
let timeupdate = null
let play = null

export default {
  setLists ({ commit }, data) {
    commit(types.SET_LISTS, data)
  },
  setModuleData ({ commit }, data) {
    commit(types.SET_MODULE_DATA, data)
  },
  setModuleIndex ({ commit }, data) {
    commit(types.SET_MODULE_INDEX, data)
  },
  setModuleIndexCan ({ commit }, data) {
    commit(types.SET_MODULE_INDEXCAN, data)
  },
  setPageIndex ({ commit }, data) {
    commit(types.SET_PAGE_INDEX, data)
  },
  setGameName ({ commit }, data) {
    commit(types.SET_GAME_NAME, data)
  },
  setMode ({ commit }, data) {
    commit(types.SET_MODE, data)
  },
  setModuleName ({ commit }, data) {
    commit(types.SET_MODULE_NAME, data)
  },
  setGame ({ commit }, data) {
    commit(types.SET_GAME, data)
  },
  setQuestionData ({ commit }, data) {
    commit(types.SET_QUESTION_DATA, data)
  },

  getDrag ({ commit }, data) {
    commit(types.GET_DRAG, data)
  },

  setGroove ({ commit }, data) {
    commit(types.SET_GROOVE, data)
  },

  setHasTip ({ commit }, data) {
    commit(types.SET_HAS_TIP, data)
  },

  // 节点移动时触发
  updatePosition ({ commit }, data) {
    commit(types.UPDATE_POSITION, data)
  },

  setCollision ({ commit }, data) {
    commit(types.SET_COLLISION, data)
  },

  setKeyup ({ commit }, data) {
    commit(types.SET_KEYUP, data)
  },

  setDragedList ({ commit }, data) {
    commit(types.SET_DRAGED_LIST, data)
  },

  setDragBackList ({ commit }, data) {
    commit(types.SET_DRAG_BACK_LIST, data)
  },

  getDrag1 ({ commit }, data) {
    commit(types.GET_DRAG1, data)
  },

  setGroove1 ({ commit }, data) {
    commit(types.SET_GROOVE1, data)
  },

  updatePosition1 ({ commit }, data) {
    commit(types.UPDATE_POSITION1, data)
  },

  setCollision1 ({ commit }, data) {
    commit(types.SET_COLLISION1, data)
  },

  setKeyup1 ({ commit }, data) {
    commit(types.SET_KEYUP1, data)
  },

  setDragedList1 ({ commit }, data) {
    commit(types.SET_DRAGED_LIST1, data)
  },

  setDragBackList1 ({ commit }, data) {
    commit(types.SET_DRAG_BACK_LIST1, data)
  },

  setDragType ({ commit }, data) {
    commit(types.SET_DRAG_TYPE, data)
  },

  setGrooveType ({ commit }, data) {
    commit(types.SET_GROOVE_TYPE, data)
  },

  // 数据保留
  setSaveData ({ commit }, data) {
    commit(types.SET_SAVE_DATA, data)
  },
  resetSaveData ({ commit }) {
    commit(types.RESET_SAVE_DATA)
  },
  setLocalData ({ commit }, data) {
    commit(types.SET_LOCAL_DATA, data)
  },
  resetLocalData ({ commit }) {
    commit(types.SET_LOCAL_DATA, { localData: {} })
  },
  setModuleScore ({ state, commit }, data) {
    let moduleScores = {}
    if (state.moduleScore[state.moduleName + '_score']) {
      let moduleScore = state.moduleScore[state.moduleName + '_score']
      moduleScore += data.score
      moduleScores = {
        ...state.moduleScore,
        [state.moduleName + '_score']: moduleScore
      }
    } else {
      moduleScores = {
        ...state.moduleScore,
        [state.moduleName + '_score']: data.score
      }
    }
    commit(types.SET_MODULE_SCORE, { moduleScore: moduleScores })
  },
  resetModuleScore ({ state, commit }, data) {
    let moduleScores = {}
    moduleScores = {
      ...state.moduleScore,
      [state.moduleName + '_score']: data.score
    }
    commit(types.SET_MODULE_SCORE, { moduleScore: moduleScores })
  },
  setModulePageIndex ({ commit }, data) {
    commit(types.SET_MODULE_PAGE_INDEX, data)
  },
  setWordsScore ({ commit }, data) {
    commit(types.SET_WORDS_SCORE, data)
  },
  setWordsTokenId ({ commit }, data) {
    commit(types.SET_WORDS_TOKENID, data)
  },
  changeModulePageIndex ({ state, dispatch }) {
    if (state.pageIndex === state.modulePageIndex['page_index_' + state.moduleIndex]) {
      dispatch('setModulePageIndex', {
        modulePageIndex: {
          ['page_index_' + state.moduleIndex]: state.pageIndex + 1
        }
      })
    }
  },

  // audio
  playAudio ({ state, commit, dispatch }, data) {
    if (state.audio !== '' && state.playStatus) {
      dispatch('pauseAudio')
    }
    commit(types.SET_AUDIO, {
      audioUrl: data.audioUrl
    })
    state.audio.load()
    state.audio.play()
    dispatch('audioCb', data)
  },
  // pause audio
  pauseAudio ({ state, commit }) {
    state.audio.pause()
    commit(types.SET_AUDIO_PLAYSTATUS, 0)
    commit(types.SET_AUDIO_DURATION, 0)
  },
  audioCb ({ state, commit }, data) {
    if (canplay !== null) {
      state.audio.removeEventListener('canplay', canplay)
    }
    if (timeupdate !== null) {
      state.audio.removeEventListener('timeupdate', timeupdate)
    }
    if (ended !== null) {
      state.audio.removeEventListener('ended', ended)
    }
    if (play !== null) {
      state.audio.removeEventListener('play', play)
    }
    canplay = () => {
      commit(types.SET_AUDIO_PLAYSTATUS, 1)
      commit(types.SET_AUDIO_DURATION, Math.ceil(state.audio.duration))
    }
    state.audio.addEventListener('canplay', canplay)
    timeupdate = () => {
      let isEnded = false
      if (state.audio.duration - state.audio.currentTime < 0.3 && !isEnded) {
        isEnded = true
        data.cb && data.cb()
        commit(types.SET_AUDIO_PLAYSTATUS, 0)
        commit(types.SET_AUDIO_DURATION, 0)
      }
    }
    state.audio.addEventListener('timeupdate', timeupdate)
    ended = data.cb
    state.audio.addEventListener('ended', ended)
    play = data.play
    state.audio.addEventListener('play', play)
  },

  // choice submit
  setChoiceSubmit ({ commit }, data) {
    commit(types.SET_CHOICE_SUBMIT, data)
  },
  setCompleted ({ commit }, data) {
    commit(types.SET_COMPLETED, data)
  },
  setModuleCompleted ({ commit }, data) {
    commit(types.SET_MODULE_COMPLETED, data)
  },
  setModuleAverage ({ commit }, data) {
    commit(types.SET_MODULE_AVERAGE, data)
  },
  setCover ({ commit }, data) {
    commit(types.SET_COVER, data)
  },
  setIsSubit ({ commit }, data) {
    commit(types.SET_IS_SUBMIT, data)
  },
  stopChiceAudios ({ commit }, data) {
    commit(types.STOP_CHOICE_AUDIO, data)
  }
}
