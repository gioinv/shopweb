<template>
  <div>
    <v-btn color="success" @click="initDB">
      Init db
    </v-btn>
    <v-btn color="success" @click="getData">
      get categories
    </v-btn>
    <v-btn color="success" @click="upVCategory">
      Change version Category
    </v-btn>
    <v-btn color="success" @click="upVSub">
      Change version Sub
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { db, firebaseIns } from '@/services/firebase'
import CategoryDal from '~/services/dal/CategoryDal'

@Component({
  components: {

  }
})
export default class MyStore extends Vue {
  title:string='demo1';

  categories:Array<object> = [
    { Name: 'Category 1', children: ['Sub 1', 'Sub 2'] },
    { Name: 'Category 2', children: [] },
    { Name: 'Category 3', children: ['Sub 3', 'Sub 4'] }
  ];

  products:Array<string> = [
    'Product 1',
    'Product 2',
    'Product 3'
  ];

  getData () :void {
    const dal = new CategoryDal()

    dal.getById('zVWpnpDeFdcpzT68WO0V').then((x) => {
      console.log(x)
    })

    dal.getAll().then((x) => {
      console.log(x)
    })
  }

  upVCategory () :void {
    db.collection('SyncVersion').doc('CATEGORY').update({
      Version: firebaseIns.firestore.FieldValue.increment(1)
    })
  }

  upVSub () :void {
    db.collection('SyncVersion').doc('SUB_CATEGORY').update({
      Version: firebaseIns.firestore.FieldValue.increment(1)
    })
  }

  initDB () :void {
    /* this.categories.forEach(async (category:any) => {
      const rs = await new CategoryDal().insert({
        Name: category.Name
      })
      console.log('tag', category.children.lenth)
      if (category.children.lenth > 0) {
        category.children.forEach(async (sub) => {
          await await new CategoryDal().insert({
            Name: sub,
            ParentId: rs.id |
          })
        })
      }
    }) */
  }

  created () {
    // this.$store.dispatch('setCategories')
  }
}
</script>
