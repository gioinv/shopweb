import { injectable } from 'inversify-props'
import { ICategoryService } from '..'
import { BaseService } from '.'

@injectable()
export class CategoryService extends BaseService implements ICategoryService {
  constructor () {
    super('Categories')
  }

  async insert <T> (arg: T):Promise<any> {
    const data = { ...arg, createdDate: this.getTimestamp(), updatedDate: this.getTimestamp() }
    return await this.getCollection.add(data)
      .then(async (docRef) => {
        const rs:any = await this.getById(docRef.id)

        rs.id = docRef.id
        return rs
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  async deleteMultiCategory (docIds: Array<string>) :Promise<boolean> {
    const batch = this.getDb.batch()
    docIds.forEach((element) => {
      const docRef = this.getCollection.doc(element)
      batch.delete(docRef)
    })
    await batch.commit()
    return true
  }
}
