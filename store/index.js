const initials = {

}

export const state = () => ({
  ...initials,
  locale: 'ja'
})

export const getters = {}

export const mutations = {

  setResetAll (state) {
    let key
    for (key in state) {
      const props = Object.prototype.hasOwnProperty.call(initials, key)
      if (props) {
        state[key] = initials[key]
      }
    }
  },
  pressLogout (state, value) {
    state.isLogoutTab = value
  }
}

export const actions = {
  resetAll (context) {
    context.commit('setResetAll')
  },

  logout (context) {
    context.dispatch('resetAll')
  }

}
