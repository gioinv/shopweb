import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'shopweblocal',
    // reducer: state => ({ common: state.modules.CommonStore }),
    storage: window.sessionStorage
  }).plugin(store)
}
