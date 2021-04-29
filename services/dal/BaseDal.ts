
import { db, firebaseIns } from '@/services/firebase'

export default class BaseDal {
  collectionName: string;

  get getDb () {
    return db
  }

  get getCollection () {
    return db.collection(this.collectionName)
  }

  get getTimestamp () {
    return firebaseIns.firestore.FieldValue.serverTimestamp
  }

  constructor (collectionName:string) {
    this.collectionName = collectionName
  }

  async insert <T> (arg: T):Promise<string|void> {
    return await this.getCollection.add({ ...arg, createdDate: this.getTimestamp(), updatedDate: this.getTimestamp() })
      .then(docRef => docRef.id)
      .catch((error) => {
        throw new Error(error)
      })
  }

  async update (arg: any):Promise<any> {
    return await this.getCollection.doc(arg.id).set({ ...arg, updatedDate: this.getTimestamp() }, { merge: true })
      .then(() => true)
      .catch((error) => {
        throw new Error(error)
      })
  }

  async getById<T> (docId:string):Promise<void|T> {
    return await this.getCollection.doc(docId).get()
      .then(docRef => docRef.data() as T)
      .catch((error) => {
        throw new Error(error)
      })
  }

  async getAll () {
    return await this.getCollection.orderBy('updatedDate', 'desc').get()
      .then(docRef => this.addDocIdToSnapshot(docRef))
      .catch((error) => {
        throw new Error(error)
      })
  }

  async delete (docId):Promise<void|boolean> {
    return await this.getCollection.doc(docId).delete()
      .then(() => {
        return true
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  private addDocIdToSnapshot<T> (snapShot): Array<T> {
    const result:Array<T> = []
    snapShot.forEach((element) => {
      const rs = element.data()
      rs.id = element.id
      result.push(rs)
    })
    return result
  }
}
