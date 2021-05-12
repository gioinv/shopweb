<template>
  <div>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <v-row justify="center" class="mt-5" no-gutters>
        <v-col cols="12" sm="6">
          <v-card>
            <v-card-text class="pb-5 pt-7 pl-5 pr-5">
              <m-text-field
                v-model="form.email"
                rules="required|email"
                label="Email"
                :count="200"
              />
              <m-text-field
                v-model="form.password"
                rules="required"
                label="Mật khẩu"
                type="password"
                :count="200"
                hide-details
              />
              <div v-if="isFail" class="error--text text-center mt-2">
                Đăng nhập thất bại !
              </div>
              <div align="center" class="mt-3 d-flex justify-center">
                <m-button text="Đăng nhập" @onClick="onLogin" />
                <m-button

                  icon="mdi-google-plus"
                  class="ml-2"
                  color="#D34836"
                  text-color="white"
                  :elevation="0"
                  hover-color="#D34836"
                  text="Google"
                  @onClick="onGoogleLogin"
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </ValidationObserver>
    <m-dialog ref="mdialog" />
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ListMixin from '@/mixins/ListMixin'
import BaseP from '@/mixins/BaseP'
import { Form, PageMethods } from '@/mixins/Common'
import { ValidationObserver } from 'vee-validate'
// @ts-ignore
import MButton from '@/components/controls/MButton'
// @ts-ignore
import MTextField from '@/components/controls/MTextField'
// @ts-ignore
import MFormDialog from '@/components/MFormDialog'
import { Inject } from 'inversify-props'
import type { IAuthService } from '~/api/services'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextField,
    MFormDialog
  },
  layout: 'admin'
})
export default class Login extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Administration';
  isFail:boolean=false;
  @Inject()
  private authService!: IAuthService

  form = {
    email: '',
    password: ''
  }

  onLogin () {
    /* const uDal = new UserDal()
    uDal.loginEmailPassword(this.form.email, this.form.password)
      .then((x) => {
        console.log(x)
        this.gotoPage('/administration/')
      })
      .catch(() => {
        this.isFail = true
      }) */
  }

  async onGoogleLogin () {
    const rs = await this.authService.loginGoogle()
    console.log(rs)
    this.gotoPage('/administration/')
  }
}
</script>

<style scoped>

</style>
