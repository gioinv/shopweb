import { IBaseService } from '.'

export interface ICategoryService extends IBaseService {
  deleteMultiCategory(id:Array<string>):Promise<boolean>
}
