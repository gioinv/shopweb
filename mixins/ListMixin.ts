import { Component, Vue } from 'nuxt-property-decorator'
@Component
class ListMixin extends Vue {
  public cartProducts: Array<object> = []
  public addToCart (newItem: object): void {
    this.cartProducts = { ...this.cartProducts, ...newItem }
  }
}
export default ListMixin
