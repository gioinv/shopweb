import 'reflect-metadata'
import { container } from 'inversify-props'
import { IAuthService, IUserService, ICategoryService } from './api/services'
import { UserService, AuthService, CategoryService } from './api/services/impl'

export default function buildDependencyContainer (): void {
  container.addTransient<ICategoryService>(CategoryService)
  container.addTransient<IUserService>(UserService)
  container.addTransient<IAuthService>(AuthService)
}
