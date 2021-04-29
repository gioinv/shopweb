export const state = () => ({
  snackMessage: null
})

export const mutations = {
  SET_SNACK (state, msg) {
    state.snackMessage = msg
  }
}

export const actions = {

  setSnack (context, value) {
    context.commit('SET_SNACK', value)
  }
}
