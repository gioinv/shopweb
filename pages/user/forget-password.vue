<template>
  <div>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <p class="title mt-3">
        Forgot your password?
      </p>
      <v-card outlined>
        <v-card-text class="pb-7 pt-7 pl-7 pr-7">
          <p>Please enter the account that you want to reset the password.</p>
          <v-row>
            <v-col cols="12" sm="5">
              <div>
                Phone Number or Email
              </div>
              <m-text-field
                v-model="form.email"
                rules="required|email"
                label="Email"
                :count="200"
              />
              <m-button
                icon="mdi-account-lock"
                block

                text="Lấy lại mật khẩu"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextField,
    MFormDialog
  }
})
export default class Login extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Quên mật khẩu';

  form = {
    email: '',
    password: ''
  }
}
</script>

<style scoped>

</style>
