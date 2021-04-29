
export default class Helper {
  static addDocIdToSnapshot (snapShot:any) {
    const result:Array<object> = []
    snapShot.forEach((element) => {
      const rs = element.data()
      rs.Id = element.id
      result.push(rs)
    })
    return result
  }

  static formatDate (date:any) {
    const rs = new Date(date.seconds * 1000)
    return rs.getDate() + '/' + rs.getMonth() + 1 + '/' + rs.getFullYear()
  }
}
