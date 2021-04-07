<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      {{ title }}

      {{ items }}
      <div v-for="(item, index) in items" :key="index">
        <nuxt-link :to="'/detail/'+item.Id">
          {{ item.Name }}
        </nuxt-link>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import { getUser, getUserById } from '@/services/user'

@Component({
  components: {
    Logo

  }
})
export default class MyStore extends Vue {
  title:string='demo1';
  categoryList:Array<Object> = []
  items:Array<Object> = []

  public getData (): void {
    this.categoryList = [
      
    ]
  }

  /* async writeToFirestore() {
      const ref = fireDb.collection("test").doc("test")
      const document = {
        text: "This is a test message."
      }        try {
        await ref.set(document)
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.writeSuccessful = true
    }
  } */

  created () {
    getUser().then((x) => {
      this.items = x
    })
    getUserById(3).then((x) => {
      // this.items = x
    })
  }
}
</script>
