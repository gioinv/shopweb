<template>
  <div>
    logout...
  </div>
</template>

<script lang="ts">
// @ts-ignore
import BaseP from '@/mixins/BaseP'
import { PageMethods } from '@/mixins/Common'
import { Inject } from 'inversify-props'
import { Component, mixins } from 'nuxt-property-decorator'
import type { IAuthService } from '~/api/services'
import { UserStore } from '~/utils/access-store'

@Component({
  components: {

  }
})
export default class Login extends mixins(BaseP, PageMethods) {
  pageTitle:string='Đăng xuất';

  @UserStore.Action('logout') logout

  @Inject()
  private authService!: IAuthService

  form = {
    email: '',
    password: ''
  }

  async created () {
    await this.authService.logout()
    this.logout()

    this.gotoPage(this.$route.query.redirect)
  }
}
</script>

<style scoped>

</style>
