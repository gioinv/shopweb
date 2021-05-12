import { injectable } from 'inversify-props'
import { IUserService } from '..'
import { BaseService } from '.'

@injectable()
export class UserService extends BaseService implements IUserService {
  getData (): string {
    return 'abc'
  }
}
