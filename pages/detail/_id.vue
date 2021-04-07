<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      {{ contentss }}<br>
      <nuxt-link to="/list">
        back
      </nuxt-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import { getUserById } from '@/services/user'

@Component({
  components: {
    Logo

  }
})
export default class MyStore extends Vue {
  title:string='demo1';
  id: string = '';
  contentss: any={};
  categoryList:Array<any> = []
  items:Array<any> = []

  public getData (): void {

  }

  created () {
    /*  this.id = this.$route.params.id

    this.categoryList = [
      {
        id: 1,
        name: 'Phones',
        link: '/phones',
        image: 'iphone-11.png'
      },
      {
        id: 2,
        name: 'Laptops1',
        link: '/laptops',
        image: 'macbook1.png'
      }
    ]

    this.contentss = this.categoryList.find(x => x.id === parseInt(this.$route.params.id)) */

    getUserById(parseInt(this.$route.params.id)).then((x : any) => {
      this.contentss = x
    })
  }
}
</script>
