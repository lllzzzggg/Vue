import * as types from './mutation-types'

export default {
  setName ({ commit }, name) {
    commit(types.SET_NAME, name)
  },
  setAge ({ commit }, age) {
    commit(types.SET_AGE, age)
  }
}
