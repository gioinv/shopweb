<template>
  <div>
    <v-breadcrumbs :items="items" />
    <v-card outlined>
      <v-card-title primary-title>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              color="blue"
              fab
              absolute
              right
              top
              small
              v-bind="attrs"
              v-on="on"
              @click="onAdd"
            >
              <v-icon color="white">
                mdi-playlist-plus
              </v-icon>
            </v-btn>
            <v-btn
              color="blue"
              fab
              absolute
              right
              top
              small
              v-bind="attrs"
              v-on="on"
              @click="onAdd"
            >
              <v-icon color="white">
                mdi-playlist-plus
              </v-icon>
            </v-btn>
          </template>
          <span>Thêm mới</span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-row class="mb-3">
          <v-col cols="12" sm="6">
            <m-text-field
              v-model="search"
              label="Từ khóa"
              class="mb-3"
              :counter="200"
              hide-details
            />
          </v-col>
        </v-row>
        <v-divider />
      </v-card-text>
    </v-card>
    <v-card outlined>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="list"
          item-key="name"
          class="elevation-1"
          :search="search"
          :custom-filter="filterOnlyCapsText"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="Search (UPPER CASE ONLY)"
              class="mx-4"
            />
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <m-form-dialog :is-show="isDialog" @close="isDialog=false">
        <template #header>
          <span class="title">{{ isEdit?'Chỉnh sửa': 'Thêm' }}</span>
        </template>
        <template #body>
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
          />
          <m-text-field
            v-model="form.password"
            rules="required"
            label="Xác nhận mật khẩu"
            type="password"
            :count="200"
          />
        </template>
        <template #footer>
          <v-spacer />

          <m-button
            :disabled="!isChangedModel"
            :processing="isSaving"
            :width="100"
            :text="getMessage('common.save')"
            icon="mdi-content-save"
            @onClick="onSave"
          />
        </template>
      </m-form-dialog>
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
import { UserStore } from '@/utils/access-store'

@Component({
  components: {
    ValidationObserver,
    MButton,
    MTextField,
    MFormDialog
  },
  layout: 'admin'
})
export default class Categories extends mixins(BaseP, ListMixin, Form, PageMethods) {
  pageTitle:string='Danh sách người dùng';
  headers: Array<object>=[
    {
      text: 'UId',
      align: 'start',
      sortable: false,
      value: 'uid'
    },
    { text: 'Email', value: 'email' }
  ]

  search:string='';
  dialogTitle:string='';
  isDialog:boolean = false;
  isEdit:boolean = false;
  isSaving:boolean = false;
  list=[]

  form = {
    email: '',
    password: ''
  }

  formItem={
  }

  items= [
    {
      text: 'Dashboard',
      disabled: false,
      href: '/administration/'
    },
    {
      text: this.getMessage('common.user'),
      disabled: true,
      href: '/administration/users'
    }
  ]

  onEdit (item) {
    this.isDialog = true
    this.isEdit = true
    this.formItem = item

    this.cloneForm()
  }

  onAdd () {
    this.resetValidate()
    this.isEdit = false
    this.isDialog = true
    this.resetForm()
  }

  onSave () {
    if (this.isValidForm()) {
      /* this.isSaving = true
      const userDal = new UserDal()
      const rs = await userDal.register(this.form.email, this.form.password)

      // Save to DB
      const user = new User()
      user.setUid(rs.uid)
      user.setEmail(this.form.email)
      await userDal.insert(user)

      this.showSnackbar(this.getMessage('common.save_success'))
      this.isDialog = false
      this.isSaving = false
      this.formItem = {} */
    }
  }

  async onDelete (item) {

  }

  filterOnlyCapsText (value, search, item) {
    return value != null &&
      search != null &&
      typeof value === 'string' &&
      value.toString().toLocaleUpperCase().includes(search)
  }

  created () {
    // this.loadUser()
  }
}
</script>

<style scoped>

</style>
