
export default class User {
  public id:string
  public name:string;

  constructor (id:string, name:string) {
    this.id = id
    this.name = name
  }

  public getFull ():string {
    return this.id + ' ' + this.name
  }
}
