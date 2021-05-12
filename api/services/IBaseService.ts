
export interface IBaseService {

  insert <T> (arg: T):Promise<string>

  update (arg: any):Promise<any>

  getById<T> (docId:string):Promise<void|T>

  getAll ()

  delete (docId):Promise<void|boolean>

}
