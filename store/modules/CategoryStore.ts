import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { store } from '@/store'
import CategoryDal from '~/services/dal/CategoryDal'
import CategoryDto from '~/services/dto/CategoryDto'
@Module({
  name: 'CategoryStore',
  dynamic: true,
  store,
  stateFactory: true
})
export default class CategoryStore extends VuexModule {
  list: Array<CategoryDto> = []

  get getCategoryWSub () {
    const categories:Array<CategoryDto> = JSON.parse(JSON.stringify(this.list.filter(x => !x.parentId)))
    categories.forEach((cate) => {
      cate.children = this.list.filter(x => x.parentId === cate.id)
    })
    return categories
  }

  @Mutation
  private SET_LIST (list: Array<CategoryDto>) {
    this.list = list
  }

  @Action({ commit: 'SET_LIST' })
  async setList () {
    return await new CategoryDal().getAll()
  }

  @Mutation
  private ADD (val:CategoryDto) {
    this.list.unshift(val)
  }

  @Action({ commit: 'ADD' })
  async add (val) {
    const id = await new CategoryDal().insert(val)
    val.id = id
    return val
  }

  @Mutation
  private UPDATE (val) {
    const item = this.list.find(x => x.id === val.id)
    if (item) {
      item.name = val.name
    }
  }

  @Action({ commit: 'UPDATE' })
  async update (val) {
    await new CategoryDal().update(val)
    return val
  }

  @Mutation
  private DELETE (id:string) {
    const index = this.list.findIndex(x => x.id === id)
    this.list.splice(index, 1)
  }

  @Action({ commit: 'DELETE' })
  async delete (id:string) {
    await new CategoryDal().delete(id)
    return id
  }

  @Mutation
  private DELETE_MULTI (ids:Array<string>) {
    this.list = this.list.filter(x => !ids.includes(x.id))
  }

  @Action({ commit: 'DELETE_MULTI' })
  async deleteMulti (ids:Array<string>) {
    await new CategoryDal().deleteMultiCategory(ids)
    return ids
  }
}
