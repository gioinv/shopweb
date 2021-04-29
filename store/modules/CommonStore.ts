import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { store } from '@/store'
import CategoryDal from '~/services/dal/CategoryDal'
import CategoryDto from '~/services/dto/CategoryDto'
@Module({
  name: 'CommonStore',
  dynamic: true,
  store,
  stateFactory: true
})
export default class CommonStore extends VuexModule {
  list: Array<CategoryDto> = []

  @Mutation
  private SET_LIST (list: Array<CategoryDto>) {
    this.list = list
  }

  @Mutation
  private ADD (val:CategoryDto) {
    this.list.push(val)
  }

  @Action({ commit: 'SET_LIST' })
  async setList () {
    return await new CategoryDal().getAll()
  }

  @Action({ commit: 'ADD' })
  async add (val) {
    const id = await new CategoryDal().insert(val)
    val.id = id
    return val
  }
}
