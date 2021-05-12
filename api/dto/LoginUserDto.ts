
export class LoginUserDto {
  private uid: string
  private roles: string[]
  private email: string

  public getUid (): string {
    return this.uid
  }

  public setUid (uid: string): void {
    this.uid = uid
  }

  public getRole (): string[] {
    return this.roles
  }

  public setRole (roles: string[]): void {
    this.roles = roles
  }

  public getEmail (): string {
    return this.email
  }

  public setEmail (email: string): void {
    this.email = email
  }

  constructor (uid: string, email: string, roles: string[]) {
    this.uid = uid
    this.roles = roles
    this.email = email
  }
}
