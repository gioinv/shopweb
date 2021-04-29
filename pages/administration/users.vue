<template>
  <div>
    user
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import ListMixin from '@/mixins/ListMixin'
import BaseP from '@/mixins/BaseP'
import { Form } from '@/mixins/Common'
import { ValidationObserver } from 'vee-validate'

import CategoryDal from '~/services/dal/CategoryDal'

@Component({
  components: {
    ValidationObserver

  },
  layout: 'admin'
})
export default class MyStore extends mixins(BaseP, ListMixin, Form) {
  pageTitle:string='Danh mục';
  search:string='';
  dialogTitle:string='';
  isDialog:boolean = false;
  categoryDal: CategoryDal = new CategoryDal();

  headers:Array<object> = [
    {
      value: 'index',
      text: '#',
      width: 50
    },
    { text: 'Id', value: 'documentId', width: 100 },
    { text: 'Name', value: 'Name', sortable: true },
    { text: 'Actions', value: 'actions', sortable: false, width: 100 }
  ];

  form:object={
    name: ''
  }

  list:Array<object> = this.$store.state.Categories;

  onAdd () {
    this.dialogTitle = this.$t('admin.category.add').toString()
    this.isDialog = true
  }

  onDelete (item) {
    this.categoryDal.delete(item.docId)
  }

  onEdit () {
    this.dialogTitle = this.$t('admin.category.edit').toString()
    this.isDialog = true
  }

  created () {
  }
}
</script>

<style scoped>

</style>
