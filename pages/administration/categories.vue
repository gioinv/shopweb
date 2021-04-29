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
        <v-treeview
          v-model="selection"
          activatable
          :items="categoryList"
          open-all
          :active="active"
          :search="search"
          :filter="filter"
          hoverable
        >
          <template #prepend="{ item,open }">
            <v-icon v-if="!item.parentId">
              {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
            </v-icon>
            <v-icon v-else>
              mdi-file
            </v-icon>
          </template>
          <template #label="{ item, active }">
            {{ item.name }}
            <span v-if="active">
              <v-tooltip v-if="!item.parentId" bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    color="blue"
                    icon
                    v-on="on"
                    @click="onAdd(item)"
                  >
                    <v-icon>mdi-playlist-plus</v-icon>
                  </v-btn>
                </template>
                <span>Thêm danh mục con</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    color="secondary"
                    icon
                    v-on="on"
                    @click="onEdit(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>{{ getMessage('common.edit') }}</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    color="red"
                    icon
                    v-on="on"
                    @click="onDelete(item)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>{{ getMessage('common.delete') }}</span>
              </v-tooltip>
            </span>
          </template>
        </v-treeview>
      </v-card-text>
    </v-card>
    <ValidationObserver ref="myForm" v-slot="{ }">
      <m-form-dialog :is-show="isDialog" @close="isDialog=false">
        <template #header>
          <span class="title">{{ isEdit?'Chỉnh sửa': 'Thêm' }}</span>
        </template>
        <template #body>
          <m-text-field
            v-model="form.name"
            rules="required"
            label="Tên danh mục"
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
import { CategoryStore } from '@/utils/access-store'
import CategoryDal from '~/services/dal/CategoryDal'
import Helper from '~/utils/Helper'
import Category from '~/services/entities/Category'

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
  pageTitle:string='Danh mục';

  search:string='';
  dialogTitle:string='';
  isDialog:boolean = false;
  isEdit:boolean = false;
  isSaving:boolean = false;
  categoryDal: CategoryDal = new CategoryDal();
  selection:Array<object> = []
  active:string[] = []

  @CategoryStore.Action('add') insertCategory
  @CategoryStore.Action('update') updateCategory
  @CategoryStore.Action('delete') deleteCategory
  @CategoryStore.Action('setList') loadCategory
  @CategoryStore.Action('deleteMulti') deleteCategories
  @CategoryStore.Getter('getCategoryWSub') categoryList

  form = {
    name: ''
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
      text: this.getMessage('common.category'),
      disabled: true,
      href: '/administration/categories'
    }
  ]

  onEdit (item) {
    this.active = ['null']
    this.isDialog = true
    this.isEdit = true
    this.form.name = item.name
    this.formItem = item

    this.cloneForm()
  }

  onAdd (subItem) {
    this.resetValidate()
    this.isEdit = false
    this.active = ['null']
    this.isDialog = true
    this.resetForm()

    if (subItem && subItem.id) {
      this.formItem.parentId = subItem.id
    }
  }

  async onSave () {
    if (this.isValidForm()) {
      this.isSaving = true

      const cate = new Category()
      cate.setName(this.form.name)

      if (!this.isEdit) {
        if (this.formItem.parentId) {
          cate.setParentId(this.formItem.parentId)
        }

        await this.insertCategory(cate)
      } else {
        cate.setId(this.formItem.id)
        await this.updateCategory(cate)
      }

      this.showSnackbar(this.getMessage('common.save_success'))
      this.isDialog = false
      this.isSaving = false
      this.formItem = {}
      this.form.name = ''
    }
  }

  async onDelete (item) {
    this.active = ['null']
    const confirm = await this.mConfirm(this.getMessage('common.confirm_msg'))
    if (confirm) {
      this.isSaving = true

      // parent
      if (!item.parentId && item.children.length > 0) {
        const ids = item.children.map(e => e.id)
        ids.push(item.id)
        await this.deleteCategories(ids)
      } else { // sub
        await this.deleteCategory(item.id)
        this.isDialog = false
        this.isSaving = false
      }
      this.showSnackbar(this.getMessage('common.delete_success'))
      this.isDialog = false
    }
  }

  formatDate (str) {
    return Helper.formatDate(str)
  }

  get filter () {
    return (item, search, textKey) => item[textKey].toLowerCase().includes(search.toString().toLowerCase())
  }

  created () {
    this.cloneForm()
    this.loadCategory()
  }
}
</script>

<style scoped>

</style>
