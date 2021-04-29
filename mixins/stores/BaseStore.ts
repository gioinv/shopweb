import { Component, Vue } from 'nuxt-property-decorator'
@Component({

})
export default class BaseStore extends Vue {
  async dispatch (action: string, value):Promise<string|void> {
    return await this.$store.dispatch(action, value)
  }
}
