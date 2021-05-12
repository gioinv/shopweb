import { injectable } from 'inversify-props'
import { Auth, GoogleProvider, FacebookProvider } from '@/services/firebase'
import { IAuthService } from '..'
import { LoginUserDto } from '~/api/dto'

@injectable()
export class AuthService implements IAuthService {
  async loginFacebook (): Promise<LoginUserDto> {
    return await Auth.signInWithPopup(FacebookProvider)
      .then(async (res) => {
        const roles = await this.getRole()

        return new LoginUserDto(res.user?.uid, res.user?.email, roles)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async createUserWithEmailAndPassword (email:string, password:string): Promise<any> {
    return await Auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = res.user
        return user
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async loginEmailPassword (email:string, password:string): Promise<LoginUserDto> {
    return await Auth.signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        const roles = await this.getRole()
        return new LoginUserDto(res.user?.uid, res.user?.email, roles)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async loginGoogle (): Promise<LoginUserDto> {
    return await Auth.signInWithPopup(GoogleProvider)
      .then(async (res) => {
        const roles = await this.getRole()
        return new LoginUserDto(res.user?.uid, res.user?.email, roles)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async logout (): Promise<boolean> {
    return await Auth.signOut()
      .then(() => true)
      .catch((error) => {
        throw new Error(error)
      })
  }

  async getRole ():Promise<any> {
    return await await Auth.currentUser?.getIdTokenResult()
      .then(res => res.claims.roles)
      .catch((error) => {
        throw new Error(error)
      })
  }
}
