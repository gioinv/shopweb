import { LoginUserDto } from '../dto'

export interface IAuthService {
  createUserWithEmailAndPassword(email:string, password:string):Promise<any>

  loginGoogle():Promise<LoginUserDto>
  loginFacebook():Promise<LoginUserDto>

  loginEmailPassword(email:string, password:string):Promise<LoginUserDto>

  logout():Promise<boolean>
}
