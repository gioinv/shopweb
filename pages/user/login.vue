<template>
  <div>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <v-row justify="center" class="mt-8 mb-8" no-gutters>
        <v-col cols="12" sm="8">
          <v-row align="center">
            <v-col cols="7">
              <p class="title">
                Welcome to {{ APP_NAME }}! Please login.
              </p>
            </v-col>
            <v-col class="text-right">
              New member? <nuxt-link to="/user/register">
                Register
              </nuxt-link> here
            </v-col>
          </v-row>
          <v-card outlined>
            <v-card-text class="pb-10 pt-10 pl-7 pr-7">
              <v-row justify="center" align="center">
                <v-col cols="12" sm="6">
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
                    autocomplete="new-password"
                    hide-details
                  />
                  <p align="right">
                    <nuxt-link to="/user/forget-password">
                      Forgot password?
                    </nuxt-link>
                  </p>
                </v-col>
                <v-col class="pl-7">
                  <m-button
                    icon="mdi-account-lock"
                    block
                    color="secondary"
                    hover-color="primary"
                    text="Đăng nhập"
                    :height="50"
                  />
                  <div class="mt-1 mb-2">
                    or login with
                  </div>
                  <m-button
                    block
                    icon="mdi-google-plus"
                    class="mb-2"
                    color="#D34836"
                    text-color="white"
                    :elevation="0"
                    hover-color="#D34836"
                    text="Google"
                    @onClick="onGoogleLogin"
                  />
                  <m-button
                    block
                    icon="mdi-facebook"
                    color="#3B5998"
                    text-color="white"
                    hover-color="#3B5998"
                    text="Facebook"
                    @onClick="onFacebookLogin"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </ValidationObserver>
    <m-dialog ref="mdialog" />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import MButton from '@/components/controls/MButton'
// @ts-ignore
import MTextField from '@/components/controls/MTextField'
// @ts-ignore
import MFormDialog from '@/components/MFormDialog'
import BaseP from '@/mixins/BaseP'
import { Form, PageMethods } from '@/mixins/Common'
import ListMixin from '@/mixins/ListMixin'
import { Inject } from 'inversify-props'
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import type { IAuthService } from '~/api/services'
import { UserStore } from '~/utils/access-store'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextField,
    MFormDialog
  }
})
export default class Login extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Administration';
  isFail:boolean=false;

  @UserStore.Action('setUser') saveUserStore

  @Inject()
  private authService!: IAuthService

  form = {
    email: '',
    password: ''
  }

  async onFacebookLogin () {
    const rs = await this.authService.loginFacebook()
    this.saveUserStore(rs)
    this.gotoPage('/user/profile')
  }

  async onGoogleLogin () {
    const rs = await this.authService.loginGoogle()
    this.saveUserStore(rs)
    this.gotoPage('/user/profile')
  }

  created () {

  }
}
</script>

<style scoped>

</style>
