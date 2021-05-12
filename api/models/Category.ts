
export class Category {
  private id?:string
  private name:string;
  private parentId?:string

  public getId (): string|undefined {
    return this.id
  }

  public setId (id: string): void {
    this.id = id
  }

  public getName (): string {
    return this.name
  }

  public setName (name: string): void {
    this.name = name
  }

  public getParentId (): string|undefined {
    return this.parentId
  }

  public setParentId (parentId: string): void {
    this.parentId = parentId
  }

  constructor () {
    this.name = ''
  }
}
