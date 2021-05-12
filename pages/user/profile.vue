<template>
  <div>
    profile {{ isAdmin }}
    <m-dialog ref="mdialog" />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import MButton from '@/components/controls/MButton'
// @ts-ignore
import MTextFieldLabel from '@/components/controls/MTextFieldLabel'
// @ts-ignore
import MFormDialog from '@/components/MFormDialog'
import BaseP from '@/mixins/BaseP'
import { Form, PageMethods } from '@/mixins/Common'
import ListMixin from '@/mixins/ListMixin'
import { Component, mixins } from 'nuxt-property-decorator'
import { ValidationObserver } from 'vee-validate'
import { UserStore } from '~/utils/access-store'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextFieldLabel,
    MFormDialog
  }
})
export default class Login extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Thông tin user';
  isFail:boolean=false;

  form = {
    email: '',
    password: ''
  }

  @UserStore.Getter('isAdmin') isAdmin
  created () {

  }
}
</script>

<style scoped>

</style>
