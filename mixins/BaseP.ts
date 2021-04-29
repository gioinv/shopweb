import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  head (this: BaseP): object {
    return {
      title: this.pageTitle,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  }
})
class BaseP extends Vue {
  public pageTitle:string='aaa';
}
export default BaseP
