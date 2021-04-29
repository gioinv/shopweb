import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  new VuexPersistence({
    key: 'shopweb',
    storage: window.localStorage
  }).plugin(store)
}
