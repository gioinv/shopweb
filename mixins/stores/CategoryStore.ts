import { Component, Vue } from 'nuxt-property-decorator'
@Component({

})

export default class CategoryStore extends Vue {
  insertCategory (data:object) {
    return this.$store.dispatch('addCategory', data)
  }

  updateCategory (data:object) {
    return this.$store.dispatch('updateCategory', data)
  }
}
