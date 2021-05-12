import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { store } from '@/store'
import { LoginUserDto } from '~/api/dto'
import Constants from '~/utils/Constants'

@Module({
  name: 'UserStore',
  dynamic: true,
  store,
  stateFactory: true
})
export default class UserStore extends VuexModule {
  loginUser!: LoginUserDto

  get isLogged ():Boolean {
    return Boolean(this.loginUser)
  }

  get isAdmin ():Boolean {
    if (!this.loginUser || !this.loginUser.roles) {
      return false
    }
    return this.loginUser.roles.includes(Constants.ROLES.ADMIN)
  }

  @Mutation
  private SET_USER (user:LoginUserDto) {
    this.loginUser = user
  }

  @Action({ commit: 'SET_USER' })
  setUser (user:LoginUserDto) {
    return user
  }

  @Mutation
  private LOGOUT (user:LoginUserDto) {
    this.loginUser = user
  }

  @Action({ commit: 'LOGOUT' })
  logout () {
    return null
  }
}
