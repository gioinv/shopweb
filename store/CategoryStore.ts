import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { store } from '@/store'
import { Inject } from 'inversify-props'
import { Category } from '~/api/models'
import type { ICategoryService } from '~/api/services'
import 'reflect-metadata'

@Module({
  name: 'CategoryStore',
  dynamic: true,
  store,
  stateFactory: true
})
export default class CategoryStore extends VuexModule {
  list: Array<Category> = []

  @Inject()
  private categoryService!: ICategoryService

  get getCategoryWSub () {
    // @ts-ignore
    const categories:Array<Category> = JSON.parse(JSON.stringify(this.list.filter(x => !x.parentId)))
    categories.forEach((cate) => {
      // @ts-ignore
      cate.children = this.list.filter(x => x.parentId === cate.id)
    })
    return categories
  }

  @Mutation
  private SET_LIST (list: Array<Category>) {
    this.list = list
  }

  @Action({ commit: 'SET_LIST' })
  async setList () {
    let list = []

    const listCate = this.context.rootState.CategoryStore.list
    if (listCate.length === 0) {
      list = await this.categoryService.getAll()
    } else {
      list = listCate
    }

    return list
  }

  @Mutation
  private ADD (val:Category) {
    this.list.unshift(val)
  }

  @Action({ commit: 'ADD', rawError: true })
  async add (val) {
    return await this.categoryService.insert(val)
  }

  @Mutation
  private UPDATE (val) {
    const rs:any = this.list.find(x => x.id === val.id)
    if (rs) {
      rs.name = val.name
    }
  }

  @Action({ commit: 'UPDATE', rawError: true })
  async update (val) {
    await this.categoryService.update(val)

    return val
  }

  @Mutation
  private DELETE (id:string) {
    const index = this.list.findIndex(x => x.id === id)
    this.list.splice(index, 1)
  }

  @Action({ commit: 'DELETE', rawError: true })
  delete (id:string) {
    return id
  }

  @Mutation
  private DELETE_MULTI (ids:Array<string>) {
    this.list = this.list.filter(x => !ids.includes(x.id!))
  }

  @Action({ commit: 'DELETE_MULTI' })
  async deleteMulti (ids:Array<string>) {
    await this.categoryService.deleteMultiCategory(ids)
    return ids
  }
}
