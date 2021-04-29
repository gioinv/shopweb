<template>
  <v-snackbar v-model="show" timeout="3000">
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator'
@Component({
  components: {

  }
})
export default class MSnackbar extends Vue {
  show:boolean=false
  message:string=''

  @Watch('snackMessage')
  Watch (msg: string) {
    if (msg) {
      this.show = true
      this.message = this.$store.state.snackbar.snackMessage
      this.$store.dispatch('snackbar/setSnack', null)
    }
  }

  get snackMessage ():boolean {
    return this.$store.state.snackbar.snackMessage
  }

  created () {
    this.$store.dispatch('snackbar/setSnack', null)
  }
}
</script>
