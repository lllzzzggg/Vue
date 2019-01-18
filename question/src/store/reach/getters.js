export default {
  questionLists: (state) => {
    if (state.lists[state.moduleIndex]) {
      return state.lists[state.moduleIndex].questionList
    }
    // return state.lists[state.moduleIndex].questionList
  },
  getMode: state => {
    return state.mode
  },
  getQuestionData: state => {
    return state.questionData
  },
  getDrag: state => {
    return state.drag
  },
  getGroove: state => {
    return state.groove
  },
  updatePosition: state => {
    return state.position
  },
  getCollision: state => {
    return state.collision
  },
  getKeyup: state => {
    return state.keyup
  },
  getDragedList: state => {
    return state.dragedList
  },
  getDragBackList: state => {
    return state.dragBackList
  },
  getDrag1: state => {
    return state.drag1
  },
  getGroove1: state => {
    return state.groove1
  },
  updatePosition1: state => {
    return state.position1
  },
  getCollision1: state => {
    return state.collision1
  },
  getKeyup1: state => {
    return state.keyup1
  },
  getDragedList1: state => {
    return state.dragedList1
  },
  getDragBackList1: state => {
    return state.dragBackList1
  },
  getDragType: state => {
    return state.dragType
  },
  getGrooveType: state => {
    return state.grooveType
  },
  getChoiceSubmit: state => {
    return state.choiceSubmit
  }
}
