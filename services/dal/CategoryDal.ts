/*
import BaseDal from './BaseDal'

export default class CategoryDal extends BaseDal {
  constructor () {
    super('Categories')
  }

  async deleteMultiCategory (docIds: Array<string>) {
    const batch = this.getDb.batch()
    docIds.forEach((element) => {
      const docRef = this.getCollection.doc(element)
      batch.delete(docRef)
    })

    return await batch.commit()
  }
}
 */
