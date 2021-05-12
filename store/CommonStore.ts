import { Module, VuexModule } from 'vuex-module-decorators'
import { store } from '@/store'
@Module({
  name: 'CommonStore',
  dynamic: true,
  store,
  stateFactory: true
})
export default class CommonStore extends VuexModule {
  locale:string ='vi'
}
